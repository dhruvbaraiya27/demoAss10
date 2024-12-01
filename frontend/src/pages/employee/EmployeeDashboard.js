// src/pages/employee/EmployeeDashboard.js
import React from 'react';
import { Container } from '@mui/material';
import JobList from '../../components/employee/JobList';
import EmployeeNavbar from '../../components/common/Navbar';

const EmployeeDashboard = () => {
  return (
    <>
      <EmployeeNavbar userType="employee" />
      <Container>
        <JobList />
      </Container>
    </>
  );
};

export default EmployeeDashboard;  // Add this line