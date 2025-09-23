// src/components/hr/settings/HRSettingsIntegrations.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Zap, Link, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

export function HRSettingsIntegrations() {
  const [integrations, setIntegrations] = useState({
    email: {
      enabled: true,
      provider: 'smtp',
      status: 'connected',
      lastTest: '2024-05-15',
    },
    calendar: {
      enabled: true,
      provider: 'google',
      status: 'connected',
      lastSync: '2024-05-15',
    },
    slack: {
      enabled: false,
      provider: 'slack',
      status: 'disconnected',
      lastSync: null,
    },
    microsoftTeams: {
      enabled: false,
      provider: 'microsoft_teams',
      status: 'disconnected',
      lastSync: null,
    },
    payroll: {
      enabled: true,
      provider: 'quickbooks',
      status: 'connected',
      lastSync: '2024-05-14',
    },
    accounting: {
      enabled: true,
      provider: 'xero',
      status: 'connected',
      lastSync: '2024-05-14',
    },
    documentStorage: {
      enabled: true,
      provider: 'google_drive',
      status: 'connected',
      lastSync: '2024-05-15',
    },
    videoConferencing: {
      enabled: true,
      provider: 'zoom',
      status: 'connected',
      lastSync: '2024-05-15',
    },
  });

  const handleToggleIntegration = (integration: string) => {
    setIntegrations(prev => ({
      ...prev,
      [integration]: {
        ...prev[integration as keyof typeof prev],
        enabled: !prev[integration as keyof typeof prev].enabled,
      }
    }));
  };

  const handleTestIntegration = (integration: string) => {
    console.log('Test integration:', integration);
    // In a real app, you would test the integration here
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save integration settings:', integrations);
    // In a real app, you would save to API here
  };

  const getStatusColor = (status: string) => {
    return status === 'connected' ? 'text-accent-success' : 'text-status-danger';
  };

  const getStatusIcon = (status: string) => {
    return status === 'connected' ? <CheckCircle size={16} className="text-accent-success" /> : <XCircle size={16} className="text-status-danger" />;
  };

  const hasLastSync = (integration: any): integration is { lastSync: string | null } => {
  return 'lastSync' in integration;
  };

  const hasLastTest = (integration: any): integration is { lastTest: string } => {
  return 'lastTest' in integration;
 };

  return (
    
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Integrations</h2>
          <p className="text-secondary mb-6">Connect your HR portal with other services and platforms</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(integrations).map(([key, integration]) => (
            <div key={key} className="glass p-6 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-primary capitalize">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </h3>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={integration.enabled}
                    onChange={() => handleToggleIntegration(key)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-cyan/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-cyan"></div>
                </label>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-surface-hover rounded-lg">
                  <Zap size={16} className="text-secondary" />
                  <span className="text-secondary text-sm">Provider: {integration.provider}</span>
                </div>

                <div className="flex items-center gap-2 p-3 bg-surface-hover rounded-lg">
                  <Link size={16} className={getStatusColor(integration.status)} />
                  <span className="text-secondary text-sm">Status: </span>
                  <span className={getStatusColor(integration.status)}>
                    {getStatusIcon(integration.status)}
                    <span className="ml-1 capitalize">{integration.status}</span>
                  </span>
                </div>

                {hasLastSync(integration) && (
                  <div className="flex items-center gap-2 p-3 bg-surface-hover rounded-lg">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-secondary text-sm">Last Sync: {integration.lastSync}</span>
                  </div>
                )}

                {hasLastTest(integration) && (
                  <div className="flex items-center gap-2 p-3 bg-surface-hover rounded-lg">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-secondary text-sm">Last Test: {integration.lastTest}</span>
                  </div>
                )}

                <div className="pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => handleTestIntegration(key)}
                    disabled={!integration.enabled}
                    className={`
                      w-full px-4 py-2 bg-accent-cyan/20 text-accent-cyan rounded-lg font-medium text-sm
                      hover:bg-accent-cyan/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    Test Connection
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 pt-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-center gap-2">
              <Save size={18} />
              Save Changes
            </div>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            className="px-6 py-3 bg-surface-hover border border-default text-secondary font-medium rounded-xl hover:bg-surface-hover/80 transition-all"
          >
            <div className="flex items-center justify-center gap-2">
              <RefreshCw size={18} />
              Reset to Default
            </div>
          </motion.button>
        </div>
      </form>
  );
}