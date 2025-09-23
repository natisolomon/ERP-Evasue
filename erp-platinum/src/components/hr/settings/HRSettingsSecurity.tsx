// src/components/hr/settings/HRSettingsSecurity.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Lock, Key, Shield, AlertTriangle, RefreshCw } from 'lucide-react';

export function HRSettingsSecurity() {
  const [formData, setFormData] = useState({
    passwordRequirements: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
    },
    sessionTimeout: 30, // minutes
    twoFactorAuth: true,
    failedLoginAttempts: 5,
    passwordExpiration: 90, // days
    inactiveAccountLock: 180, // days
    auditLogRetention: 365, // days
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Save security settings:', formData);
    // In a real app, you would save to API here
  };

  return (
    
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-6">Security Settings</h2>
          <p className="text-secondary mb-6">Configure security policies for your HR portal</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Password Requirements */}
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-primary mb-4">Password Requirements</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Minimum Length</label>
                <input
                  type="number"
                  min="6"
                  max="32"
                  value={formData.passwordRequirements.minLength}
                  onChange={(e) => setFormData({
                    ...formData,
                    passwordRequirements: {
                      ...formData.passwordRequirements,
                      minLength: parseInt(e.target.value) || 8
                    }
                  })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock size={16} className="text-accent-cyan" />
                    <span className="text-primary">Require Uppercase Letters</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.passwordRequirements.requireUppercase}
                      onChange={(e) => setFormData({
                        ...formData,
                        passwordRequirements: {
                          ...formData.passwordRequirements,
                          requireUppercase: e.target.checked
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-cyan/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-cyan"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock size={16} className="text-accent-purple" />
                    <span className="text-primary">Require Lowercase Letters</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.passwordRequirements.requireLowercase}
                      onChange={(e) => setFormData({
                        ...formData,
                        passwordRequirements: {
                          ...formData.passwordRequirements,
                          requireLowercase: e.target.checked
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-purple/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-purple"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock size={16} className="text-accent-pink" />
                    <span className="text-primary">Require Numbers</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.passwordRequirements.requireNumbers}
                      onChange={(e) => setFormData({
                        ...formData,
                        passwordRequirements: {
                          ...formData.passwordRequirements,
                          requireNumbers: e.target.checked
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-pink/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-accent-pink"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-surface-hover rounded-lg">
                  <div className="flex items-center gap-3">
                    <Lock size={16} className="text-status-warning" />
                    <span className="text-primary">Require Special Characters</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.passwordRequirements.requireSpecialChars}
                      onChange={(e) => setFormData({
                        ...formData,
                        passwordRequirements: {
                          ...formData.passwordRequirements,
                          requireSpecialChars: e.target.checked
                        }
                      })}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-status-warning/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-status-warning"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Session & Authentication */}
          <div className="glass p-6 rounded-2xl">
            <h3 className="text-lg font-bold text-primary mb-4">Session & Authentication</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Session Timeout (minutes)</label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={formData.sessionTimeout}
                  onChange={(e) => setFormData({ ...formData, sessionTimeout: parseInt(e.target.value) || 30 })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
                <p className="text-secondary text-xs mt-1">Users will be automatically logged out after this time of inactivity</p>
              </div>

              <div className="flex items-center justify-between p-4 bg-surface-hover rounded-xl">
                <div className="flex items-center gap-3">
                  <Key size={20} className="text-accent-purple" />
                  <div>
                    <div className="font-medium text-primary">Two-Factor Authentication</div>
                    <div className="text-sm text-secondary">Require 2FA for all users</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.twoFactorAuth}
                    onChange={(e) => setFormData({ ...formData, twoFactorAuth: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-purple/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-purple"></div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Failed Login Attempts</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.failedLoginAttempts}
                  onChange={(e) => setFormData({ ...formData, failedLoginAttempts: parseInt(e.target.value) || 5 })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
                <p className="text-secondary text-xs mt-1">Account will be locked after this many failed attempts</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Password Expiration (days)</label>
                <input
                  type="number"
                  min="30"
                  max="365"
                  value={formData.passwordExpiration}
                  onChange={(e) => setFormData({ ...formData, passwordExpiration: parseInt(e.target.value) || 90 })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
                <p className="text-secondary text-xs mt-1">Users must change their password after this many days</p>
              </div>
            </div>
          </div>

          {/* Account Management */}
          <div className="glass p-6 rounded-2xl lg:col-span-2">
            <h3 className="text-lg font-bold text-primary mb-4">Account Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Inactive Account Lock (days)</label>
                <input
                  type="number"
                  min="30"
                  max="730"
                  value={formData.inactiveAccountLock}
                  onChange={(e) => setFormData({ ...formData, inactiveAccountLock: parseInt(e.target.value) || 180 })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
                <p className="text-secondary text-xs mt-1">Accounts will be locked after this many days of inactivity</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-secondary">Audit Log Retention (days)</label>
                <input
                  type="number"
                  min="30"
                  max="1095"
                  value={formData.auditLogRetention}
                  onChange={(e) => setFormData({ ...formData, auditLogRetention: parseInt(e.target.value) || 365 })}
                  className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                  required
                />
                <p className="text-secondary text-xs mt-1">Audit logs will be retained for this many days</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-status-warning/10 border border-status-warning/30 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="text-status-warning" />
                <div>
                  <h4 className="font-medium text-status-warning">Security Warning</h4>
                  <p className="text-sm text-secondary mt-1">
                    Changing these settings may affect all users. Please test changes in a staging environment before applying to production.
                  </p>
                </div>
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