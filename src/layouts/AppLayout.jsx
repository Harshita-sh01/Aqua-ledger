import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Network,
    Activity,
    Settings,
    Droplets,
    Bell,
    ChevronDown,
    ShieldAlert
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const AppLayout = () => {
    const { serverStatus, isLeakSimulated, toastMessage } = useStore();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-slate-950">

            {/* Toast Notification Banner */}
            {toastMessage && (
                <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-rose-950/90 border border-rose-500/50 text-rose-200 px-4 py-3 rounded-xl shadow-2xl backdrop-blur-md animate-bounce">
                    <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0" />
                    <span className="text-sm font-medium">{toastMessage}</span>
                </div>
            )}

            {/* Top Header */}
            <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md fixed top-0 left-0 right-0 z-40 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
                            <Droplets className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="font-bold tracking-tight text-slate-100 text-base leading-tight">AquaLedger</h1>
                            <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-semibold">B2G Municipal SaaS</span>
                        </div>
                    </div>

                    <div className="h-6 w-px bg-slate-800 mx-2 hidden sm:block" />

                    <div className="hidden sm:flex items-center gap-2 text-xs bg-slate-800/60 border border-slate-700/50 px-3 py-1.5 rounded-lg text-slate-300">
                        <span className="text-slate-400">Active Ward:</span>
                        <span className="font-semibold text-slate-100">Ward Alpha (Sector 1–8)</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden md:flex items-center gap-2 text-xs bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-lg">
                        <span className={`w-2 h-2 rounded-full animate-pulse ${isLeakSimulated ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                        <span className="text-slate-300 font-medium">Node Telemetry: <strong className="text-slate-100">{serverStatus}</strong></span>
                    </div>

                    <button className="relative p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 text-slate-300 hover:bg-slate-700/50 transition-colors">
                        <Bell className="w-4 h-4" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
                    </button>

                    <div className="flex items-center gap-3 pl-3 border-l border-slate-800">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-cyan-400 text-xs">
                            OP
                        </div>
                        <div className="hidden lg:block text-left">
                            <div className="text-xs font-semibold text-slate-200">Cmdr. V. Vance</div>
                            <div className="text-[10px] text-slate-400">Chief Water Engineer</div>
                        </div>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                </div>
            </header>

            {/* Main App Body */}
            <div className="flex pt-16 flex-1">
                <aside className="w-64 border-r border-slate-800 bg-slate-900/60 fixed left-0 bottom-0 top-16 hidden md:flex flex-col justify-between p-4 z-30">
                    <nav className="space-y-1.5">
                        <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 pb-2">Operational Grid</div>

                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
                        >
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink
                            to="/network-explorer"
                            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
                        >
                            <Network className="w-4 h-4" />
                            <span>Network Explorer</span>
                        </NavLink>

                        <NavLink
                            to="/telemetry-inspector"
                            className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
                        >
                            <Activity className="w-4 h-4" />
                            <span>Telemetry Inspector</span>
                        </NavLink>

                        <div className="pt-6">
                            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-500 px-3 pb-2">System</div>
                            <NavLink
                                to="/settings"
                                className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'}`}
                            >
                                <Settings className="w-4 h-4" />
                                <span>Settings</span>
                            </NavLink>
                        </div>
                    </nav>

                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="flex items-center gap-1.5 font-medium text-slate-300">
                                <Activity className="w-3.5 h-3.5 text-cyan-400" /> Demo Hotkey
                            </span>
                            <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-[10px] text-cyan-300 font-mono">Shift + L</kbd>
                        </div>
                        <p className="text-[11px] text-slate-500">Press on dashboard to simulate major leak.</p>
                    </div>
                </aside>

                <main className="flex-1 md:ml-64 bg-slate-950 min-h-[calc(100vh-4rem)] p-6 lg:p-8 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
