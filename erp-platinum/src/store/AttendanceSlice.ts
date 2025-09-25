import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';

// Types
export type AttendanceStatus = 'Present' | 'Absent' | 'Late';

export interface Attendance {
  id: string;
  staffId: string;
  date: string; // ISO string
  isPresent: boolean; // revert to previous boolean model
}

export interface AttendanceSummary {
  daily: number;
  weekly: number;
  monthly: number;
}

// State
interface AttendanceState {
  records: Attendance[];
  loading: boolean;
  error: string | null;
  summary: AttendanceSummary | null;
}

const initialState: AttendanceState = {
  records: [],
  loading: false,
  error: null,
  summary: null,
};

// Thunks

// Fetch all attendances
export const fetchAttendance = createAsyncThunk<Attendance[]>(
  'attendance/fetchAll',
  async () => {
    const res = await api.get<Attendance[]>('/Attendance');
    return res.data;
  }
);

// Create attendance
export const addAttendance = createAsyncThunk<Attendance, Omit<Attendance, 'id'>>(
  'attendance/add',
  async (data) => {
    const res = await api.post<Attendance>('/Attendance', data);
    return res.data;
  }
);

// Update attendance
export const updateAttendance = createAsyncThunk<Attendance, Attendance>(
  'attendance/update',
  async (data) => {
    const res = await api.put<Attendance>(`/Attendance/${data.id}`, data);
    return res.data;
  }
);

// Delete attendance
export const deleteAttendance = createAsyncThunk<string, string>(
  'attendance/delete',
  async (id) => {
    await api.delete(`/Attendance/${id}`);
    return id;
  }
);

// Fetch attendance summary
export const fetchAttendanceSummary = createAsyncThunk<AttendanceSummary, string>(
  'attendance/fetchSummary',
  async (staffId) => {
    const res = await api.get<AttendanceSummary>(`/Attendance/summary/${staffId}`);
    return res.data;
  }
);

// Slice
const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
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
      })

      // Summary
      .addCase(fetchAttendanceSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendanceSummary.fulfilled, (state, action: PayloadAction<AttendanceSummary>) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchAttendanceSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch attendance summary';
      });
  },
});

export default attendanceSlice.reducer;
