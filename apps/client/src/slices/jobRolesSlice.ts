import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL ='http://localhost:5000';

export interface JobRole {
  _id?: string;
  jobTitle: string;
  department: string;
  level: string;
  description: string;
  createdAt?: string;
}

interface JobRolesState {
  items: JobRole[];
  loading: boolean;
  error: string | null;
  selected: JobRole | null;
  filters: {
    search: string;
    department: string;
    sort: 'newest' | 'oldest';
    page: number;
    limit: number;
  };
  total: number;
}

const initialState: JobRolesState = {
  items: [],
  loading: false,
  error: null,
  selected: null,
  filters: {
    search: '',
    department: '',
    sort: 'newest',
    page: 1,
    limit: 10,
  },
  total: 0,
};

export const fetchJobRoles = createAsyncThunk(
  'jobRoles/fetchAll',
  async (_, { getState }) => {
    const state = getState() as { jobRoles: JobRolesState };
    const { search, department, sort, page, limit } = state.jobRoles.filters;
    const params: any = { page, limit };
    if (search) params.search = search;
    if (department) params.department = department;
    if (sort) params.sort = sort === 'oldest' ? 'oldest' : undefined;
    const res = await axios.get(`${API_URL}/jobroles`, { params });
    return res.data;
  }
);

export const createJobRole = createAsyncThunk(
  'jobRoles/create',
  async (data: Omit<JobRole, '_id' | 'createdAt'>) => {
    const res = await axios.post(`${API_URL}/jobroles`, data);
    return res.data;
  }
);

export const updateJobRole = createAsyncThunk(
  'jobRoles/update',
  async ({ id, data }: { id: string; data: Omit<JobRole, '_id' | 'createdAt'> }) => {
    const res = await axios.put(`${API_URL}/jobroles/${id}`, data);
    return res.data;
  }
);

export const deleteJobRole = createAsyncThunk(
  'jobRoles/delete',
  async (id: string) => {
    await axios.delete(`${API_URL}/jobroles/${id}`);
    return id;
  }
);

const jobRolesSlice = createSlice({
  name: 'jobRoles',
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<JobRolesState['filters']>>) {
      state.filters = { ...state.filters, ...action.payload };
      if (action.payload.page === undefined) state.filters.page = 1; // reset page on filter change
    },
    setSelected(state, action: PayloadAction<JobRole | null>) {
      state.selected = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.filters.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchJobRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch job roles';
      })
      .addCase(createJobRole.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateJobRole.fulfilled, (state, action) => {
        const idx = state.items.findIndex(j => j._id === action.payload._id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(deleteJobRole.fulfilled, (state, action) => {
        state.items = state.items.filter(j => j._id !== action.payload);
      });
  },
});

export const { setFilters, setSelected, setPage } = jobRolesSlice.actions;
export default jobRolesSlice.reducer; 