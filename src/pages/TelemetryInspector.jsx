import React from 'react';
import { useStore } from '../store/useStore';

export const TelemetryInspector = () => {
    const { selectedNode } = useStore();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-slate-100">Telemetry Inspector</h2>
                <p className="text-xs text-slate-400">SCADA node diagnostics and realtime oscilloscope feeds</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
                    <h3 className="text-sm font-bold text-slate-200">Active Node Profile</h3>
                    <div className="space-y-2 text-xs">
                        <div className="flex justify-between py-1 border-b border-slate-800">
                            <span className="text-slate-400">Name:</span>
                            <span className="font-semibold text-slate-200">{selectedNode.name}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800">
                            <span className="text-slate-400">Asset Tag:</span>
                            <span className="font-mono text-cyan-400">{selectedNode.assetId}</span>
                        </div>
                        <div className="flex justify-between py-1 border-b border-slate-800">
                            <span className="text-slate-400">Pressure:</span>
                            <span className="text-emerald-400 font-semibold">{selectedNode.pressure}</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between">
                    <h3 className="text-sm font-bold text-slate-200 mb-2">Oscilloscope Diagnostics Waveform</h3>
                    <div className="h-48 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                        <span className="text-xs text-slate-500 font-mono">[ Live Sensor Signal Nominal • 60Hz ]</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
