import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  loading: boolean;
  error: string | null;
  modalOpen: boolean;
  snackbar: {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info' | 'warning';
  };
  userRole: 'admin' | 'viewer';
  themeMode: 'light' | 'dark';
}

const initialState: UIState = {
  loading: false,
  error: null,
  modalOpen: false,
  snackbar: {
    open: false,
    message: '',
    severity: 'success',
  },
  userRole: 'admin',
  themeMode: 'light',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setModalOpen(state, action: PayloadAction<boolean>) {
      state.modalOpen = action.payload;
    },
    showSnackbar(state, action: PayloadAction<{ message: string; severity: 'success' | 'error' | 'info' | 'warning' }>) {
      state.snackbar = { open: true, ...action.payload };
    },
    closeSnackbar(state) {
      state.snackbar.open = false;
    },
    setUserRole(state, action: PayloadAction<'admin' | 'viewer'>) {
      state.userRole = action.payload;
    },
    setThemeMode(state, action: PayloadAction<'light' | 'dark'>) {
      state.themeMode = action.payload;
    },
  },
});

export const { setLoading, setError, setModalOpen, showSnackbar, closeSnackbar, setUserRole, setThemeMode } = uiSlice.actions;
export default uiSlice.reducer; 