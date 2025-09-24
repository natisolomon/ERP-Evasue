import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected';

export interface LeaveRequest {
  id: string;
  staffId: string;
  startDate: string; // ISO string
  endDate: string;   // ISO string
  reason: string;
  status: LeaveStatus;
}

interface LeaveRequestState {
  requests: LeaveRequest[];
  loading: boolean;
  error: string | null;
}

const initialState: LeaveRequestState = {
  requests: [],
  loading: false,
  error: null,
};

// Thunks
export const fetchLeaveRequests = createAsyncThunk<LeaveRequest[]>(
  'leave/fetchAll',
  async () => {
    const res = await api.get<LeaveRequest[]>('/LeaveRequest');
    return res.data;
  }
);

export const addLeaveRequest = createAsyncThunk<LeaveRequest, Omit<LeaveRequest, 'id' | 'status'>>(
  'leave/add',
  async (data) => {
    const res = await api.post<LeaveRequest>('/LeaveRequest', data);
    return res.data;
  }
);

export const updateLeaveRequest = createAsyncThunk<LeaveRequest, LeaveRequest>(
  'leave/update',
  async (data) => {
    const res = await api.put<LeaveRequest>(`/LeaveRequest/${data.id}`, data);
    return res.data;
  }
);

export const approveLeaveRequest = createAsyncThunk<string, string>(
  'leave/approve',
  async (id) => {
    await api.post(`/LeaveRequest/${id}/approve`);
    return id;
  }
);

export const rejectLeaveRequest = createAsyncThunk<string, string>(
  'leave/reject',
  async (id) => {
    await api.post(`/LeaveRequest/${id}/reject`);
    return id;
  }
);

// Slice
const leaveRequestSlice = createSlice({
  name: 'leaveRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaveRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaveRequests.fulfilled, (state, action: PayloadAction<LeaveRequest[]>) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchLeaveRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch leave requests';
      })
      .addCase(addLeaveRequest.fulfilled, (state, action: PayloadAction<LeaveRequest>) => {
        state.requests.push(action.payload);
      })
      .addCase(updateLeaveRequest.fulfilled, (state, action: PayloadAction<LeaveRequest>) => {
        const idx = state.requests.findIndex(r => r.id === action.payload.id);
        if (idx !== -1) state.requests[idx] = action.payload;
      })
      .addCase(approveLeaveRequest.fulfilled, (state, action: PayloadAction<string>) => {
        const req = state.requests.find(r => r.id === action.payload);
        if (req) req.status = 'Approved';
      })
      .addCase(rejectLeaveRequest.fulfilled, (state, action: PayloadAction<string>) => {
        const req = state.requests.find(r => r.id === action.payload);
        if (req) req.status = 'Rejected';
      });
  },
});

export default leaveRequestSlice.reducer;