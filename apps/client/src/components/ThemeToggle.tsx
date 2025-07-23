import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setThemeMode } from '../slices/uiSlice';
import { FormControlLabel, Switch, Box } from '@mui/material';

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.ui.themeMode);
  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <FormControlLabel
        control={
          <Switch
            checked={themeMode === 'dark'}
            onChange={(_, checked) => dispatch(setThemeMode(checked ? 'dark' : 'light'))}
          />
        }
        label="Dark Mode"
      />
    </Box>
  );
};

export default ThemeToggle; 