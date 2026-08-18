import React from 'react';
import Header from '../components/Header';

export default function Dashboard() {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden px-7 pb-12 pt-6 bg-[radial-gradient(circle_at_10%_30%,rgba(34,197,94,0.12),transparent_30%),radial-gradient(circle_at_90%_70%,rgba(22,163,74,0.10),transparent_30%),linear-gradient(135deg,#f4fbf6_0%,#ffffff_52%,#eaf8ef_100%)]">

            {/* Same background glowing orbs */}
            <div className="pointer-events-none absolute left-[20%] top-[15%] z-0 h-[550px] w-[550px] animate-pulse-orb rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.16)_0%,rgba(22,163,74,0.08)_40%,transparent_70%)] blur-[80px]" />

            <div className="pointer-events-none absolute bottom-[10%] right-[18%] z-0 h-[480px] w-[480px] animate-pulse-orb-reverse rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12)_0%,rgba(22,163,74,0.06)_45%,transparent_70%)] blur-[90px]" />

            {/* Keep Header */}
            <Header />

            {/* Center Welcome Message */}
            <main className="relative z-10 flex flex-1 w-full items-center justify-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
                    Welcome to Dashboard
                </h1>
            </main>

        </div>
    );
}
