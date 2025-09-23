// src/components/hr/settings/HRSettingsGeneral.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, RefreshCw, Trash2 } from 'lucide-react';

export function HRSettingsGeneral() {
  const [formData, setFormData] = useState({
    companyName: 'Platinum ERP',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12-hour',
    language: 'en',
    currency: 'USD',
    fiscalYearStart: '01',
    fiscalYearEnd: '12',
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save general settings:', formData);
    // In a real app, you would save to API here
  };

  if (!isClient) {
    return null;
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">General Settings</h2>
          <p className="text-secondary mb-6">Configure basic settings for your HR portal</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Information */}
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-primary mb-4">Company Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Company Name</label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Timezone</label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                >
                  <option value="America/New_York">America/New York (EST)</option>
                  <option value="America/Chicago">America/Chicago (CST)</option>
                  <option value="America/Denver">America/Denver (MST)</option>
                  <option value="America/Los_Angeles">America/Los Angeles (PST)</option>
                  <option value="Europe/London">Europe/London (GMT)</option>
                  <option value="Europe/Paris">Europe/Paris (CET)</option>
                  <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                  <option value="Asia/Shanghai">Asia/Shanghai (CST)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-primary mb-4">Date & Time</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Date Format</label>
                <select
                  value={formData.dateFormat}
                  onChange={(e) => setFormData({ ...formData, dateFormat: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Time Format</label>
                <select
                  value={formData.timeFormat}
                  onChange={(e) => setFormData({ ...formData, timeFormat: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                >
                  <option value="12-hour">12-hour (AM/PM)</option>
                  <option value="24-hour">24-hour</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Language</label>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="zh">Chinese</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Currency</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                  <option value="CNY">CNY (¥)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fiscal Year */}
          <div className="glass p-6 rounded-2xl md:col-span-2">
            <h3 className="text-lg font-bold text-primary mb-4">Fiscal Year</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Fiscal Year Start</label>
                <select
                  value={formData.fiscalYearStart}
                  onChange={(e) => setFormData({ ...formData, fiscalYearStart: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                >
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Fiscal Year End</label>
                <select
                  value={formData.fiscalYearEnd}
                  onChange={(e) => setFormData({ ...formData, fiscalYearEnd: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                >
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
            </div>
          </div>
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