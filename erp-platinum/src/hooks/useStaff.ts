import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { fetchStaff, addStaff, deleteStaff } from '@/store/staffSlice';
import type { Staff } from '@/store/staffSlice';

export const useStaff = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { staff, loading, error } = useSelector((state: RootState) => state.staff);

  // ✅ fetch staff on mount
  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  const loadStaff = () => {
    dispatch(fetchStaff());
  };

  // ✅ actions
  const createStaff = (data: Partial<Staff>) => {
    dispatch(addStaff(data));
  };

  const removeStaff = (id: string) => {
    dispatch(deleteStaff(id));
  };

  return {
    staff,
    loading,
    error,
    loadStaff,
    createStaff,
    removeStaff,
  };
};
