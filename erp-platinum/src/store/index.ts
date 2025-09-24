// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import staffReducer from '../store/staffSlice';          
import attendanceReducer from '@/store/AttendanceSlice'; 
import leaveRequestReducer from '@/store/LeaveRequestSlice'; 
import onboardingReducer from '@/store/OnboardingSlice';

export const store = configureStore({
  reducer: {
    staff: staffReducer,
    attendance: attendanceReducer,
    leaveRequest: leaveRequestReducer, 
    onboarding: onboardingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;