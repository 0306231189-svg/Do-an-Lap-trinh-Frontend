import React, { useState, useEffect } from 'react';

export default function Settings() {
    // Lấy Theme hiện tại từ localStorage
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    // State Form đổi mật khẩu
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState({ type: '', text: '' });

    // Đồng bộ theme với DOM và localStorage
    useEffect(() => {
        const root = document.documentElement;
        if (theme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Xử lý đổi mật khẩu
    const handlePasswordChange = (e) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setMessage({ type: 'error', text: 'Mật khẩu mới và mật khẩu xác nhận không khớp!' });
            return;
        }
        if (passwordForm.newPassword.length < 6) {
            setMessage({ type: 'error', text: 'Mật khẩu mới phải có tối thiểu 6 ký tự.' });
            return;
        }

        // Giả lập thành công
        setMessage({ type: 'success', text: 'Đã đổi mật khẩu tài khoản thành công!' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">

            {/* Header Trang */}
            <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Cài đặt hệ thống</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Quản lý bảo mật tài khoản và tùy chỉnh giao diện ứng dụng
                </p>
            </div>

            {/* KHỐI 1: TÙY CHỈNH GIAO DIỆN (THEME) */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm transition-colors duration-300">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2.5 bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Giao diện (Theme)</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Chọn chế độ hiển thị phù hợp với thị giác của bạn</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">

                    {/* Card Lựa chọn Light Theme */}
                    <button
                        type="button"
                        onClick={() => setTheme('light')}
                        className={`flex items-center gap-4 p-4 rounded-xl border text-left transition duration-200 ${theme === 'light'
                                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-300 ring-2 ring-indigo-600/20'
                                : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                    >
                        <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div>
                            <div className="font-semibold text-sm">Giao diện Sáng (Light)</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Tối ưu hiển thị vào ban ngày</div>
                        </div>
                    </button>

                    {/* Card Lựa chọn Dark Theme */}
                    <button
                        type="button"
                        onClick={() => setTheme('dark')}
                        className={`flex items-center gap-4 p-4 rounded-xl border text-left transition duration-200 ${theme === 'dark'
                                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-900 dark:text-indigo-300 ring-2 ring-indigo-600/20'
                                : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                            }`}
                    >
                        <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </div>
                        <div>
                            <div className="font-semibold text-sm">Giao diện Tối (Dark)</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">Bảo vệ mắt và dịu nhẹ ban đêm</div>
                        </div>
                    </button>

                </div>
            </div>

            {/* KHỐI 2: ĐỔI MẬT KHẨU TÀI KHOẢN */}
            <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm transition-colors duration-300">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Thay đổi mật khẩu</h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Khuyến nghị thay đổi mật khẩu định kỳ để tăng cường bảo mật</p>
                    </div>
                </div>

                {/* Thông báo thành công / thất bại */}
                {message.text && (
                    <div
                        className={`p-4 mb-6 rounded-xl text-sm ${message.type === 'error'
                                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                            }`}
                    >
                        {message.text}
                    </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Mật khẩu hiện tại
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="••••••••"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Mật khẩu mới
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="Tối thiểu 6 ký tự"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Xác nhận mật khẩu mới
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="Nhập lại mật khẩu mới"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl shadow-md shadow-indigo-600/20 transition duration-200 mt-2"
                    >
                        Cập nhật mật khẩu
                    </button>
                </form>
            </div>

        </div>
    );
}