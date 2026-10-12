import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginSchema from '../Schemas/LoginSchema'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../Context/AuthContext';
export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth()
    const {

        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ resolver: yupResolver(LoginSchema) });

    const onSubmit = (data) => {
        fetch('http://localhost:5000/api/login', {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const { password, ...user } = data.user;
                    login(user);
                    navigate("/")

                }
                alert(data.message);
            })
    }
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-12rem)] py-6">
            <div className="w-full max-w-md p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl shadow-xl transition-colors duration-300">

                <div className="text-center mb-8">
                    <div className="inline-flex p-3 bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 rounded-2xl mb-3">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Đăng nhập tài khoản</h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Truy cập vào ghi chú & kho thông tin riêng tư</p>
                </div>


                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                            Email hoặc Tên đăng nhập
                        </label>
                        <input
                            type="text"
                            placeholder="user@example.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                            {...register("name")}
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1.5">
                            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                                Mật khẩu
                            </label>

                        </div>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition"
                            {...register("password")}
                        />
                        <a href="#forgot" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                            Quên mật khẩu?
                        </a>
                    </div>



                    <button
                        type="submit"
                        className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition duration-200"
                    >
                        Đăng nhập
                    </button>
                </form>


                <p className="text-center text-sm text-slate-600 dark:text-slate-400 mt-6">
                    Chưa có tài khoản?{' '}
                    <Link to="/register" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline">
                        Đăng ký ngay
                    </Link>
                </p>

            </div>
        </div>
    );
}