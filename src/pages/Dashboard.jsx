import React, { useEffect } from 'react';
import {
    ArrowDownRight,
    ArrowUpRight,
    Activity,
    AlertTriangle,
    ShieldAlert,
    Layers,
    TrendingUp,
    Radio,
    MapPin
} from 'lucide-react';
import { useStore } from '../store/useStore';

export const Dashboard = () => {
    const { metrics, alerts, triggerLeakSimulation, isLeakSimulated } = useStore();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.shiftKey && (e.key === 'L' || e.key === 'l')) {
                e.preventDefault();
                triggerLeakSimulation();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [triggerLeakSimulation]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold tracking-tight text-slate-100 flex items-center gap-2">
                        Operational Command Center
                        {isLeakSimulated && (
                            <span className="text-xs px-2 py-0.5 rounded bg-rose-500/20 border border-rose-500/40 text-rose-400 font-mono animate-pulse">
                                SIMULATION ACTIVE
                            </span>
                        )}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Real-time telemetry, Non-Revenue Water audit, and critical alerts feed.</p>
                </div>

                <button
                    onClick={triggerLeakSimulation}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-medium text-slate-300 flex items-center gap-2 transition-colors shadow-sm"
                >
                    <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                    <span>Trigger Leak Sim <kbd className="ml-1 text-[10px] bg-slate-900 px-1 py-0.5 rounded text-cyan-400">Shift+L</kbd></span>
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-medium uppercase tracking-wider">Total Flow In</span>
                        <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"><TrendingUp className="w-4 h-4" /></div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-slate-100 tracking-tight">{metrics.input_lps}</span>
                        <span className="text-xs font-semibold text-slate-400">Liters / sec</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400"><ArrowUpRight className="w-3.5 h-3.5" />+2.4% vs last hour</div>
                </div>

                <div className={`p-5 rounded-2xl bg-slate-900/80 border ${isLeakSimulated ? 'border-rose-500/50 bg-rose-950/10' : 'border-slate-800'}`}>
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-medium uppercase tracking-wider">Total Flow Out</span>
                        <div className={`p-2 rounded-xl border ${isLeakSimulated ? 'bg-rose-500/10 text-rose-400 border-rose-500/30' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}`}><Activity className="w-4 h-4" /></div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <span className={`text-3xl font-extrabold tracking-tight ${isLeakSimulated ? 'text-rose-400' : 'text-slate-100'}`}>{metrics.output_lps}</span>
                        <span className="text-xs font-semibold text-slate-400">Liters / sec</span>
                    </div>
                    <div className={`mt-3 flex items-center gap-1.5 text-xs ${isLeakSimulated ? 'text-rose-400 font-semibold' : 'text-emerald-400'}`}>
                        <ArrowDownRight className="w-3.5 h-3.5" />{isLeakSimulated ? '-30.0% sudden drop' : '+1.1% stable'}
                    </div>
                </div>

                <div className={`p-5 rounded-2xl bg-slate-900/80 border ${isLeakSimulated ? 'border-rose-500/60 bg-rose-950/20' : 'border-slate-800'}`}>
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-medium uppercase tracking-wider">Non-Revenue Water</span>
                        <div className={`p-2 rounded-xl border ${isLeakSimulated ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}><AlertTriangle className="w-4 h-4" /></div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <span className={`text-3xl font-extrabold tracking-tight ${isLeakSimulated ? 'text-rose-400' : 'text-amber-400'}`}>{metrics.nrw_percent}%</span>
                        <span className="text-xs font-semibold text-slate-400">Loss Ratio</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-rose-400"><ArrowUpRight className="w-3.5 h-3.5" />{isLeakSimulated ? 'CRITICAL SPIKE' : 'Within limit'}</div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between text-slate-400">
                        <span className="text-xs font-medium uppercase tracking-wider">Water Equity Score</span>
                        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"><Layers className="w-4 h-4" /></div>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <span className="text-3xl font-extrabold text-slate-100 tracking-tight">{metrics.equity_score}</span>
                        <span className="text-xs font-semibold text-slate-400">/ 100 Index</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400"><ArrowUpRight className="w-3.5 h-3.5" />Fair distribution parity</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className={`lg:col-span-2 rounded-2xl bg-slate-900/80 border p-5 flex flex-col justify-between relative overflow-hidden ${isLeakSimulated ? 'border-rose-500/50' : 'border-slate-800'}`}>
                    <div className="flex items-center justify-between mb-4 z-10">
                        <div>
                            <h3 className="text-sm font-bold text-slate-200">Ward Alpha Telemetry & Node Map</h3>
                            <p className="text-xs text-slate-400">Live GIS pressure sensors and valve status</p>
                        </div>
                    </div>

                    <div className="h-80 rounded-xl bg-slate-950 border border-slate-800 relative flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px]" />
                        <svg className="absolute inset-0 w-full h-full stroke-slate-800 fill-none" strokeWidth="2">
                            <path d="M 50 150 L 250 150 L 350 250 L 600 250" />
                            <path d="M 250 150 L 250 50 L 450 50" />
                            <path d="M 350 250 L 350 320 L 550 320" />
                        </svg>

                        {isLeakSimulated && (
                            <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
                                <span className="relative flex h-6 w-6">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-6 w-6 bg-rose-500 items-center justify-center text-white text-[10px] font-bold">!</span>
                                </span>
                                <span className="mt-1 px-2 py-0.5 rounded bg-rose-950 border border-rose-500 text-[10px] text-rose-300 font-mono">LEAK: -135 LPM</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-5 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <ShieldAlert className="w-4 h-4 text-rose-400" />
                            <h3 className="text-sm font-bold text-slate-200">Priority Alert Feed</h3>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30 font-semibold">
                            {alerts.length} Active
                        </span>
                    </div>

                    <div className="space-y-3 flex-1 overflow-y-auto max-h-[350px] pr-1">
                        {alerts.map((alert) => (
                            <div key={alert.id} className="p-3.5 rounded-xl border bg-rose-950/20 border-rose-500/40 text-rose-200">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="font-bold px-2 py-0.5 rounded bg-rose-500 text-slate-950">{alert.severity}</span>
                                    <span className="text-[10px] text-slate-400 font-mono">{alert.timestamp}</span>
                                </div>
                                <div className="mt-2 text-xs font-semibold text-slate-100 flex items-center gap-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                                    {alert.location}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
