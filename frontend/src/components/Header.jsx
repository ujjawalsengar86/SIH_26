import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SparklesIcon } from './icons';
import { useAuth } from '../context/AuthContext';

export default function Header({ onLoginClick, onSignupClick }) {
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="relative z-20 mb-7 flex w-full max-w-[1100px] items-center justify-between py-2">
            {/* Brand */}
            <Link to="/" className="flex items-center gap-3.5 no-underline">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-green-600 to-green-500 text-green-50 shadow-[0_0_18px_rgba(34,197,94,0.35)]">
                    <SparklesIcon />
                </div>
                <div className="flex flex-col items-start gap-0.5">
                    <span className="text-[1.15rem] font-extrabold leading-[1.15] tracking-tight text-ink">
                        LCA Assessment Tool
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="rounded border border-green-200 bg-green-50 px-1.5 py-px text-[0.65rem] font-bold tracking-widest text-green-700">
                            METALLURGY &amp; MINING
                        </span>
                        <span className="text-[0.65rem] text-slate-500">•</span>
                        <span className="text-[0.72rem] tracking-tight text-slate-500">
                            Sustainability &amp; Circularity
                        </span>
                    </div>
                </div>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-3.5">
                <Link
                    to="/"
                    className="mr-1 text-[0.85rem] font-medium text-slate-700 no-underline transition-colors hover:text-green-700"
                >
                    Home
                </Link>

                {isAuthenticated ? (
                    <div className="flex items-center gap-3">
                        <Link
                            to="/dashboard"
                            className="rounded-full border border-green-600 bg-green-50 px-4 py-[7px] text-[0.82rem] font-bold text-green-800 transition-all hover:bg-green-100"
                        >
                            Dashboard
                        </Link>
                        <button
                            type="button"
                            onClick={handleLogout}
                            id="header-logout-btn"
                            className="rounded-full border border-slate-300 bg-white px-4 py-[7px] text-[0.82rem] font-semibold text-slate-700 transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-700"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <>
                        <button
                            type="button"
                            onClick={onLoginClick ? onLoginClick : () => navigate('/login')}
                            id="header-login-btn"
                            title="Switch to Login view"
                            className="rounded-full border border-green-600 bg-white px-5 py-[7px] text-[0.82rem] font-bold text-green-700 transition-all hover:bg-green-50 hover:shadow-[0_4px_14px_rgba(22,163,74,0.18)]"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            onClick={onSignupClick ? onSignupClick : () => navigate('/signup')}
                            id="header-signup-btn"
                            title="Switch to Register view"
                            className="rounded-full border border-green-700 bg-green-700 px-5 py-[7px] text-[0.82rem] font-semibold text-white transition-all hover:border-green-800 hover:bg-green-800"
                        >
                            Sign Up
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}
