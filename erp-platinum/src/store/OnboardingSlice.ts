import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import api from '@/services/api';

export interface Onboarding {
  id: string;
  staffId: string;
  startDate: string; // ISO string
  checklistStatus: string; // "Not Started", "In Progress", "Completed"
}

interface OnboardingState {
  onboardings: Onboarding[];
  loading: boolean;
  error: string | null;
}

const initialState: OnboardingState = {
  onboardings: [],
  loading: false,
  error: null,
};

// Thunks

export const fetchOnboardings = createAsyncThunk<Onboarding[]>(
  'onboarding/fetchAll',
  async () => {
    const res = await api.get<Onboarding[]>('/Onboarding');
    return res.data;
  }
);

export const addOnboarding = createAsyncThunk<Onboarding, Omit<Onboarding, 'id'>>(
  'onboarding/add',
  async (data) => {
    const res = await api.post<Onboarding>('/Onboarding', data);
    return res.data;
  }
);

export const updateOnboarding = createAsyncThunk<Onboarding, Onboarding>(
  'onboarding/update',
  async (data) => {
    await api.put(`/Onboarding/${data.id}`, data);
    // The backend returns no content, so return the updated object
    return data;
  }
);

export const deleteOnboarding = createAsyncThunk<string, string>(
  'onboarding/delete',
  async (id) => {
    await api.delete(`/Onboarding/${id}`);
    return id;
  }
);

// Slice

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOnboardings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOnboardings.fulfilled, (state, action: PayloadAction<Onboarding[]>) => {
        state.loading = false;
        state.onboardings = action.payload;
      })
      .addCase(fetchOnboardings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch onboardings';
      })
      .addCase(addOnboarding.fulfilled, (state, action: PayloadAction<Onboarding>) => {
        state.onboardings.push(action.payload);
      })
      .addCase(updateOnboarding.fulfilled, (state, action: PayloadAction<Onboarding>) => {
        const idx = state.onboardings.findIndex(o => o.id === action.payload.id);
        if (idx !== -1) state.onboardings[idx] = action.payload;
      })
      .addCase(deleteOnboarding.fulfilled, (state, action: PayloadAction<string>) => {
        state.onboardings = state.onboardings.filter(o => o.id !== action.payload);
      });
  },
});

export default onboardingSlice.reducer;