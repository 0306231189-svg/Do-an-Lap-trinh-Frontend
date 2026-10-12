const express = require("express");
const cors = require("cors");
const fs = require("fs")
const path = require("path")
const bcrypt = require("bcrypt");
const { json } = require("stream/consumers");
const app = express()
app.use(cors());
app.use(express.json());

const user_dir = path.join(__dirname, "data", "users")


//User
app.post("/api/login", async (req, res) => {
    try {
        const { name, password } = req.body;
        const userfolder = fs.readdirSync(user_dir);
        for (const file of userfolder) {
            const folderPath = path.join(user_dir, file)
            if (!fs.statSync(folderPath).isDirectory()) continue;
            const profilePath = path.join(folderPath, "profile.json");
            const profile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));
            if ((profile.name == name || profile.email == name) && await bcrypt.compare(password, profile.password)) {
                return res.json({
                    success: true,
                    message: "Đã dăng nhập thành công",
                    user: profile
                })
            }
        }

        res.status(500).json({ success: false, message: "Tài khoản hoặc mật khẩu không đúng" })

    } catch (error) {
        res.status(404).json({ message: "Lỗi đọc file" });
    }
})
app.post("/api/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;


        const userfolder = fs.readdirSync(user_dir);
        for (const file of userfolder) {
            const folderPath = path.join(user_dir, file)
            if (!fs.statSync(folderPath).isDirectory()) continue;
            const profilePath = path.join(folderPath, "profile.json")
            if (fs.existsSync(profilePath)) {
                const profile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));
                if (profile.name == name || profile.email == email) {
                    return res.status(400).json({
                        message: "Tài khoản đã tồn tại",
                        success: false

                    })
                }
            }
        }
        const folderName = `user_${email}`
        const newUserPath = path.join(user_dir, folderName)
        fs.mkdirSync(newUserPath, { recursive: true })

        //Mã hóa password
        const passwordHash = await bcrypt.hash(password, 10);

        const newProfile = {
            name: name,
            email: email,
            password: passwordHash,
            theme: "light",
        }
        //thêm vào tạo file profile.json
        const profilePath = path.join(newUserPath, "profile.json")
        fs.writeFileSync(profilePath, JSON.stringify(newProfile, null, 2), "utf-8");



        //tạo file private
        fs.writeFileSync(
            path.join(newUserPath, "private.json"),
            JSON.stringify([], null, 2),
            "utf-8"
        );
        const notesPath = path.join(newUserPath, "notes")
        //tạo file notes
        fs.mkdirSync(
            notesPath,
            { recursive: true }
        )
        //tạo fie hoc-tap.json
        fs.writeFileSync(
            path.join(notesPath, "hoc-tap.json"),
            JSON.stringify([], null, 2),
            "utf-8"
        )
        // tạo file congviec.json
        fs.writeFileSync(
            path.join(notesPath, "cong-viec.json"),
            JSON.stringify([], null, 2),
            "utf-8"
        )
        res.json(
            {
                message: "Đã đăng ký thành công",
                user: newProfile,
                success: true
            }
        )
    } catch (error) {
        res.status(404).json({ message: "Lỗi đọc/ghi dữ liệu" + error })
    }
})

