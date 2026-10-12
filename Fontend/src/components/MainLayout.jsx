import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

export default function MainLayout() {
    const { isAuth, userLocal, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Đồng bộ theme
    useEffect(() => {
        const root = document.documentElement;
        const activeTheme = userLocal?.theme || localStorage.getItem('theme') || 'dark';

        if (activeTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [userLocal?.theme]);


    const handleLogout = () => {
        if (window.confirm('Bạn có chắc chắn muốn đăng xuất tài khoản?')) {
            logout();
            navigate('/login');
        }
    };

    const getNavLinkClass = ({ isActive }) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
        }`;

    const navItems = [
        { path: '/', label: 'Trang chủ' },
        { path: '/notes', label: 'Ghi chú' },
        { path: '/private', label: 'Riêng tư' },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300">


            <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800/80 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">


                        <NavLink to="/" className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-600/10 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 dark:border-indigo-500/30 rounded-xl">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <span className="font-bold text-lg tracking-wide text-slate-900 dark:text-white">
                                Quản lý Ghi chú
                            </span>
                        </NavLink>


                        <nav className="hidden md:flex items-center gap-2">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === '/'}
                                    className={getNavLinkClass}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>


                        <div className="flex items-center gap-3">
                            {isAuth ? (
                                <div className="flex items-center gap-2">

                                    <NavLink
                                        to="/profile"
                                        className="flex items-center gap-2 px-3.5 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/60 rounded-lg transition"
                                    >
                                        <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        <span>Profile</span>
                                    </NavLink>


                                    <button
                                        onClick={handleLogout}
                                        title="Đăng xuất"
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800/50 rounded-lg transition"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Đăng xuất</span>
                                    </button>
                                </div>
                            ) : (
                                <NavLink
                                    to="/login"
                                    className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-md shadow-indigo-600/20 transition"
                                >
                                    Login
                                </NavLink>
                            )}


                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white md:hidden rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                                </svg>
                            </button>
                        </div>
                    </div>


                    {isMobileMenuOpen && (
                        <nav className="md:hidden py-3 border-t border-slate-200 dark:border-slate-800/80 space-y-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    end={item.path === '/'}
                                    className={getNavLinkClass}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                    )}
                </div>
            </header>


            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div>
                    <Outlet />
                </div>
            </main>


            <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-slate-100/60 dark:bg-slate-900/40 py-6 text-slate-500 dark:text-slate-400 text-xs transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Quản lý Ghi chú</span>
                        <span>•</span>
                        <span className="text-slate-500">Hệ thống lưu trữ & thông tin riêng tư</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="#privacy" className="hover:text-slate-800 dark:hover:text-slate-200 transition">Quyền riêng tư</a>
                        <a href="#terms" className="hover:text-slate-800 dark:hover:text-slate-200 transition">Điều khoản</a>
                        <span className="text-slate-400 dark:text-slate-600">© 2026 Quản lý Ghi chú</span>
                    </div>
                </div>
            </footer>

        </div>
    );
}