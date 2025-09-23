// src/app/hr/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HRSettingsGeneral } from '@/components/hr/settings/HRSettingsGeneral';
import { HRSettingsNotifications } from '@/components/hr/settings/HRSettingsNotifications';
import { HRSettingsSecurity } from '@/components/hr/settings/HRSettingsSecurity';
import { HRSettingsIntegrations } from '@/components/hr/settings/HRSettingsIntegrations';

export default function HRSettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-surface-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-accent-cyan to-accent-purple rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.573 2.572a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.572 2.573a1.724 1.724 0 00-2.573 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.573-2.572a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.572-2.573A1.724 1.724 0 008.95 4.317z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-primary mb-2">Loading Settings</h2>
          <p className="text-secondary">Please wait while we load your settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-secondary mt-2">Configure your HR portal preferences</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
        {[
          { id: 'general', label: 'General', icon: '⚙️' },
          { id: 'notifications', label: 'Notifications', icon: '🔔' },
          { id: 'security', label: 'Security', icon: '🔒' },
          { id: 'integrations', label: 'Integrations', icon: '🔌' },
        ].map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-6 py-3 rounded-xl font-medium transition-all whitespace-nowrap
              ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-accent-cyan to-accent-purple text-white shadow-lg'
                  : 'bg-surface-hover text-secondary hover:bg-surface-hover/80'
              }
            `}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Settings Content */}
      <div className="glass rounded-3xl p-6 border border-default">
        {activeTab === 'general' && <HRSettingsGeneral />}
        {activeTab === 'notifications' && <HRSettingsNotifications />}
        {activeTab === 'security' && <HRSettingsSecurity />}
        {activeTab === 'integrations' && <HRSettingsIntegrations />}
      </div>
    </div>
  );
}