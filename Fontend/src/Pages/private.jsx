import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PrivateNoteCard from '../components/PrivateNoteCard';
import { useAuth } from '../Context/AuthContext';
export default function Private() {
    const { userLocal } = useAuth();

    const [isUnlocked, setIsUnlocked] = useState(false);
    const [passwordInput, setPasswordInput] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    const [notes, setNotes] = useState([])




    const handleUnlockPage = async (e) => {
        e.preventDefault();
        try {
            const verify = await fetch("http://localhost:5000/api/verify-password", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({
                    password: passwordInput,
                    email: userLocal.email
                })
            })
            const dataVerify = await verify.json();
            if (!dataVerify.success) {
                setPasswordError(dataVerify.message || 'Mật khẩu không chính xác!');
                setLoading(false);
                return;
            }
            await fetch(`http://localhost:5000/api/private/${userLocal.email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setIsUnlocked(true);
                        setNotes(data.notes || []);
                        setPasswordInput('');
                    } else {
                        setPasswordError(data.message || 'Lỗi khi tải ghi chú riêng tư!');
                    }
                })
        } catch (error) {
            setPasswordError('Lỗi kết nối máy chủ: ' + error.message)
        } finally {
            setLoading(false)
        }
    };



    const handleLockPage = () => {
        setIsUnlocked(false);
        setNotes([]);
        setPasswordInput('');
        setPasswordError('');
    };


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


    if (!isUnlocked) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-8">
                <div className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl text-center space-y-6 transition-colors duration-300">
                    <div className="inline-flex p-4 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-2xl">
                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Trang Ghi chú Riêng tư</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            Nhập mật khẩu tài khoản (<span className="font-medium text-slate-700 dark:text-slate-300">{userLocal?.email}</span>) để xem kho bí mật.
                        </p>
                    </div>

                    <form onSubmit={handleUnlockPage} className="space-y-4">
                        <div>
                            <input
                                type="password"
                                autoFocus
                                placeholder="Nhập mật khẩu tài khoản..."
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-center text-sm font-mono tracking-widest transition"
                            />
                            {passwordError && (
                                <p className="text-xs text-rose-500 mt-2 font-medium">{passwordError}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl shadow-lg shadow-amber-500/20 transition duration-200 text-sm disabled:opacity-50"
                        >
                            {loading ? 'Đang xác thực...' : 'Mở khóa Kho Riêng tư'}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                            Kho Ghi chú Riêng tư
                        </h1>
                        <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-md">
                            UNLOCKED
                        </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        Quản lý mật khẩu, tài khoản ngân hàng và thông tin cá nhân bảo mật
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleLockPage}
                        className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-xl transition"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        <span>Khóa trang ngay</span>
                    </button>

                    <NavLink
                        to="/notes/add"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm rounded-xl shadow-lg shadow-amber-500/20 transition duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Thêm bí mật</span>
                    </NavLink>
                </div>
            </div>

            {notes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {notes.map((note) => (
                        <PrivateNoteCard key={note.id} note={note} handleDeleteNote={handleDeleteNote} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-white dark:bg-slate-900/50 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800">
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Chưa có ghi chú riêng tư nào.</p>
                </div>
            )}
        </div>
    );

}