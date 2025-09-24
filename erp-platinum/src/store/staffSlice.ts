import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';

// Types
export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  dateJoined: string; // 👈 ADD THIS (ISO date string like "2023-01-15T00:00:00")
  isActive: boolean;
}

interface StaffState {
  staff: Staff[];
  loading: boolean;
  error: string | null;
}

const initialState: StaffState = {
  staff: [],
  loading: false,
  error: null,
};

// ✅ Thunks
export const fetchStaff = createAsyncThunk<Staff[]>(
  'staff/fetchAll',
  async () => {
    const res = await api.get<Staff[]>('/Staff');
    return res.data;
  }
);

export const addStaff = createAsyncThunk<Staff, Partial<Staff>>(
  'staff/add',
  async (staffData) => {
    const res = await api.post<Staff>('/Staff', staffData);
    return res.data;
  }
);

export const deleteStaff = createAsyncThunk<string, string>(
  'Staff/delete',
  async (id) => {
    await api.delete(`/Staff/${id}`);
    return id; // ✅ return id so reducer can remove it
  }
);

export const updateStaff = createAsyncThunk<Staff, Partial<Staff> & { id: string }>(
  'staff/update',
  async (updatedStaff) => {
    const { id, ...data } = updatedStaff;
    const res = await api.put<Staff>(`/Staff/${id}`, data);
    return res.data;
  }
);


// ✅ Slice
const staffSlice = createSlice({
  name: 'Staff',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStaff.fulfilled, (state, action: PayloadAction<Staff[]>) => {
        state.loading = false;
        state.staff = action.payload;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch staff';
      })

      // add
      .addCase(addStaff.fulfilled, (state, action: PayloadAction<Staff>) => {
        state.staff.push(action.payload);
      })

      // delete
      .addCase(deleteStaff.fulfilled, (state, action: PayloadAction<string>) => {
        state.staff = state.staff.filter((s) => s.id !== action.payload);
      });
  },
});

export default staffSlice.reducer;
