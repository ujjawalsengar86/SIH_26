import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { SparklesIcon, LayersIcon, CommandIcon, ArrowRightIcon } from '../components/icons';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden px-7 pb-12 pt-6 bg-[radial-gradient(circle_at_10%_30%,rgba(34,197,94,0.12),transparent_30%),radial-gradient(circle_at_90%_70%,rgba(22,163,74,0.10),transparent_30%),linear-gradient(135deg,#f4fbf6_0%,#ffffff_52%,#eaf8ef_100%)]">
            {/* Ambient dynamic glowing orbs */}
            <div className="pointer-events-none absolute left-[20%] top-[15%] z-0 h-[550px] w-[550px] animate-pulse-orb rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.16)_0%,rgba(22,163,74,0.08)_40%,transparent_70%)] blur-[80px]" />
            <div className="pointer-events-none absolute bottom-[10%] right-[18%] z-0 h-[480px] w-[480px] animate-pulse-orb-reverse rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12)_0%,rgba(22,163,74,0.06)_45%,transparent_70%)] blur-[90px]" />

            <Header 
                onLoginClick={() => navigate('/login')} 
                onSignupClick={() => navigate('/signup')} 
            />

            <main className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center justify-center text-center">
                {/* Hero Card */}
                <div className="relative w-full overflow-hidden rounded-3xl border border-green-700/20 bg-white/90 p-8 shadow-[0_20px_60px_rgba(22,101,52,0.14)] backdrop-blur-md md:p-14">
                    <div className="mx-auto flex max-w-3xl flex-col items-center">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-300 bg-green-50 px-4 py-1.5 text-xs font-bold tracking-wider text-green-800">
                            <SparklesIcon />
                            <span>SUSTAINABILITY &amp; METALLURGY WORKSPACE</span>
                        </div>

                        <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
                            Welcome to LCA
                        </h1>

                        <h2 className="mb-6 text-xl font-bold text-green-700 md:text-2xl">
                            Life Cycle Assessment Tool
                        </h2>

                        <p className="mb-8 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
                            AI-Driven Life Cycle Assessment for Sustainability and Circularity in Metallurgy and Mining
                        </p>

                        {/* Navigation Action Buttons */}
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link
                                to="/login"
                                id="home-login-btn"
                                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-700 via-green-600 to-green-500 px-8 py-3.5 text-base font-bold text-white shadow-[0_6px_25px_rgba(22,163,74,0.30)] transition-all hover:-translate-y-0.5 hover:from-green-800 hover:via-green-700 hover:to-green-600 hover:shadow-[0_8px_30px_rgba(22,163,74,0.38)] active:translate-y-0"
                            >
                                <span>Login</span>
                                <ArrowRightIcon />
                            </Link>

                            <Link
                                to="/signup"
                                id="home-signup-btn"
                                className="flex items-center gap-2 rounded-xl border-2 border-green-600 bg-white px-8 py-3.5 text-base font-bold text-green-700 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-green-50 hover:shadow-[0_6px_20px_rgba(22,163,74,0.18)] active:translate-y-0"
                            >
                                <span>Sign Up</span>
                            </Link>
                        </div>
                    </div>

                    {/* Features Preview Bento */}
                    <div className="mt-12 grid grid-cols-1 gap-4 text-left md:grid-cols-3">
                        <div className="flex flex-col gap-2 rounded-2xl border border-green-100 bg-green-50/50 p-5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm">
                                <LayersIcon />
                            </div>
                            <h3 className="text-sm font-bold text-ink">Scope 1, 2 &amp; 3 Analytics</h3>
                            <p className="text-xs text-slate-600">Complete carbon inventory across smelters, refining, and logistics.</p>
                        </div>

                        <div className="flex flex-col gap-2 rounded-2xl border border-green-100 bg-green-50/50 p-5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm">
                                <CommandIcon />
                            </div>
                            <h3 className="text-sm font-bold text-ink">Circularity Index</h3>
                            <p className="text-xs text-slate-600">Material recirculation rates for scrap recycling and alloy loops.</p>
                        </div>

                        <div className="flex flex-col gap-2 rounded-2xl border border-green-100 bg-green-50/50 p-5">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm">
                                <SparklesIcon />
                            </div>
                            <h3 className="text-sm font-bold text-ink">AI Decision Engine</h3>
                            <p className="text-xs text-slate-600">Automated reduction suggestions for metallurgy processes.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
