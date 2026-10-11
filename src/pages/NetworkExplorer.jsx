import React from 'react';
import { useStore } from '../store/useStore';

export const NetworkExplorer = () => {
    const {
        metrics,
        selectedNode,
        setSelectedNode,
        isInspectorOpen,
        toggleInspector,
        mapLayer,
        setMapLayer,
        showFlowOverlay,
        toggleFlowOverlay,
        isLeakSimulated
    } = useStore();

    const nodes = {
        'N-101': { id: 'N-101', name: 'Reservoir Intake 01', sector: 'Sector 01', assetId: 'AL-RES-0101', ward: 'Ward Alpha', throughput: '2.10 m/s', pressure: '72.0 PSI', chlorine: '0.85 mg/L' },
        'HUB-ALPHA': { id: 'HUB-ALPHA', name: 'Alpha Central Nexus', sector: 'Sector 04', assetId: 'AL-NEX-0091', ward: 'Ward Alpha', throughput: '1.82 m/s', pressure: '61.4 PSI', chlorine: '0.78 mg/L' },
    };

    return (
        <div className="flex flex-col w-full pb-8 space-y-6">
            <div className="bg-slate-900 rounded-xl shadow-sm p-5 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 border border-slate-800">
                <div>
                    <h1 className="text-xl font-bold text-slate-100 tracking-tight">Ward Alpha Hydraulic Network</h1>
                    <p className="text-xs text-slate-400 mt-0.5">District Hydrology • Grid 04-A GIS Vector Cartography</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-slate-800 px-4 py-1.5 rounded-lg text-xs">
                        <span className="text-slate-400">Flow:</span> <strong className="text-slate-100 ml-1">{metrics.totalFlowMLD} MLD</strong>
                    </div>
                    <div className="bg-slate-800 px-4 py-1.5 rounded-lg text-xs">
                        <span className="text-slate-400">Pressure:</span> <strong className="text-slate-100 ml-1">{metrics.meanPressurePSI} PSI</strong>
                    </div>
                </div>
            </div>

            <div className="relative w-full h-[600px] rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:40px_40px]" />

                <svg className="absolute inset-0 w-full h-full stroke-cyan-600/50 fill-none" strokeWidth="2.5">
                    <path d="M 100 120 L 350 200 L 600 280 L 950 280" />
                    <path d="M 350 200 L 350 450 L 700 480" />
                </svg>

                <div className="absolute left-[35%] top-[32%] cursor-pointer group" onClick={() => setSelectedNode(nodes['HUB-ALPHA'])}>
                    <div className="w-6 h-6 rounded-full bg-cyan-500 shadow-lg shadow-cyan-500/50 flex items-center justify-center text-slate-950 font-bold">
                        !
                    </div>
                    <div className="mt-2 bg-slate-900/90 px-2 py-1 rounded border border-slate-800 text-xs">
                        <p className="font-semibold text-slate-100">Alpha Central Nexus</p>
                    </div>
                </div>

                <div className="absolute top-4 right-4 z-10 flex items-center bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-800 p-1 gap-1">
                    <button
                        onClick={() => setMapLayer('vector')}
                        className={`px-3 py-1 rounded-lg text-xs font-medium ${mapLayer === 'vector' ? 'bg-slate-800 text-cyan-400' : 'text-slate-400'}`}
                    >
                        Vector CAD
                    </button>
                    <button
                        onClick={toggleFlowOverlay}
                        className={`px-3 py-1 rounded-lg text-xs font-medium ${showFlowOverlay ? 'text-cyan-400' : 'text-slate-500'}`}
                    >
                        Flow Vectors
                    </button>
                </div>

                <div className={`absolute top-0 right-0 w-80 h-full bg-slate-900 border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between transition-transform duration-300 z-30 ${isInspectorOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div>
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Node Inspector</span>
                            <button onClick={toggleInspector} className="text-slate-400 hover:text-slate-100">✕</button>
                        </div>
                        <h3 className="text-lg font-bold text-slate-100 mt-4">{selectedNode.name}</h3>
                        <p className="text-xs text-slate-400">{selectedNode.assetId} • {selectedNode.ward}</p>

                        <div className="mt-6 space-y-3">
                            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                                <span className="text-slate-400">Throughput</span>
                                <span className="font-semibold text-slate-100">{selectedNode.throughput}</span>
                            </div>
                            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                                <span className="text-slate-400">Pressure</span>
                                <span className="font-semibold text-slate-100">{selectedNode.pressure}</span>
                            </div>
                            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center text-xs">
                                <span className="text-slate-400">Chlorine</span>
                                <span className="font-semibold text-cyan-400">{selectedNode.chlorine}</span>
                            </div>
                        </div>
                    </div>
                    <button onClick={toggleInspector} className="w-full bg-slate-800 text-slate-300 py-2 rounded-xl text-xs">Close Drawer</button>
                </div>
            </div>
        </div>
    );
};
