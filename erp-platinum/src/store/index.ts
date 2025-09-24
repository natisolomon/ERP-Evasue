import { configureStore } from '@reduxjs/toolkit';
import staffReducer from '../store/staffSlice';

export const store = configureStore({
  reducer: {
    staff: staffReducer, // 👈 key must match your slice usage
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;