import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import AddTopicSchema from '../Schemas/AddTopicSchema';
import { useAuth } from '../Context/AuthContext';

export default function Edit() {
    const { id, topic } = useParams();
    const navigate = useNavigate();
    const { userLocal } = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [serverError, setServerError] = useState('');
    const [currentTopic, setCurrentTopic] = useState('hoc-tap');
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(AddTopicSchema),
        defaultValues: {
            title: '',
            topic: 'hoc-tap',
            content: '',
        }
    });

    useEffect(() => {
        if (!userLocal?.email || !id) return;

        setIsLoading(true);
        fetch(`http://localhost:5000/api/notes/detail/${userLocal.email}/${id}/${topic}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.success && data.note) {
                    const topicVal = data.note.topic || 'hoc-tap';
                    setValue('title', data.note.title);
                    setValue('topic', topicVal);
                    setValue('content', data.note.content);
                    setCurrentTopic(topicVal);
                } else {
                    setServerError(data.message || 'Không tìm thấy thông tin ghi chú');
                }
            })
            .catch((err) => {
                setServerError('Lỗi khi tải ghi chú: ' + err.message);
            })
            .finally(() => setIsLoading(false));
    }, [id, userLocal?.email, setValue]);


    const onSubmit = async (data) => {
        setServerError('');
        if (!userLocal?.email) {
            setServerError('Không tìm thấy tài khoản đăng nhập!');
            return;
        }

        setIsSaving(true);
        try {
            const response = await fetch(`http://localhost:5000/api/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userLocal.email,
                    title: data.title,
                    topic: currentTopic,
                    content: data.content,
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert('Đã lưu thay đổi thành công!');
                topic == "private" ?
                    navigate('/private') :
                    navigate('/notes')
            } else {
                setServerError(result.message || 'Cập nhật ghi chú thất bại');
            }
        } catch (error) {
            setServerError('Lỗi kết nối máy chủ: ' + error.message);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-12 text-slate-500 dark:text-slate-400 text-sm font-medium">
                Đang tải dữ liệu ghi chú...
            </div>
        );
    }

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
                        Chỉnh sửa ghi chú
                    </h1>
                </div>

                <span className="px-3 py-1 text-xs font-mono font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/50 rounded-lg">
                    ID: {id}
                </span>
            </div>

            {serverError && (
                <div className="p-3 text-sm font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 rounded-xl">
                    {serverError}
                </div>
            )}


            <form onSubmit={handleSubmit(onSubmit)} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-5 transition-colors duration-300">


                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Tiêu đề ghi chú
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập tiêu đề..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm transition"
                        {...register('title')}
                    />
                    {errors.title && (
                        <p className="text-xs text-rose-500 mt-1 font-medium">{errors.title.message}</p>
                    )}
                </div>


                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                            Loại / Chủ đề
                        </label>
                        <span className="text-xs text-slate-400 font-normal">
                            🔒 Cố định (không thể sửa topic)
                        </span>
                    </div>
                    <select
                        disabled
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed text-sm font-medium transition"
                        {...register('topic')}
                    >
                        <option value="hoc-tap">Học tập</option>
                        <option value="cong-viec">Công việc</option>
                        <option value="private">Riêng tư</option>
                    </select>
                </div>


                <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                        Nội dung chi tiết
                    </label>
                    <textarea
                        rows={8}
                        placeholder="Nhập nội dung ghi chú..."
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm resize-none transition"
                        {...register('content')}
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
                        Hủy bỏ
                    </NavLink>

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition duration-200 disabled:opacity-50"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
                    </button>
                </div>

            </form>
        </div>
    );
}