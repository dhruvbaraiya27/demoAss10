// src/components/common/Navbar.js
import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button 
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';

const Navbar = ({ userType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {userType === 'admin' ? 'Admin Dashboard' : 'Employee Portal'}
        </Typography>
        {userType === 'admin' && (
          <>
            <Button color="inherit" href="/admin/employees">
              Employees
            </Button>
            <Button color="inherit" href="/admin/add-job">
              Add Job
            </Button>
          </>
        )}
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;