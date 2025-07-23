import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { createJobRole, updateJobRole, fetchJobRoles, setSelected } from '../slices/jobRolesSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Paper, TextField, Button, MenuItem, Typography, CircularProgress } from '@mui/material';

const departments = ['Engineering', 'Sales', 'HR'];
const levels = ['Junior', 'Mid', 'Senior', 'Lead'];

interface Props {
  mode: 'add' | 'edit';
}

const JobRoleForm: React.FC<Props> = ({ mode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const { items, loading, error } = useSelector((state: RootState) => state.jobRoles);
  const userRole = useSelector((state: RootState) => state.ui.userRole);
  const [form, setForm] = useState({
    jobTitle: '',
    department: '',
    level: '',
    description: '',
  });
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && id) {
      const role = items.find(j => j._id === id);
      if (role) setForm({
        jobTitle: role.jobTitle,
        department: role.department,
        level: role.level,
        description: role.description,
      });
      else dispatch(fetchJobRoles());
    }
    // eslint-disable-next-line
  }, [mode, id, items]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!form.jobTitle || !form.department || !form.level || !form.description) return;
    if (mode === 'add') {
      await dispatch(createJobRole(form));
    } else if (mode === 'edit' && id) {
      await dispatch(updateJobRole({ id, data: form }));
    }
    dispatch(setSelected(null));
    navigate('/list');
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>{mode === 'add' ? 'Add' : 'Edit'} Job Role</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Job Title"
          name="jobTitle"
          value={form.jobTitle}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={touched && !form.jobTitle}
          disabled={userRole !== 'admin'}
        />
        <TextField
          select
          label="Department"
          name="department"
          value={form.department}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={touched && !form.department}
          disabled={userRole !== 'admin'}
        >
          {departments.map(dep => <MenuItem key={dep} value={dep}>{dep}</MenuItem>)}
        </TextField>
        <TextField
          select
          label="Level"
          name="level"
          value={form.level}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          error={touched && !form.level}
          disabled={userRole !== 'admin'}
        >
          {levels.map(lvl => <MenuItem key={lvl} value={lvl}>{lvl}</MenuItem>)}
        </TextField>
        <TextField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          minRows={3}
          required
          error={touched && !form.description}
          disabled={userRole !== 'admin'}
        />
        {error && <Typography color="error">{error}</Typography>}
        <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
          <Button type="submit" variant="contained" color="primary" disabled={loading || userRole !== 'admin'}>
            {loading ? <CircularProgress size={24} /> : mode === 'add' ? 'Add' : 'Update'}
          </Button>
          <Button variant="outlined" onClick={() => navigate('/list')}>Cancel</Button>
        </div>
      </form>
    </Paper>
  );
};

export default JobRoleForm; 