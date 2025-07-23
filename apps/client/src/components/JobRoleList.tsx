import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchJobRoles, setFilters, setSelected, deleteJobRole, setPage } from '../slices/jobRolesSlice';
import { useNavigate } from 'react-router-dom';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Select, MenuItem, InputLabel, FormControl, IconButton, CircularProgress, Typography, Pagination
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const departments = ['Engineering', 'Sales', 'HR'];
const levels = ['Junior', 'Mid', 'Senior', 'Lead'];

const JobRoleList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items, loading, error, filters, total } = useSelector((state: RootState) => state.jobRoles);
  const userRole = useSelector((state: RootState) => state.ui.userRole);

  useEffect(() => {
    dispatch(fetchJobRoles());
  }, [dispatch, filters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilters({ search: e.target.value }));
  };

  const handleDepartmentChange = (e: any) => {
    dispatch(setFilters({ department: e.target.value }));
  };

  const handleSortChange = (e: any) => {
    dispatch(setFilters({ sort: e.target.value }));
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this job role?')) {
      dispatch(deleteJobRole(id));
    }
  };

  const handlePageChange = (_: any, value: number) => {
    dispatch(setPage(value));
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>Job Roles</Typography>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <TextField label="Search by Title" value={filters.search} onChange={handleSearchChange} size="small" />
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Department</InputLabel>
          <Select value={filters.department} label="Department" onChange={handleDepartmentChange}>
            <MenuItem value="">All</MenuItem>
            {departments.map(dep => <MenuItem key={dep} value={dep}>{dep}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Sort</InputLabel>
          <Select value={filters.sort} label="Sort" onChange={handleSortChange}>
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={() => navigate('/add')} disabled={userRole !== 'admin'}>Add Job Role</Button>
      </div>
      {loading ? <CircularProgress /> : error ? <Typography color="error">{error}</Typography> : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Level</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map(role => (
                  <TableRow key={role._id}>
                    <TableCell>{role.jobTitle}</TableCell>
                    <TableCell>{role.department}</TableCell>
                    <TableCell>{role.level}</TableCell>
                    <TableCell>{new Date(role.createdAt || '').toLocaleString()}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(role._id!)} disabled={userRole !== 'admin'}><EditIcon /></IconButton>
                      <IconButton onClick={() => handleDelete(role._id!)} disabled={userRole !== 'admin'}><DeleteIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
            <Typography variant="body2">Total: {total}</Typography>
            <Pagination
              count={Math.ceil(total / filters.limit)}
              page={filters.page}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </>
      )}
    </Paper>
  );
};

export default JobRoleList; 