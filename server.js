const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const TOKEN_TTL_MS = 2 * 60 * 60 * 1000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));

const dataDir = path.join(__dirname, 'data');
const notesDir = path.join(dataDir, 'notes');
const profilePath = path.join(dataDir, 'profile.json');
const privateNotesPath = path.join(dataDir, 'private.json');

// Token được lưu trong RAM; khởi động lại backend sẽ tự khóa khu vực riêng tư.
const sessions = new Map();

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

function readJSON(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  const raw = fs.readFileSync(filePath, 'utf8').trim();
  if (!raw) return fallback;
  return JSON.parse(raw);
}

function ensureDataFiles() {
  fs.mkdirSync(notesDir, { recursive: true });
  if (!fs.existsSync(profilePath)) {
    writeJSON(profilePath, { displayName: 'Sinh viên', theme: 'light', password: '' });
  }
  if (!fs.existsSync(privateNotesPath)) writeJSON(privateNotesPath, []);
}

// Tạo sẵn dữ liệu để backend chạy được ngay cả khi thư mục data chưa có.
ensureDataFiles();

function publicProfile(profile) {
  return {
    displayName: profile.displayName || 'Sinh viên',
    theme: profile.theme === 'dark' ? 'dark' : 'light',
    hasPassword: typeof profile.password === 'string' && profile.password.length > 0,
  };
}

function sendServerError(res, message, error) {
  // Chỉ ghi chi tiết lỗi ở server, không gửi đường dẫn file ra client.
  console.error(message, error.message);
  return res.status(500).json({ message });
}

function getTopicFile(topic) {
  return path.join(notesDir, `${topic}.json`);
}

function validateTopic(req, res, next) {
  // Chỉ cho phép chữ, số, gạch ngang và gạch dưới trong tên chủ đề.
  if (typeof req.params.topic !== 'string' || !/^[a-zA-Z0-9_-]{1,60}$/.test(req.params.topic)) {
    return res.status(400).json({ message: 'Chủ đề không hợp lệ.' });
  }
  next();
}

function readNotes(filePath) {
  const notes = readJSON(filePath, []);
  if (!Array.isArray(notes)) throw new Error('Dữ liệu ghi chú phải là một mảng.');
  return notes;
}

function validateNoteBody(req, res, next) {
  const body = req.body || {};
  if (body.title !== undefined && (typeof body.title !== 'string' || !body.title.trim())) {
    return res.status(400).json({ message: 'Tiêu đề không được để trống.' });
  }
  if (body.content !== undefined && typeof body.content !== 'string') {
    return res.status(400).json({ message: 'Nội dung phải là chuỗi ký tự.' });
  }
  next();
}

function createNote(body, privateNote = false) {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    title: typeof body.title === 'string' && body.title.trim()
      ? body.title.trim()
      : (privateNote ? 'Lưu bút mật' : 'Không tiêu đề'),
    content: typeof body.content === 'string' ? body.content : '',
    createdAt: now,
    updatedAt: now,
  };
}

function requirePrivateAuth(req, res, next) {
  const header = req.get('authorization') || '';
  const match = header.match(/^Bearer\s+(.+)$/i);
  const token = match && match[1];
  const expiresAt = token ? sessions.get(token) : undefined;

  if (!expiresAt || expiresAt <= Date.now()) {
    if (token) sessions.delete(token);
    return res.status(401).json({ message: 'Bạn cần mở khóa khu vực riêng tư.' });
  }
  next();
}

/* ========================= SPRINT 1: PROFILE ========================= */
app.get('/api/profile', (req, res) => {
  try {
    const profile = readJSON(profilePath, { displayName: 'Sinh viên', theme: 'light', password: '' });
    res.json(publicProfile(profile)); // Không bao giờ gửi mật khẩu về frontend.
  } catch (error) {
    sendServerError(res, 'Không thể đọc thông tin Profile.', error);
  }
});

app.put('/api/profile', (req, res) => {
  try {
    const oldProfile = readJSON(profilePath, { displayName: 'Sinh viên', theme: 'light', password: '' });
    const body = req.body || {};

    if (body.displayName !== undefined && (typeof body.displayName !== 'string' || !body.displayName.trim())) {
      return res.status(400).json({ message: 'Tên hiển thị không được để trống.' });
    }
    if (body.theme !== undefined && !['light', 'dark'].includes(body.theme)) {
      return res.status(400).json({ message: 'Theme chỉ nhận light hoặc dark.' });
    }
    if (body.password !== undefined && typeof body.password !== 'string') {
      return res.status(400).json({ message: 'Mật khẩu không hợp lệ.' });
    }

    const updated = {
      displayName: body.displayName !== undefined ? body.displayName.trim() : (oldProfile.displayName || 'Sinh viên'),
      theme: body.theme !== undefined ? body.theme : (oldProfile.theme === 'dark' ? 'dark' : 'light'),
      password: body.password !== undefined && body.password.length > 0
        ? body.password
        : (oldProfile.password || ''),
    };

    writeJSON(profilePath, updated);
    res.json({ success: true, message: 'Đã cập nhật Profile.', profile: publicProfile(updated) });
  } catch (error) {
    sendServerError(res, 'Không thể cập nhật Profile.', error);
  }
});

/* ========================= SPRINT 2: PUBLIC NOTES ========================= */
app.get('/api/notes/:topic', validateTopic, (req, res) => {
  try {
    res.json(readNotes(getTopicFile(req.params.topic)));
  } catch (error) {
    sendServerError(res, 'Không thể đọc danh sách ghi chú.', error);
  }
});

