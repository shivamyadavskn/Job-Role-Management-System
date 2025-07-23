import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setUserRole } from '../slices/uiSlice';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const RoleSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const userRole = useSelector((state: RootState) => state.ui.userRole);
  return (
    <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
      <FormControl size="small" sx={{ minWidth: 120 }}>
        <InputLabel>User Role</InputLabel>
        <Select
          value={userRole}
          label="User Role"
          onChange={e => dispatch(setUserRole(e.target.value as 'admin' | 'viewer'))}
        >
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="viewer">Viewer</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default RoleSwitcher; 