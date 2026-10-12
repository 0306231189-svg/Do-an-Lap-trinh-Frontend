import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import { useAuth } from '../Context/AuthContext';

export default function Notes({ note_HocTap, note_CongViec }) {
    const { userLocal } = useAuth();


    const topics = [
        { id: 'hoc-tap', name: 'Học tập' },
        { id: 'cong-viec', name: 'Công việc' },
    ];

    const [selectedTopic, setSelectedTopic] = useState('hoc-tap');
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!userLocal?.email) return;

        setLoading(true);
        fetch(`http://localhost:5000/api/notes/${userLocal.email}/${selectedTopic}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setNotes(data.notes || []);
                } else {
                    setNotes([]);
                }
            })
            .catch((err) => {
                console.error("Lỗi khi tải ghi chú:", err);
                setNotes([]);
            })
            .finally(() => setLoading(false));
    }, [userLocal?.email, selectedTopic]);
    const handleDeleteNote = async (noteId, topic) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa ghi chú này?")) return;

        try {
            const res = await fetch(`http://localhost:5000/api/notes/delete`, {
                method: 'POST',
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    email: userLocal.email,
                    topic: topic,
                    id: noteId
                })
            });
            const data = await res.json();

            if (data.success) {
                alert("Xóa thành công!");
                setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));

            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Lỗi kết nối: " + error.message);
        }
    };
    return (
        <div className="space-y-6">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Ghi chú cá nhân</h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Tài khoản: <span className="font-semibold text-indigo-600 dark:text-indigo-400">{userLocal?.email}</span>
                    </p>
                </div>

                <NavLink
                    to="/notes/add"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/20 transition duration-200"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span>Thêm ghi chú</span>
                </NavLink>
            </div>

            <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
                {topics.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setSelectedTopic(t.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${selectedTopic === t.id
                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                            : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                            }`}
                    >
                        {t.name}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
                    Đang tải danh sách ghi chú...
                </div>
            ) : notes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {notes.map((note, index) => (
                        <NoteCard key={note.id || index} note={note} email={userLocal.email} handleDeleteNote={handleDeleteNote} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">
                        Chưa có ghi chú nào trong danh mục này.
                    </p>
                </div>
            )}

        </div>
    );
}