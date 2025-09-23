// src/components/hr/onboarding/HROnboardingModal/StartOnboardingModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GraduationCap, User, CheckSquare, FileText } from 'lucide-react';
import { mockStaff } from '@/lib/hrUserData';

interface StartOnboardingModalProps {
  onClose: () => void;
  onStart: (onboarding: any) => void;
}

export function StartOnboardingModal({ onClose, onStart }: StartOnboardingModalProps) {
  const [formData, setFormData] = useState({
    staffId: '',
    startDate: new Date().toISOString().split('T')[0],
    notes: '',
  });

  const [tasks, setTasks] = useState([
    { name: 'Complete HR paperwork', completed: false, dueDate: new Date().toISOString().split('T')[0], assignedTo: 'HR Department' },
    { name: 'Set up workstation', completed: false, dueDate: new Date().toISOString().split('T')[0], assignedTo: 'IT Department' },
    { name: 'Attend orientation', completed: false, dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], assignedTo: 'HR Department' },
    { name: 'Meet with manager', completed: false, dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], assignedTo: '' },
  ]);

  const [documents, setDocuments] = useState(['Offer Letter', 'Employee Handbook', 'Tax Forms']);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const handleAddTask = () => {
    setTasks([...tasks, { name: '', completed: false, dueDate: new Date().toISOString().split('T')[0], assignedTo: '' }]);
  };

  const handleRemoveTask = (index: number) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  const handleTaskChange = (index: number, field: string, value: any) => {
    const newTasks = [...tasks];
    newTasks[index] = { ...newTasks[index], [field]: value };
    setTasks(newTasks);
  };

  const handleAddDocument = () => {
    setDocuments([...documents, '']);
  };

  const handleRemoveDocument = (index: number) => {
    if (documents.length > 1) {
      setDocuments(documents.filter((_, i) => i !== index));
    }
  };

  const handleDocumentChange = (index: number, value: string) => {
    const newDocuments = [...documents];
    newDocuments[index] = value;
    setDocuments(newDocuments);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.staffId || !formData.startDate) {
      alert('Please fill in all required fields');
      return;
    }

    const selectedStaff = mockStaff.find(s => s.id === formData.staffId);
    if (!selectedStaff) {
      alert('Please select a staff member');
      return;
    }

    const newOnboarding = {
      id: Date.now().toString(),
      staffId: formData.staffId,
      staffName: `${selectedStaff.firstName} ${selectedStaff.lastName}`,
      status: 'pending',
      startDate: formData.startDate,
      tasks: tasks,
      documents: documents.filter(doc => doc.trim() !== ''),
      notes: formData.notes,
    };

    onStart(newOnboarding);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.92, y: 20 }}
          className="bg-surface-card rounded-3xl p-6 md:p-8 w-full max-w-4xl lg:max-w-5xl shadow-2xl border border-white/10 relative max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-secondary z-10"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-accent-cyan to-accent-purple rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-accent-cyan to-accent-purple bg-clip-text text-transparent">
              Start New Onboarding
            </h2>
            <p className="text-secondary mt-2">Fill in the details to start onboarding a new staff member</p>
          </div>

            <div className="flex-1 overflow-y-auto pr-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Staff Selection */}
                <div className="glass p-6 rounded-2xl mb-6">
                  <h3 className="text-lg font-bold text-primary mb-4">Staff Information</h3>
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2 text-secondary">Staff Member *</label>
                    <select
                      value={formData.staffId}
                      onChange={(e) => setFormData({ ...formData, staffId: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      required
                    >
                      <option value="">Select Staff Member</option>
                      {mockStaff.map(staff => (
                        <option key={staff.id} value={staff.id}>
                          {staff.firstName} {staff.lastName} - {staff.position}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-secondary">Start Date *</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Onboarding Tasks */}
                <div className="glass p-6 rounded-2xl mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-primary">Onboarding Tasks</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={handleAddTask}
                      className="px-3 py-1 bg-accent-cyan/20 text-accent-cyan rounded-lg font-medium text-sm hover:bg-accent-cyan/30 transition-all"
                    >
                      + Add Task
                    </motion.button>
                  </div>
                  
                  <div className="space-y-4">
                    {tasks.map((task, index) => (
                      <div key={index} className="grid grid-cols-12 gap-4 items-end p-4 bg-surface-hover rounded-xl">
                        <div className="col-span-5">
                          <label className="block text-sm font-medium mb-2 text-secondary">Task Name *</label>
                          <input
                            type="text"
                            value={task.name}
                            onChange={(e) => handleTaskChange(index, 'name', e.target.value)}
                            placeholder="e.g. Complete HR paperwork"
                            className="w-full px-3 py-2 bg-surface-card border border-default rounded-lg text-primary focus:outline-none focus:ring-1 focus:ring-accent-cyan/30 transition-all"
                            required
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium mb-2 text-secondary">Due Date</label>
                          <input
                            type="date"
                            value={task.dueDate}
                            onChange={(e) => handleTaskChange(index, 'dueDate', e.target.value)}
                            className="w-full px-3 py-2 bg-surface-card border border-default rounded-lg text-primary focus:outline-none focus:ring-1 focus:ring-accent-cyan/30 transition-all"
                          />
                        </div>
                        <div className="col-span-4">
                          <label className="block text-sm font-medium mb-2 text-secondary">Assigned To</label>
                          <input
                            type="text"
                            value={task.assignedTo}
                            onChange={(e) => handleTaskChange(index, 'assignedTo', e.target.value)}
                            placeholder="e.g. HR Department"
                            className="w-full px-3 py-2 bg-surface-card border border-default rounded-lg text-primary focus:outline-none focus:ring-1 focus:ring-accent-cyan/30 transition-all"
                          />
                        </div>
                        <div className="col-span-1 flex items-end">
                          {tasks.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveTask(index)}
                              className="text-status-danger hover:underline text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Required Documents */}
                <div className="glass p-6 rounded-2xl mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-primary">Required Documents</h3>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="button"
                      onClick={handleAddDocument}
                      className="px-3 py-1 bg-accent-purple/20 text-accent-purple rounded-lg font-medium text-sm hover:bg-accent-purple/30 transition-all"
                    >
                      + Add Document
                    </motion.button>
                  </div>
                  
                  <div className="space-y-4">
                    {documents.map((document, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 bg-surface-hover rounded-lg">
                        <FileText size={16} className="text-secondary" />
                        <input
                          type="text"
                          value={document}
                          onChange={(e) => handleDocumentChange(index, e.target.value)}
                          placeholder="e.g. Offer Letter"
                          className="flex-1 px-3 py-2 bg-surface-card border border-default rounded-lg text-primary focus:outline-none focus:ring-1 focus:ring-accent-cyan/30 transition-all"
                        />
                        {documents.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveDocument(index)}
                            className="text-status-danger hover:underline text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="glass p-6 rounded-2xl">
                  <h3 className="text-lg font-bold text-primary mb-4">Additional Notes</h3>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special instructions or notes for this onboarding..."
                    rows={4}
                    className="w-full px-4 py-3 bg-surface-hover border border-default rounded-xl text-primary placeholder-secondary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all resize-none"
                  />
                </div>
              </form>
            </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 mt-6">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              onClick={handleSubmit}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Start Onboarding
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-surface-hover border border-default text-secondary font-medium rounded-xl hover:bg-surface-hover/80 transition-all"
            >
              Cancel
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}