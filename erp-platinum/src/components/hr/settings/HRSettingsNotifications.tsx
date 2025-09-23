// src/components/hr/settings/HRSettingsNotifications.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Bell, Mail, Smartphone } from 'lucide-react';
import { RefreshCw } from 'lucide-react';


export function HRSettingsNotifications() {
  const [formData, setFormData] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    notificationFrequency: 'immediate',
    businessHoursOnly: false,
    staffBirthdayReminders: true,
    leaveApprovalReminders: true,
    performanceReviewReminders: true,
    onboardingTaskReminders: true,
    payrollReminders: false,
    systemUpdateNotifications: true,
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save notification settings:', formData);
    // In a real app, you would save to API here
  };

  if (!isClient) {
    return null;
  }

  return (
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Notification Settings</h2>
          <p className="text-secondary mb-6">Configure how and when you receive notifications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Notification Channels */}
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-primary mb-4">Notification Channels</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-surface-hover rounded-xl">
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-accent-cyan" />
                  <div>
                    <div className="font-medium text-primary">Email Notifications</div>
                    <div className="text-sm text-secondary">Receive notifications via email</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.emailNotifications}
                    onChange={(e) => setFormData({ ...formData, emailNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-cyan/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-cyan"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface-hover rounded-xl">
                <div className="flex items-center gap-3">
                  <Smartphone size={20} className="text-accent-purple" />
                  <div>
                    <div className="font-medium text-primary">Push Notifications</div>
                    <div className="text-sm text-secondary">Receive notifications in browser/app</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.pushNotifications}
                    onChange={(e) => setFormData({ ...formData, pushNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-purple/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-purple"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface-hover rounded-xl">
                <div className="flex items-center gap-3">
                  <Smartphone size={20} className="text-accent-pink" />
                  <div>
                    <div className="font-medium text-primary">SMS Notifications</div>
                    <div className="text-sm text-secondary">Receive notifications via text message</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.smsNotifications}
                    onChange={(e) => setFormData({ ...formData, smsNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-pink/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-pink"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-primary mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Notification Frequency</label>
                <select
                  value={formData.notificationFrequency}
                  onChange={(e) => setFormData({ ...formData, notificationFrequency: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                >
                  <option value="immediate">Immediate</option>
                  <option value="daily_digest">Daily Digest</option>
                  <option value="weekly_digest">Weekly Digest</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface-hover rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell size={20} className="text-status-warning" />
                  <div>
                    <div className="font-medium text-primary">Business Hours Only</div>
                    <div className="text-sm text-secondary">Only receive notifications during business hours (9AM-5PM)</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.businessHoursOnly}
                    onChange={(e) => setFormData({ ...formData, businessHoursOnly: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-status-warning/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-status-warning"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Types */}
          <div className="glass p-6 rounded-2xl lg:col-span-2">
            <h3 className="text-lg font-bold text-primary mb-4">Notification Types</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { key: 'staffBirthdayReminders', label: 'Staff Birthday Reminders', icon: '🎂' },
                { key: 'leaveApprovalReminders', label: 'Leave Approval Reminders', icon: '🌴' },
                { key: 'performanceReviewReminders', label: 'Performance Review Reminders', icon: '⭐' },
                { key: 'onboardingTaskReminders', label: 'Onboarding Task Reminders', icon: '🎓' },
                { key: 'payrollReminders', label: 'Payroll Reminders', icon: '💰' },
                { key: 'systemUpdateNotifications', label: 'System Update Notifications', icon: '🔄' },
              ].map((notification) => (
                <div key={notification.key} className="flex items-center justify-between p-4 bg-surface-hover rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{notification.icon}</span>
                    <div>
                      <div className="font-medium text-primary">{notification.label}</div>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData[notification.key as keyof typeof formData] as boolean}
                      onChange={(e) => setFormData({ ...formData, [notification.key]: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-cyan/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-cyan"></div>
                  </label>
                </div>
              ))}
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