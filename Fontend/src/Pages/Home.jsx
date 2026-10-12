import React from 'react';
import { Link } from 'react-router-dom';

export default function Home({ note_CongViec, note_HocTap, note_Private }) {

    const totalNotes = note_CongViec.length + note_HocTap.length + note_Private.length;

    const stats = [
        {
            title: 'Tổng số ghi chú',
            count: totalNotes,
            gradientText: 'from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400',
            bgIcon: 'bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-indigo-500/30',
            borderHover: 'hover:border-indigo-500/50 hover:shadow-indigo-500/10',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
            ),
        },
        {
            title: 'Ghi chú Học tập',
            count: note_HocTap.length,
            gradientText: 'from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400',
            bgIcon: 'bg-gradient-to-tr from-emerald-500 to-teal-600 shadow-emerald-500/30',
            borderHover: 'hover:border-emerald-500/50 hover:shadow-emerald-500/10',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
        },
        {
            title: 'Ghi chú Công việc',
            count: note_CongViec.length,
            gradientText: 'from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400',
            bgIcon: 'bg-gradient-to-tr from-blue-500 to-cyan-600 shadow-blue-500/30',
            borderHover: 'hover:border-blue-500/50 hover:shadow-blue-500/10',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            title: 'Kho Riêng tư (Bảo mật)',
            count: note_Private.length,
            gradientText: 'from-amber-500 to-orange-600 dark:from-amber-400 dark:to-orange-400',
            bgIcon: 'bg-gradient-to-tr from-amber-500 to-orange-600 shadow-amber-500/30',
            borderHover: 'hover:border-amber-500/50 hover:shadow-amber-500/10',
            icon: (
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="space-y-8 animate-fade-in">

            <div className="relative overflow-hidden bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-6 sm:p-10 text-white shadow-2xl shadow-indigo-500/25 transition-all duration-300">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/15 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-pink-500/20 rounded-full blur-2xl pointer-events-none"></div>

                <div className="relative z-10 max-w-2xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-xs font-bold tracking-wide border border-white/20 shadow-inner">
                        <span className="animate-pulse">✨</span>
                        <span>Hệ thống Quản lý Ghi chú Thông minh</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                        Chào mừng trở lại! 👋 <br />
                        <span className="bg-linear-to-r from-amber-200 via-white to-pink-200 bg-clip-text text-transparent">
                            Lưu giữ mọi ý tưởng của bạn.
                        </span>
                    </h1>

                    <p className="text-indigo-100 text-sm sm:text-base leading-relaxed font-medium opacity-90">
                        Nơi tập trung an toàn cho bài học, kế hoạch công việc và các thông tin bí mật cá nhân với công nghệ bảo mật dữ liệu cục bộ.
                    </p>

                    <div className="pt-3 flex flex-wrap items-center gap-3">
                        <Link
                            to="/notes"
                            className="px-6 py-3 bg-white text-indigo-700 hover:bg-slate-100 font-bold text-sm rounded-2xl shadow-xl shadow-black/10 hover:scale-105 active:scale-95 transition duration-200 flex items-center gap-2"
                        >
                            <span>Khám phá Ghi chú</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>

                        <Link
                            to="/private"
                            className="px-6 py-3 bg-black/20 hover:bg-black/30 border border-white/30 text-white font-bold text-sm rounded-2xl backdrop-blur-md hover:scale-105 active:scale-95 transition duration-200 flex items-center gap-2"
                        >
                            <span>🔑 Vào Kho Riêng tư</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((item, index) => (
                    <div
                        key={index}
                        className={`group p-6 bg-white dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/80 dark:border-slate-800/80 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-between ${item.borderHover}`}
                    >
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                                {item.title}
                            </p>
                            <h3 className={`text-3xl font-black bg-linear-to-r ${item.gradientText} bg-clip-text text-transparent`}>
                                {item.count}
                            </h3>
                        </div>
                        <div className={`p-3.5 rounded-2xl shadow-lg transition duration-300 group-hover:scale-110 ${item.bgIcon}`}>
                            {item.icon}
                        </div>
                    </div>
                ))}
            </div>


            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                        <span>Danh mục điều hướng</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <Link
                        to="/notes"
                        className="group relative overflow-hidden p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-13 h-13 bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition duration-300 shadow-md">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition">
                                Ghi chú Chung
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                Phân loại theo chủ đề Học tập và Công việc. Dễ dàng tạo mới, chỉnh sửa và sắp xếp theo nhu cầu.
                            </p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-indigo-600 dark:text-indigo-400">
                            <span>TRUY CẬP NGAY</span>
                            <span className="transform group-hover:translate-x-1.5 transition duration-200">→</span>
                        </div>
                    </Link>

                    <Link
                        to="/private"
                        className="group relative overflow-hidden p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-amber-500 dark:hover:border-amber-500 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-13 h-13 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition duration-300 shadow-md">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition">
                                Kho Riêng tư
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                Lưu trữ các thông tin bảo mật, tài khoản ngân hàng, mật khẩu. Yêu cầu xác thực mật khẩu khi mở.
                            </p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-amber-500">
                            <span>MỞ KHÓA KHO</span>
                            <span className="transform group-hover:translate-x-1.5 transition duration-200">→</span>
                        </div>
                    </Link>

                    <Link
                        to="/profile"
                        className="group relative overflow-hidden p-6 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-purple-500 dark:hover:border-purple-500 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                    >
                        <div>
                            <div className="w-13 h-13 bg-purple-500/10 text-purple-500 border border-purple-500/20 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition duration-300 shadow-md">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-500 transition">
                                Hồ sơ & Cài đặt
                            </h3>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                                Quản lý họ tên cá nhân, đổi mật khẩu tài khoản và tùy chỉnh chế độ Giao diện Sáng/Tối.
                            </p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-bold text-purple-500">
                            <span>CẤU HÌNH CÁ NHÂN</span>
                            <span className="transform group-hover:translate-x-1.5 transition duration-200">→</span>
                        </div>
                    </Link>

                </div>
            </div>

        </div>
    );
}