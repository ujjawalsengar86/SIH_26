import React from 'react';
import { SparklesIcon } from './icons';

export default function Header({ onLoginClick, onSignupClick }) {
    return (
        <header className="relative z-20 mb-7 flex w-full max-w-[1100px] items-center justify-between py-2">
            {/* Brand */}
            <a href="#home" className="flex items-center gap-3.5 no-underline">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-green-600 to-green-500 text-green-50 shadow-[0_0_18px_rgba(34,197,94,0.35)]">
                    <SparklesIcon />
                </div>
                <div className="flex flex-col items-start gap-0.5">
          <span className="text-[1.15rem] font-extrabold leading-[1.15] tracking-tight text-ink">
            TerraCirculate AI
          </span>
                    <div className="flex items-center gap-2">
            <span className="rounded border border-green-200 bg-green-50 px-1.5 py-px text-[0.65rem] font-bold tracking-widest text-green-700">
              WORKSPACE
            </span>
                        <span className="text-[0.65rem] text-slate-500">•</span>
                        <span className="text-[0.72rem] tracking-tight text-slate-500">
              Streamline 2.0 | Facilities - Ops - System
            </span>
                    </div>
                </div>
            </a>

            {/* Actions */}
            <div className="flex items-center gap-3.5">
                <a href="#home" className="mr-1 text-[0.85rem] font-medium text-slate-700 no-underline transition-colors hover:text-green-700">
                    Home Page
                </a>
                <button
                    type="button"
                    onClick={onLoginClick}
                    title="Switch to Login view"
                    className="rounded-full border border-green-600 bg-white px-5 py-[7px] text-[0.82rem] font-bold text-green-700 transition-all hover:bg-green-50 hover:shadow-[0_4px_14px_rgba(22,163,74,0.18)]"
                >
                    Login
                </button>
                <button
                    type="button"
                    onClick={onSignupClick}
                    title="Switch to Register view"
                    className="rounded-full border border-green-700 bg-green-700 px-5 py-[7px] text-[0.82rem] font-semibold text-white transition-all hover:border-green-800 hover:bg-green-800"
                >
                    Sign Up
                </button>
            </div>
        </header>
    );
}
