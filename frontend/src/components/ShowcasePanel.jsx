import React from 'react';
import { SparklesIcon, LayersIcon, CommandIcon, ArrowRightIcon } from './icons';

export default function ShowcasePanel({ isLogin, onToggle }) {
    return (
        <aside
            className={`relative z-[2] flex min-h-[640px] w-1/2 flex-col justify-between overflow-hidden
        bg-[radial-gradient(circle_at_85%_15%,rgba(74,222,128,0.28),transparent_25%),linear-gradient(155deg,#087a39_0%,#079447_52%,#056b32_100%)]
        px-10 py-11 transition-transform duration-[750ms] ease-auth-slide will-change-transform
        max-[980px]:relative max-[980px]:w-full max-[980px]:min-h-0 max-[980px]:translate-x-0 max-[980px]:px-6 max-[980px]:py-8
        max-[980px]:border-b max-[980px]:border-white/20
        ${isLogin ? 'translate-x-full border-l border-white/20' : 'translate-x-0 border-r border-white/20'}`}
        >
            {/* Ambient glows */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.28)_0%,rgba(139,92,246,0.15)_50%,transparent_75%)] blur-[40px]" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,rgba(0,242,254,0.25)_0%,rgba(59,130,246,0.08)_50%,transparent_75%)] blur-[40px]" />

            {/* Header */}
            <div className="relative z-[2] mb-5 text-left">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] bg-gradient-to-br from-green-500 to-green-700 text-white shadow-[0_0_24px_rgba(0,242,254,0.5)]">
                    <SparklesIcon />
                </div>

                {isLogin ? (
                    <>
                        <h2 className="mb-3 text-[1.85rem] font-extrabold leading-[1.25] tracking-tight text-white">
                            New to <br />
                            <span className="text-green-300">TerraCirculate AI?</span>
                        </h2>
                        <p className="max-w-[420px] text-[0.85rem] leading-relaxed text-green-100/90">
                            Join enterprise telemetry teams deploying real-time multi-agent facilities and operational optimization models.
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="mb-3 text-[1.85rem] font-extrabold leading-[1.25] tracking-tight text-white">
                            Already have an <br />
                            <span className="text-green-300">Industrial Account?</span>
                        </h2>
                        <p className="max-w-[420px] text-[0.85rem] leading-relaxed text-green-100/90">
                            Sign in to access real-time data and insights.
                        </p>
                    </>
                )}
            </div>

            {/* Feature highlights */}
            <div className="relative z-[2] mb-6 flex flex-col gap-3">
                <div className="flex items-center gap-3.5 rounded-2xl border border-white/20 bg-white/[0.08] px-4 py-3 backdrop-blur-[10px] transition-all hover:-translate-y-0.5 hover:border-green-300/55 hover:bg-white/[0.14]">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] border border-cyan-300/30 bg-cyan-300/15 text-green-700">
                        <LayersIcon />
                    </div>
                    <div className="text-left">
                        <h4 className="mb-0.5 text-[0.86rem] font-bold text-white">Real-Time Scope 1, 2 &amp; 3</h4>
                        <p className="text-[0.74rem] leading-snug text-green-100">Instantly sync &amp; track data across operations.</p>
                    </div>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl border border-white/20 bg-white/[0.08] px-4 py-3 backdrop-blur-[10px] transition-all hover:-translate-y-0.5 hover:border-green-300/55 hover:bg-white/[0.14]">
                    <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[10px] border border-green-400/28 bg-green-500/12 text-green-400">
                        <CommandIcon />
                    </div>
                    <div className="text-left">
                        <h4 className="mb-0.5 text-[0.86rem] font-bold text-white">Stay Visualization Performance</h4>
                        <p className="text-[0.74rem] leading-snug text-green-100">High-value insights you can act on instantly.</p>
                    </div>
                </div>
            </div>

            {/* Toggle */}
            <div className="relative z-[2] flex flex-col items-center gap-2.5 rounded-2xl border border-white/20 bg-white/[0.06] px-[18px] py-3.5 text-center">
        <span className="text-[0.78rem] font-medium text-green-100">
          {isLogin ? 'Need a new industrial account?' : 'Already registered with us?'}
        </span>
                <button
                    type="button"
                    onClick={onToggle}
                    className="flex w-full items-center justify-center gap-2 rounded-[10px] border border-green-400 bg-white/[0.08] px-5 py-2.5 text-[0.84rem] font-bold text-white transition-all hover:-translate-y-0.5 hover:border-green-300 hover:bg-white/[0.16]"
                >
                    <span>{isLogin ? 'Slide for Register' : 'Slide for Login'}</span>
                    <ArrowRightIcon />
                </button>
            </div>
        </aside>
    );
}
