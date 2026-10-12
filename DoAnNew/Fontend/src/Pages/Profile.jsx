import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
export default function Profile() {
    const { userLocal, login } = useAuth();
    const [name, setName] = useState(userLocal.name)
    const [theme, setTheme] = useState(userLocal.theme || "light")

    const onSubmit = async (e) => {
        e.preventDefault();
        await fetch("http://localhost:5000/api/profile/update", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                name: name,
                email: userLocal.email,
                theme: theme,
            })
        }).then(res => res.json())
            .then(data => {
                alert(data.message)
                login(data.profile)

            })
    }


    return (
        <div className="max-w-3xl mx-auto space-y-6">

            <div className="flex flex-col sm:flex-row items-center gap-5 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm transition-colors duration-300">
                <div className="relative">
                    <div className="w-20 h-20 rounded-2xl bg-linear-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-3xl text-white shadow-lg shadow-indigo-500/25">
                        {userLocal.name ? userLocal.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                </div>

                <div className="text-center sm:text-left">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {userLocal.name}
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        {userLocal.email}
                    </p>
                    <span className="inline-block mt-2 px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/50 rounded-lg">
                        Tài khoản Cá nhân
                    </span>
                </div>
            </div>

            <form onSubmit={onSubmit} className="space-y-6">



                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm space-y-4 transition-colors duration-300">
                    <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="p-2 bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            Thông tin cá nhân
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                                Địa chỉ Email (Không thể sửa)
                            </label>
                            <input
                                type="email"
                                disabled
                                value={userLocal.email}
                                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed text-sm"
                            />
                        </div>
                    </div>
                </div>


                <div className="p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-sm space-y-4 transition-colors duration-300">
                    <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                        <div className="p-2 bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                Chế độ giao diện (Theme)
                            </h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                        <button
                            type="button"
                            onClick={() => setTheme('light')}
                            className={`flex items-center gap-3.5 p-4 rounded-xl border text-left transition duration-200 ${theme === 'light'
                                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-600/20 text-indigo-900 dark:text-indigo-300'
                                : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                                }`}
                        >
                            <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl shrink-0">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-sm">Giao diện Sáng (Light)</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Hiển thị nền sáng chuẩn</div>
                            </div>
                        </button>

                        {/* Option Tối */}
                        <button
                            type="button"
                            onClick={() => setTheme('dark')}
                            className={`flex items-center gap-3.5 p-4 rounded-xl border text-left transition duration-200 ${theme === 'dark'
                                ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-600/20 text-indigo-900 dark:text-indigo-300'
                                : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                                }`}
                        >
                            <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl shrink-0">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            </div>
                            <div>
                                <div className="font-semibold text-sm">Giao diện Tối (Dark)</div>
                                <div className="text-xs text-slate-500 dark:text-slate-400">Dịu mắt vào ban đêm</div>
                            </div>
                        </button>
                    </div>
                </div>



                {/* NÚT LƯU THAY ĐỔI TỔNG */}
                <div className="flex items-center justify-end">
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition duration-200"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Lưu tất cả thay đổi</span>
                    </button>
                </div>

            </form>
        </div>
    );
}