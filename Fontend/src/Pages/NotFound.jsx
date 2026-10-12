import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-14rem)] py-12 text-center">
            <div className="relative mb-6">

                <span className="text-8xl sm:text-9xl font-black text-slate-200 dark:text-slate-800/80 tracking-widest select-none">
                    404
                </span>


            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Trang không tồn tại
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto text-sm sm:text-base mb-8">
                Đường dẫn bạn đang truy cập có thể đã bị thay đổi, xóa bỏ hoặc không khả dụng trong hệ thống ghi chú.
            </p>

            <Link
                to="/"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm rounded-xl shadow-lg shadow-indigo-600/20 transition duration-200"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Quay về Trang chủ</span>
            </Link>
        </div>
    );
}