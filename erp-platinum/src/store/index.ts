import { configureStore } from '@reduxjs/toolkit';
import staffReducer from '../store/staffSlice';
import attendanceReducer from '../store/AttendanceSlice'

export const store = configureStore({
  reducer: {
    staff: staffReducer, // 👈 key must match your slice usage
    attendance: attendanceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;