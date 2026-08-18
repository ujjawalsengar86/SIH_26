import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { SparklesIcon, LayersIcon, CommandIcon, CheckCircleIcon } from '../components/icons';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [selectedTab, setSelectedTab] = useState('overview');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const userDisplayName = user?.name || user?.email?.split('@')[0] || 'Operator';
    const userEmail = user?.email || 'authenticated.user@lca.corp';

    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-start overflow-x-hidden px-7 pb-12 pt-6 bg-[radial-gradient(circle_at_10%_30%,rgba(34,197,94,0.12),transparent_30%),radial-gradient(circle_at_90%_70%,rgba(22,163,74,0.10),transparent_30%),linear-gradient(135deg,#f4fbf6_0%,#ffffff_52%,#eaf8ef_100%)]">
            {/* Ambient dynamic glowing orbs */}
            <div className="pointer-events-none absolute left-[20%] top-[15%] z-0 h-[550px] w-[550px] animate-pulse-orb rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.16)_0%,rgba(22,163,74,0.08)_40%,transparent_70%)] blur-[80px]" />
            <div className="pointer-events-none absolute bottom-[10%] right-[18%] z-0 h-[480px] w-[480px] animate-pulse-orb-reverse rounded-full bg-[radial-gradient(circle,rgba(34,197,94,0.12)_0%,rgba(22,163,74,0.06)_45%,transparent_70%)] blur-[90px]" />

            <Header />

            <main className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col gap-6">
                {/* Main Welcome Banner */}
                <div className="flex w-full flex-col justify-between gap-4 rounded-3xl border border-green-700/20 bg-white p-7 shadow-[0_20px_60px_rgba(22,101,52,0.12)] md:flex-row md:items-center">
                    <div className="text-left">
                        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-3 py-1 text-xs font-bold tracking-wider text-green-700">
                            <span className="h-2 w-2 rounded-full bg-green-500 animate-ping" />
                            <span>AUTHENTICATED SESSION ACTIVE</span>
                        </div>
                        <h1 id="dashboard-main-heading" className="text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
                            Welcome to Dashboard
                        </h1>
                        <h2 className="mt-1 text-lg font-semibold text-green-700">
                            Welcome to your LCA Dashboard
                        </h2>
                        <p className="mt-1 text-sm text-slate-600">
                            Logged in as <span className="font-semibold text-ink">{userDisplayName}</span> ({userEmail})
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleLogout}
                            id="dashboard-logout-btn"
                            className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-red-400 hover:bg-red-50 hover:text-red-700 active:translate-y-0"
                        >
                            <span>Logout</span>
                        </button>
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex gap-2 border-b border-green-200 pb-2">
                    <button
                        type="button"
                        onClick={() => setSelectedTab('overview')}
                        className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                            selectedTab === 'overview'
                                ? 'bg-green-700 text-white shadow-md'
                                : 'bg-white/70 text-slate-600 hover:bg-green-50 hover:text-green-800'
                        }`}
                    >
                        Assessment Overview
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedTab('metallurgy')}
                        className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                            selectedTab === 'metallurgy'
                                ? 'bg-green-700 text-white shadow-md'
                                : 'bg-white/70 text-slate-600 hover:bg-green-50 hover:text-green-800'
                        }`}
                    >
                        Metallurgy &amp; Mining Loops
                    </button>
                    <button
                        type="button"
                        onClick={() => setSelectedTab('security')}
                        className={`rounded-xl px-4 py-2 text-sm font-bold transition-all ${
                            selectedTab === 'security'
                                ? 'bg-green-700 text-white shadow-md'
                                : 'bg-white/70 text-slate-600 hover:bg-green-50 hover:text-green-800'
                        }`}
                    >
                        JWT Auth Telemetry
                    </button>
                </div>

                {/* Tab Content: Overview */}
                {selectedTab === 'overview' && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        <div className="rounded-2xl border border-green-700/15 bg-white p-6 text-left shadow-sm">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
                                <LayersIcon />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Scope 1 &amp; 2 Direct</span>
                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-2xl font-black text-ink">1,420.8</span>
                                <span className="text-xs font-semibold text-slate-500">tCO₂e / month</span>
                            </div>
                            <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-green-700">
                                <CheckCircleIcon />
                                <span>-14.2% optimized this quarter</span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-green-700/15 bg-white p-6 text-left shadow-sm">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
                                <CommandIcon />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Material Circularity Rate</span>
                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-2xl font-black text-ink">78.4%</span>
                                <span className="text-xs font-semibold text-slate-500">closed-loop scrap</span>
                            </div>
                            <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-green-700">
                                <CheckCircleIcon />
                                <span>+6.8% recycled scrap input</span>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-green-700/15 bg-white p-6 text-left shadow-sm">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-green-600 text-white">
                                <SparklesIcon />
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">AI LCA Prediction</span>
                            <div className="mt-1 flex items-baseline gap-2">
                                <span className="text-2xl font-black text-green-700">Optimized</span>
                                <span className="text-xs font-semibold text-slate-500">Tier 1 Compliance</span>
                            </div>
                            <div className="mt-3 flex items-center gap-1.5 text-xs font-medium text-green-700">
                                <CheckCircleIcon />
                                <span>ISO 14040 / 14044 verified</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Content: Metallurgy & Mining Loops */}
                {selectedTab === 'metallurgy' && (
                    <div className="rounded-2xl border border-green-700/15 bg-white p-6 text-left shadow-sm">
                        <h3 className="text-lg font-bold text-ink">Metallurgy &amp; Mining Process LCA Lifecycle</h3>
                        <p className="mt-1 text-xs text-slate-500">
                            Real-time LCA monitoring stages connected to your Spring Boot operational telemetry.
                        </p>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 font-bold text-green-800">1</div>
                                    <div>
                                        <div className="text-sm font-bold text-ink">Ore Extraction &amp; Beneficiation</div>
                                        <div className="text-xs text-slate-500">Flotation yield: 92.4% • Energy: 18.2 kWh/t</div>
                                    </div>
                                </div>
                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Active</span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 font-bold text-green-800">2</div>
                                    <div>
                                        <div className="text-sm font-bold text-ink">Smelting &amp; Pyrometallurgical Refining</div>
                                        <div className="text-xs text-slate-500">Furnace thermal recuperation: 84% • Off-gas capture: 99.1%</div>
                                    </div>
                                </div>
                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Active</span>
                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 font-bold text-green-800">3</div>
                                    <div>
                                        <div className="text-sm font-bold text-ink">Hydrometallurgical Recovery &amp; Scrap Recirculation</div>
                                        <div className="text-xs text-slate-500">Solvent extraction recovery: 96.7% • Secondary scrap input: 32%</div>
                                    </div>
                                </div>
                                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">Active</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab Content: Security & Auth Telemetry */}
                {selectedTab === 'security' && (
                    <div className="rounded-2xl border border-green-700/15 bg-white p-6 text-left shadow-sm">
                        <h3 className="text-lg font-bold text-ink">Spring Boot Backend Authentication Status</h3>
                        <p className="mt-1 text-xs text-slate-500">
                            Verified connection state with your Spring Boot Security filter &amp; JWT service.
                        </p>

                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <div className="text-xs font-bold uppercase text-slate-500">Auth Token Mechanism</div>
                                <div className="mt-1 text-sm font-semibold text-ink">Stateless HMAC-SHA JWT (Bearer)</div>
                                <div className="mt-1 text-xs text-slate-500">Header: <code className="rounded bg-slate-200 px-1 py-0.5 font-mono">Authorization: Bearer &lt;token&gt;</code></div>
                            </div>

                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <div className="text-xs font-bold uppercase text-slate-500">Backend API Endpoints</div>
                                <div className="mt-1 text-xs font-mono text-slate-700">
                                    <div>POST /api/auth/login</div>
                                    <div>POST /api/auth/register</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
