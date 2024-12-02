// src/pages/admin/AdminDashboard.js
import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import { Provider, useSelector, useDispatch } from "react-redux";

import EmployeeList from "../../components/admin/EmployeeList";
import AddJobForm from "../../components/admin/AddJobForm";
import AdminNavbar from "../../components/common/Navbar";

const AdminDashboard = () => {
  const [authenticationValueIsAvailable, setAuthenticationValueIsAvailable] =
    useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log("isAuthenticated:", isAuthenticated, "user:", user);

  useEffect(() => {
    setAuthenticationValueIsAvailable(true);
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (authenticationValueIsAvailable && !isAuthenticated) {
      return <Navigate to="/login" />;
    }
  }, [authenticationValueIsAvailable, isAuthenticated]);

  return (
    <>
      <AdminNavbar userType="admin" />
      <Container>
        <Routes>
          <Route path="employees" element={<EmployeeList />} />
          <Route path="addjob" element={<AddJobForm />} />
        </Routes>
      </Container>
    </>
  );
};

export default AdminDashboard; // Add this line
