import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AddTopicSchema from '../Schemas/AddTopicSchema';
import { useAuth } from '../Context/AuthContext';

export default function Add() {
    const navigate = useNavigate();
    const { userLocal } = useAuth();

    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(AddTopicSchema) });

    const onSubmit = async (data) => {
        setServerError('');

        if (!userLocal?.email) {
            setServerError('Không tìm thấy thông tin tài khoản người dùng!');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userLocal.email,
                    topic: data.topic,
                    title: data.title,
                    content: data.content,
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert('Thêm ghi chú thành công!');
                navigate('/notes');
            } else {
                setServerError(result.message || 'Thêm ghi chú thất bại!');
            }
        } catch (error) {
            setServerError('Lỗi kết nối máy chủ: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">


            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>

                    <NavLink
                        to="/notes"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 mb-2 transition"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Quay lại danh sách</span>
                    </NavLink>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Thêm ghi chú mới
                    </h1>
                </div>
            </div>

            {serverError && (
                <div className="p-3 text-sm font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-xl">
                    {serverError}
                </div>
            )}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5 transition-colors duration-300"
            >

                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Tiêu đề
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập tiêu đề ghi chú..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition"
                        {...register("title")}
                    />
                    {errors.title && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">{errors.title.message}</p>
                    )}
                </div>


                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Chủ đề
                    </label>
                    <select
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition"
                        {...register("topic")}
                    >
                        <option value="hoc-tap">Học tập</option>
                        <option value="cong-viec">Công việc</option>
                        <option value="private">Riêng tư</option>
                    </select>
                    {errors.topic && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">{errors.topic.message}</p>
                    )}
                </div>


                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Nội dung
                    </label>
                    <textarea
                        rows={8}
                        placeholder="Nhập nội dung chi tiết..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm resize-none transition"
                        {...register("content")}
                    ></textarea>
                    {errors.content && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">{errors.content.message}</p>
                    )}
                </div>


                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">

                    <NavLink
                        to="/notes"
                        className="px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition text-center"
                    >
                        Hủy
                    </NavLink>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition duration-200 disabled:opacity-50"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        <span>{loading ? 'Đang tạo...' : 'Tạo ghi chú'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
}