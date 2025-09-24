// src/components/hr/onboarding/HROnboardingFilters.tsx
'use client';

interface HROnboardingFiltersProps {
  filters: {
    staffId: string;
    startDate: string; // ISO string
    checklistStatus: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    staffId: string;
    startDate: string; // ISO string
    checklistStatus: string;
  }>>;
}

export function HROnboardingFilters({ filters, setFilters }: HROnboardingFiltersProps) {
  return (
    <div className="glass rounded-3xl p-6 border border-default mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-secondary">Status</label>
          <select
            value={filters.staffId}
            onChange={(e) => setFilters({ ...filters, staffId: e.target.value })}
            className="w-full px-4 py-3 bg-surface-card border border-default rounded-xl text-primary focus:outline-none focus:ring-2 focus:ring-accent-cyan/30 transition-all"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        
        </div>
      </div>
  );
}