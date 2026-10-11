import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { Dashboard } from './pages/Dashboard';
import { NetworkExplorer } from './pages/NetworkExplorer';
import { TelemetryInspector } from './pages/TelemetryInspector';
import { useStore } from './store/useStore';

const PlaceholderSettings = () => (
    <div className="p-8 bg-slate-900 border border-slate-800 rounded-2xl text-center">
        <h3 className="text-lg font-bold text-slate-200">System Settings Module</h3>
        <p className="text-xs text-slate-400 mt-1">Configure thresholds, API webhooks, and SCADA endpoints.</p>
    </div>
);

export function App() {
    const { fetchDashboardData } = useStore();

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AppLayout />}>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/network-explorer" element={<NetworkExplorer />} />
                    <Route path="/telemetry-inspector" element={<TelemetryInspector />} />
                    <Route path="/settings" element={<PlaceholderSettings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
