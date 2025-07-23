import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import JobRoleList from './components/JobRoleList';
import JobRoleForm from './components/JobRoleForm';
import Feedback from './components/Feedback';
import RoleSwitcher from './components/RoleSwitcher';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  return (
    <>
      <Feedback />
      <ThemeToggle />
      <RoleSwitcher />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Routes>
          <Route path="/list" element={<JobRoleList />} />
          <Route path="/add" element={<JobRoleForm mode="add" />} />
          <Route path="/edit/:id" element={<JobRoleForm mode="edit" />} />
          <Route path="*" element={<Navigate to="/list" replace />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
