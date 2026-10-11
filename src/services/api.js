const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';

export const fetchMetricsAPI = async () => {
    try {
        const response = await fetch(`${BASE_URL}/telemetry/metrics`);
        if (!response.ok) throw new Error('Network response failed');
        return await response.json();
    } catch (err) {
        return {
            input_lps: 450,
            output_lps: 410,
            nrw_percent: 8.8,
            equity_score: 76
        };
    }
};

export const fetchAlertsAPI = async () => {
    try {
        const response = await fetch(`${BASE_URL}/alerts/active`);
        if (!response.ok) throw new Error('Network response failed');
        return await response.json();
    } catch (err) {
        return [
            { id: 'a1', location: 'Sector 4 Node', severity: 'HIGH', loss_lpm: 45, equity_impact: 32, timestamp: '14:22 UTC' }
        ];
    }
};