app.get("/api/notes/:userEmail/:topic", (req, res) => {
    try {
        const email = req.params.userEmail;
        const topic = req.params.topic;
        const userPath = path.join(user_dir, `user_${email}`);

        if (!fs.existsSync(userPath)) {
            return res.json({
                message: "Không tìm thấy file tài khoản",
                success: false
            });
        }

        const notesPath = path.join(userPath, "notes");
        const noteFile = path.join(notesPath, `${topic}.json`);

        if (!fs.existsSync(noteFile)) {
            return res.json({ success: true, notes: [] });
        }

        const notes = JSON.parse(fs.readFileSync(noteFile, "utf-8"));
        res.json({
            success: true,
            notes: notes
        });
    } catch (error) {
        res.status(500).json({
            message: "Lỗi đọc/ghi dữ liệu " + error.message,
            success: false
        });
    }
});
// API Thêm ghi chú mới theo Topic
app.post("/api/notes", (req, res) => {
    try {
        const { email, topic, title, content } = req.body;

        if (!email || !topic || !title || !content) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ thông tin (email, topic, title, content)",
                success: false
            });
        }

        const userPath = path.join(user_dir, `user_${email}`);
        if (!fs.existsSync(userPath)) {
            return res.status(404).json({
                message: "Không tìm thấy thư mục người dùng",
                success: false
            });
        }

        // Chuẩn hóa tên topic (sửa lỗi chính tả priavte -> private nếu có)
        const normalizedTopic = topic === 'priavte' ? 'private' : topic;

        let noteFile;
        if (normalizedTopic === 'private') {
            // Lưu vào file private.json ở thư mục gốc của user
            noteFile = path.join(userPath, "private.json");
        } else {
            // Lưu vào thư mục notes/
            const notesPath = path.join(userPath, "notes");
            if (!fs.existsSync(notesPath)) {
                fs.mkdirSync(notesPath, { recursive: true });
            }
            noteFile = path.join(notesPath, `${normalizedTopic}.json`);
        }

        // Đọc danh sách ghi chú hiện tại
        let notes = [];
        if (fs.existsSync(noteFile)) {
            const fileData = fs.readFileSync(noteFile, "utf-8");
            notes = fileData ? JSON.parse(fileData) : [];
        }

        // Tạo object ghi chú mới
        const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
        const newNote = {
            id: Date.now(),
            title,
            content,
            topic: normalizedTopic,
            createdAt: now,
            updatedAt: now
        };

        // Thêm ghi chú mới vào đầu mảng
        notes.unshift(newNote);

        // Ghi lại file JSON
        fs.writeFileSync(noteFile, JSON.stringify(notes, null, 2), "utf-8");

        return res.status(201).json({
            message: "Thêm ghi chú thành công",
            note: newNote,
            success: true
        });

    } catch (error) {
        console.error("Lỗi khi thêm ghi chú:", error);
        return res.status(500).json({
            message: "Lỗi hệ thống khi đọc/ghi dữ liệu: " + error.message,
            success: false
        });
    }
});
app.get("/api/notes/detail/:email/:id/:topic", (req, res) => {
    try {
        const { email, id, topic } = req.params;
        const userPath = path.join(user_dir, `user_${email}`);

        if (!fs.existsSync(userPath)) {
            return res.status(404).json({ message: "Không tìm thấy người dùng", success: false });
        }

        // Các file JSON cần tìm kiếm ghi chú
        let filePath = null;
        switch (topic) {
            case "hoc-tap":
                filePath = path.join(userPath, "notes", "hoc-tap.json");
                break;
            case "cong-viec":
                filePath = path.join(userPath, "notes", "cong-viec.json");
                break;
            case "private":
                filePath = path.join(userPath, "private.json")
                break;
            default: null
        }

        if (!fs.existsSync(filePath)) {
            return res.status(404).json(
                {
                    message: `Không tìm thấy file ${topic}`,
                    success: false
                });
        }

        let foundNote = null;


        if (fs.existsSync(filePath)) {
            const notes = JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
            const note = notes.find(n => String(n.id) === String(id));
            if (note) {
                foundNote = note;
            }
        }


        if (foundNote) {
            return res.json({ success: true, note: foundNote });
        } else {
            return res.status(404).json({ message: "Không tìm thấy ghi chú", success: false });
        }
    } catch (error) {
        return res.status(500).json({ message: "Lỗi hệ thống: " + error.message, success: false });
    }
});
app.put("/api/notes/:id", (req, res) => {
    try {
        const { id } = req.params;
        const { email, topic, title, content } = req.body;

        if (!email || !title || !content) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ tiêu đề và nội dung",
                success: false
            });
        }


        const userPath = path.join(user_dir, `user_${email}`);
        if (!fs.existsSync(userPath)) {
            return res.status(404).json({
                message: "Không tìm thấy tài khoản người dùng",
                success: false
            });
        }


        let targetFilePath = null;

        if (topic) {
            targetFilePath = topic === 'private'
                ? path.join(userPath, "private.json")
                : path.join(userPath, "notes", `${topic}.json`);
        }

        const filesToSearch = targetFilePath ? [targetFilePath] : [
            path.join(userPath, "notes", "hoc-tap.json"),
            path.join(userPath, "notes", "cong-viec.json"),
            path.join(userPath, "private.json")
        ];

        let foundFilePath = null;
        let notes = [];
        let noteIndex = -1;


        for (const filePath of filesToSearch) {
            if (fs.existsSync(filePath)) {
                const fileData = fs.readFileSync(filePath, "utf-8");
                const currentNotes = fileData ? JSON.parse(fileData) : [];
                const index = currentNotes.findIndex(n => String(n.id) === String(id));

                if (index !== -1) {
                    foundFilePath = filePath;
                    notes = currentNotes;
                    noteIndex = index;
                    break;
                }
            }
        }


        if (!foundFilePath || noteIndex === -1) {
            return res.status(404).json({
                message: "Không tìm thấy ghi chú cần chỉnh sửa",
                success: false
            });
        }

        const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
        notes[noteIndex] = {
            ...notes[noteIndex],
            title: title,
            content: content,
            updatedAt: now
        };

        fs.writeFileSync(foundFilePath, JSON.stringify(notes, null, 2), "utf-8");

        return res.json({
            message: "Cập nhật ghi chú thành công",
            note: notes[noteIndex],
            success: true
        });

    } catch (error) {
        console.error("Lỗi khi cập nhật ghi chú:", error);
        return res.status(500).json({
            message: "Lỗi hệ thống khi đọc/ghi dữ liệu: " + error.message,
            success: false
        });
    }
});
app.post("/api/verify-password", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Vui lòng nhập đầy đủ email và mật khẩu",
                success: false
            });
        }

        const userPath = path.join(user_dir, `user_${email}`);
        const profilePath = path.join(userPath, "profile.json");

        if (!fs.existsSync(profilePath)) {
            return res.status(404).json({
                message: "Không tìm thấy hồ sơ người dùng",
                success: false
            });
        }

        // Đọc file profile.json để lấy password hash
        const profile = JSON.parse(fs.readFileSync(profilePath, "utf-8"));

        // So sánh mật khẩu bằng bcrypt
        const isMatch = await bcrypt.compare(password, profile.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu không chính xác!",
                success: false
            });
        }

        return res.json({
            message: "Mật khẩu chính xác",
            success: true
        });

    } catch (error) {
        console.error("Lỗi xác thực mật khẩu:", error);
        return res.status(500).json({
            message: "Lỗi hệ thống: " + error.message,
            success: false
        });
    }
});

