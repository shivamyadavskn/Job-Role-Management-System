import { configureStore } from '@reduxjs/toolkit';
import jobRolesReducer from './slices/jobRolesSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
  reducer: {
    jobRoles: jobRolesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store; 