import { create } from 'zustand';

export const useStore = create((set, get) => ({
    metrics: {
        input_lps: 450,
        output_lps: 410,
        nrw_percent: 8.8,
        equity_score: 76,
        totalFlowMLD: 42.8,
        meanPressurePSI: 61.4,
        healthPercent: 98.8,
    },
    alerts: [
        {
            id: 'a1',
            location: 'Sector 4 Node',
            severity: 'HIGH',
            loss_lpm: 45,
            equity_impact: 32,
            timestamp: '14:22 UTC'
        }
    ],
    selectedNode: {
        id: 'HUB-ALPHA',
        name: 'Alpha Central Nexus',
        sector: 'Sector 04',
        assetId: 'AL-NEX-0091',
        ward: 'Ward Alpha',
        throughput: '1.82 m/s',
        pressure: '61.4 PSI',
        chlorine: '0.78 mg/L',
        timestamp: 'Just now (12:04:19 UTC)'
    },
    isInspectorOpen: false,
    mapLayer: 'vector',
    showFlowOverlay: true,
    serverStatus: 'ONLINE',
    isLeakSimulated: false,
    toastMessage: null,

    setSelectedNode: (nodeData) => set({ selectedNode: nodeData, isInspectorOpen: Boolean(nodeData) }),
    toggleInspector: () => set((state) => ({ isInspectorOpen: !state.isInspectorOpen })),
    setMapLayer: (layer) => set({ mapLayer: layer }),
    toggleFlowOverlay: () => set((state) => ({ showFlowOverlay: !state.showFlowOverlay })),
    setToastMessage: (message) => set({ toastMessage: message }),
    clearToastMessage: () => set({ toastMessage: null }),

    fetchDashboardData: async () => {
        try {
            const { fetchMetricsAPI, fetchAlertsAPI } = await import('../services/api');
            const [metrics, alerts] = await Promise.all([
                fetchMetricsAPI(),
                fetchAlertsAPI(),
            ]);
            set({
                metrics: { ...get().metrics, ...metrics },
                alerts: alerts || get().alerts,
                serverStatus: 'ONLINE',
            });
        } catch {
            set({ serverStatus: 'OFFLINE' });
        }
    },

    triggerLeakSimulation: () => {
        const current = get().metrics;
        const criticalAlert = {
            id: `alert-${Date.now()}`,
            location: 'Trunk Line Alpha - Zone 3 (Sector 7)',
            severity: 'CRITICAL',
            loss_lpm: 135,
            equity_impact: 64,
            timestamp: 'Just now'
        };

        set({
            metrics: {
                ...current,
                output_lps: Math.round(current.output_lps * 0.7),
                nrw_percent: 35.0,
                healthPercent: 64.2,
            },
            alerts: [criticalAlert, ...get().alerts],
            isLeakSimulated: true,
            toastMessage: 'CRITICAL EVENT: Trunk Line Pressure Drop Detected. NRW Spiked to 35%.'
        });

        setTimeout(() => set({ toastMessage: null }), 6000);
    },

    resetLeakSimulation: () => {
        set({
            metrics: {
                input_lps: 450,
                output_lps: 410,
                nrw_percent: 8.8,
                equity_score: 76,
                totalFlowMLD: 42.8,
                meanPressurePSI: 61.4,
                healthPercent: 98.8,
            },
            alerts: get().alerts.filter((a) => !a.id.startsWith('alert-')),
            isLeakSimulated: false,
            toastMessage: 'Simulation Reset: Standard flow nominal.'
        });
        setTimeout(() => set({ toastMessage: null }), 4000);
    }
}));
