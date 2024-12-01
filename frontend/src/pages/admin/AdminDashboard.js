// src/pages/admin/AdminDashboard.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import EmployeeList from '../../components/admin/EmployeeList';
import AddJobForm from '../../components/admin/AddJobForm';
import AdminNavbar from '../../components/common/Navbar';

const AdminDashboard = () => {
  return (
    <>
      <AdminNavbar userType="admin" />
      <Container>
        <Routes>
          <Route path="employees" element={<EmployeeList />} />
          <Route path="add-job" element={<AddJobForm />} />
        </Routes>
      </Container>
    </>
  );
};

export default AdminDashboard;  // Add this line