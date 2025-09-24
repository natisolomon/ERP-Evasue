import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';

// TypeScript interface matching your backend Attendance model
export interface Attendance {
  id: string;
  staffId: string;
  date: string; // ISO string
  isPresent: boolean;
}

interface AttendanceState {
  records: Attendance[];
  loading: boolean;
  error: string | null;
}

const initialState: AttendanceState = {
  records: [],
  loading: false,
  error: null,
};

// Thunks for CRUD operations

export const fetchAttendance = createAsyncThunk<Attendance[]>(
  'attendance/fetchAll',
  async () => {
    const res = await api.get<Attendance[]>('/Attendance');
    return res.data;
  }
);

export const addAttendance = createAsyncThunk<Attendance, Omit<Attendance, 'id'>>(
  'attendance/add',
  async (data) => {
    const res = await api.post<Attendance>('/Attendance', data);
    return res.data;
  }
);

export const updateAttendance = createAsyncThunk<Attendance, Attendance>(
  'attendance/update',
  async (data) => {
    const res = await api.put<Attendance>(`/Attendance/${data.id}`, data);
    return res.data;
  }
);

export const deleteAttendance = createAsyncThunk<string, string>(
  'attendance/delete',
  async (id) => {
    await api.delete(`/Attendance/${id}`);
    return id;
  }
);

// Slice

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendance.fulfilled, (state, action: PayloadAction<Attendance[]>) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch attendance';
      })
      // Add
      .addCase(addAttendance.fulfilled, (state, action: PayloadAction<Attendance>) => {
        state.records.push(action.payload);
      })
      // Update
      .addCase(updateAttendance.fulfilled, (state, action: PayloadAction<Attendance>) => {
        const idx = state.records.findIndex(a => a.id === action.payload.id);
        if (idx !== -1) state.records[idx] = action.payload;
      })
      // Delete
      .addCase(deleteAttendance.fulfilled, (state, action: PayloadAction<string>) => {
        state.records = state.records.filter(a => a.id !== action.payload);
      });
  },
});

export default attendanceSlice.reducer;