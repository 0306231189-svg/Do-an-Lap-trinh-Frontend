import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterSchema from '../Schemas/RegisterSchema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from "../Context/AuthContext";
export default function Register() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(RegisterSchema) })


    const onSubmit = (data) => {
        fetch("http://localhost:5000/api/register", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    login(data.user)
                    navigate("/")
                }
                alert(data.message)
            })
    }


    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] py-6">
            <div className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-xl transition-colors duration-300">

                <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-3">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tạo tài khoản mới</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Bắt đầu bảo vệ ghi chú cá nhân của bạn</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Họ và tên
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="Nguyễn Văn A"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                            {...register("name")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Địa chỉ Email
                        </label>
                        <input
                            type="email"
                            required
                            placeholder="user@example.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                            {...register("email")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Mật khẩu
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="Tối thiểu 8 ký tự"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                            {...register("password")}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                            Xác nhận mật khẩu
                        </label>
                        <input
                            type="password"
                            required
                            placeholder="Nhập lại mật khẩu"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                            {...register("confirmpassword")}
                        />
                    </div>



                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition duration-200 mt-2"
                    >
                        Đăng ký tài khoản
                    </button>
                </form>

                {/* Footer Link */}
                <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
                    Đã có tài khoản?{' '}
                    <Link to="/login" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                        Đăng nhập ngay
                    </Link>
                </p>

            </div>
        </div>
    );
}