app.post('/api/notes/:topic', validateTopic, validateNoteBody, (req, res) => {
  try {
    if (typeof req.body?.title !== 'string' || !req.body.title.trim()) {
      return res.status(400).json({ message: 'Vui lòng nhập tiêu đề ghi chú.' });
    }
    const filePath = getTopicFile(req.params.topic);
    const notes = readNotes(filePath);
    const note = createNote(req.body);
    notes.push(note);
    writeJSON(filePath, notes);
    res.status(201).json({ success: true, note });
  } catch (error) {
    sendServerError(res, 'Không thể thêm ghi chú.', error);
  }
});

app.put('/api/notes/:topic/:id', validateTopic, validateNoteBody, (req, res) => {
  try {
    const filePath = getTopicFile(req.params.topic);
    const notes = readNotes(filePath);
    const index = notes.findIndex(note => String(note.id) === req.params.id);
    if (index < 0) return res.status(404).json({ message: 'Không tìm thấy ghi chú.' });

    if (req.body?.title !== undefined) notes[index].title = req.body.title.trim();
    if (req.body?.content !== undefined) notes[index].content = req.body.content;
    notes[index].updatedAt = new Date().toISOString();
    writeJSON(filePath, notes);
    res.json({ success: true, message: 'Đã cập nhật ghi chú.', note: notes[index] });
  } catch (error) {
    sendServerError(res, 'Không thể cập nhật ghi chú.', error);
  }
});

app.delete('/api/notes/:topic/:id', validateTopic, (req, res) => {
  try {
    const filePath = getTopicFile(req.params.topic);
    const notes = readNotes(filePath);
    const remaining = notes.filter(note => String(note.id) !== req.params.id);
    if (remaining.length === notes.length) {
      return res.status(404).json({ message: 'Không tìm thấy ghi chú.' });
    }
    writeJSON(filePath, remaining);
    res.json({ success: true, message: 'Đã xóa ghi chú.' });
  } catch (error) {
    sendServerError(res, 'Không thể xóa ghi chú.', error);
  }
});

/* ========================= SPRINT 3: PRIVATE NOTES ========================= */
app.post('/api/private/auth', (req, res) => {
  try {
    const profile = readJSON(profilePath, { password: '' });
    const input = req.body?.password;

    if (!profile.password) {
      return res.status(400).json({ success: false, message: 'Bạn chưa thiết lập mật khẩu trong Cài đặt.' });
    }
    if (typeof input !== 'string' || input !== profile.password) {
      return res.status(401).json({ success: false, message: 'Sai mật khẩu!' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    sessions.set(token, Date.now() + TOKEN_TTL_MS);
    res.json({ success: true, token, expiresIn: TOKEN_TTL_MS });
  } catch (error) {
    sendServerError(res, 'Lỗi hệ thống xác thực.', error);
  }
});

app.get('/api/private/notes', requirePrivateAuth, (req, res) => {
  try {
    res.json(readNotes(privateNotesPath));
  } catch (error) {
    sendServerError(res, 'Không thể đọc ghi chú riêng tư.', error);
  }
});

app.post('/api/private/notes', requirePrivateAuth, validateNoteBody, (req, res) => {
  try {
    if (typeof req.body?.title !== 'string' || !req.body.title.trim()) {
      return res.status(400).json({ message: 'Vui lòng nhập tiêu đề ghi chú.' });
    }
    const notes = readNotes(privateNotesPath);
    const note = createNote(req.body, true);
    notes.push(note);
    writeJSON(privateNotesPath, notes);
    res.status(201).json({ success: true, note });
  } catch (error) {
    sendServerError(res, 'Không thể thêm ghi chú riêng tư.', error);
  }
});

app.put('/api/private/notes/:id', requirePrivateAuth, validateNoteBody, (req, res) => {
  try {
    const notes = readNotes(privateNotesPath);
    const index = notes.findIndex(note => String(note.id) === req.params.id);
    if (index < 0) return res.status(404).json({ message: 'Không tìm thấy ghi chú riêng tư.' });

    if (req.body?.title !== undefined) notes[index].title = req.body.title.trim();
    if (req.body?.content !== undefined) notes[index].content = req.body.content;
    notes[index].updatedAt = new Date().toISOString();
    writeJSON(privateNotesPath, notes);
    res.json({ success: true, message: 'Đã cập nhật ghi chú riêng tư.', note: notes[index] });
  } catch (error) {
    sendServerError(res, 'Không thể cập nhật ghi chú riêng tư.', error);
  }
});

app.delete('/api/private/notes/:id', requirePrivateAuth, (req, res) => {
  try {
    const notes = readNotes(privateNotesPath);
    const remaining = notes.filter(note => String(note.id) !== req.params.id);
    if (remaining.length === notes.length) {
      return res.status(404).json({ message: 'Không tìm thấy ghi chú riêng tư.' });
    }
    writeJSON(privateNotesPath, remaining);
    res.json({ success: true, message: 'Đã xóa ghi chú riêng tư.' });
  } catch (error) {
    sendServerError(res, 'Không thể xóa ghi chú riêng tư.', error);
  }
});

/* ========================= HEALTH CHECK & ERROR HANDLING ========================= */
app.get('/api/health', (req, res) => res.json({ success: true, message: 'Backend đang hoạt động.' }));

app.use((req, res) => res.status(404).json({ message: 'Không tìm thấy API.' }));
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return res.status(400).json({ message: 'JSON gửi lên không hợp lệ.' });
  }
  return sendServerError(res, 'Đã xảy ra lỗi máy chủ.', error);
});

app.listen(PORT, () => {
  console.log(`Backend đang chạy tại http://localhost:${PORT}`);
});