// 2. HÀM LẤY DỮ LIỆU GHI CHÚ BẢO MẬT TỪ FILE private.json
app.get("/api/private/:email", (req, res) => {
    try {
        const { email } = req.params;
        const userPath = path.join(user_dir, `user_${email}`);
        const privateFilePath = path.join(userPath, "private.json");

        if (!fs.existsSync(userPath)) {
            return res.status(404).json({
                message: "Không tìm thấy thư mục người dùng",
                success: false
            });
        }

        let notes = [];
        if (fs.existsSync(privateFilePath)) {
            const fileData = fs.readFileSync(privateFilePath, "utf-8");
            notes = fileData ? JSON.parse(fileData) : [];
        }

        return res.json({
            success: true,
            notes: notes
        });

    } catch (error) {
        console.error("Lỗi lấy dữ liệu kho riêng tư:", error);
        return res.status(500).json({
            message: "Lỗi hệ thống khi đọc dữ liệu: " + error.message,
            success: false
        });
    }
});
app.post("/api/profile/update", (req, res) => {
    try {
        const { name, email, theme } = req.body;

        const userPath = path.join(user_dir, `user_${email}`);
        const profilePath = path.join(userPath, "profile.json");
        if (!fs.existsSync(profilePath)) {
            return res.json({
                success: false,
                message: "Không tìm thấy file profile(Update)"
            })
        }
        const profileData = JSON.parse(fs.readFileSync(profilePath, "utf-8"));
        profileData.name = name;
        profileData.theme = theme;
        fs.writeFileSync(profilePath, JSON.stringify(profileData, null, 2), "utf-8");
        const { password, ...profile } = JSON.parse(fs.readFileSync(profilePath, "utf-8"))

        res.json({
            success: true,
            message: "Đã cập nhập profile thành công",
            profile: profile
        })
    } catch (error) {
        console.error("Lỗi lấy dữ liệu kho profile(update):", error);
        return res.status(500).json({
            message: "Lỗi hệ thống khi đọc dữ liệu: " + error.message,
            success: false
        });
    }
})
app.post("/api/notes/delete", (req, res) => {
    try {
        const { email, topic, id } = req.body;

        const userPath = path.join(user_dir, `user_${email}`);
        const filePath = topic === 'private'
            ? path.join(userPath, "private.json")
            : path.join(userPath, "notes", `${topic}.json`);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File ghi chú không tồn tại", success: false });
        }

        // 2. Đọc file, lọc bỏ ghi chú cần xóa
        const notes = JSON.parse(fs.readFileSync(filePath, "utf-8") || "[]");
        const updatedNotes = notes.filter(n => String(n.id) !== String(id));

        if (notes.length === updatedNotes.length) {
            return res.status(404).json({ message: "Không tìm thấy ghi chú cần xóa", success: false });
        }

        // 3. Ghi đè lại file
        fs.writeFileSync(filePath, JSON.stringify(updatedNotes, null, 2), "utf-8");
        return res.json({ message: "Xóa ghi chú thành công!", success: true });

    } catch (error) {
        return res.status(500).json({ message: "Lỗi xóa ghi chú: " + error.message, success: false });
    }
});
app.post("/api/profile/change-password", async (req, res) => {
    try {


        const { email, currentPassword, newPassword } = req.body;
        const userPath = path.join(user_dir, `user_${email}`);
        const profilePath = path.join(userPath, "profile.json");
        if (!fs.existsSync(profilePath)) {
            return res.json({
                success: false,
                message: "Không tìm thấy file profile(Change_PassWord)"
            })
        }
        const profileData = JSON.parse(fs.readFileSync(profilePath, "utf-8"));
        const isMatch = await bcrypt.compare(currentPassword, profileData.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "Mật khẩu hiện tại không chính xác",
                success: false
            });
        }

        // 5. Kiểm tra mật khẩu mới không được trùng mật khẩu cũ
        const isSame = await bcrypt.compare(newPassword, profileData.password);
        if (isSame) {
            return res.status(400).json({
                message: "Mật khẩu mới không được giống mật khẩu hiện tại",
                success: false
            });
        }

        // 6. Mã hóa mật khẩu mới và ghi đè vào tệp profile.json
        profileData.password = await bcrypt.hash(newPassword, 10);
        fs.writeFileSync(profilePath, JSON.stringify(profileData, null, 2), "utf-8");

        return res.json({
            message: "Thay đổi mật khẩu thành công!",
            success: true
        });
    } catch (error) {
        console.log("Lỗi khi đổi mật khẩu:", error);
        return res.status(500).json({
            message: "Lỗi hệ thống khi cập nhật mật khẩu: " + error.message,
            success: false
        });
    }
})
const PORT = 5000;
app.listen(PORT, () => {
    console.log("Server has running on PORT: http://localhost:" + PORT);
})
