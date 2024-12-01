// src/pages/admin/ManageEmployees.js
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/actions/userActions';
import { register } from '../../redux/actions/authActions';

const ManageEmployees = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector(state => state.users);
  
  const [open, setOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
    type: 'employee'
  });

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNewUser({
      fullName: '',
      email: '',
      password: '',
      type: 'employee'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateUser = async () => {
    try {
      await dispatch(register(newUser));
      dispatch(fetchUsers());
      handleCloseDialog();
    } catch (error) {
      console.error('User creation failed', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Employees
      </Typography>
      
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleOpenDialog}
        sx={{ mb: 2 }}
      >
        Add New Employee
      </Button>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.type}</TableCell>
                <TableCell>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button size="small" color="secondary">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add User Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="fullName"
            label="Full Name"
            fullWidth
            value={newUser.fullName}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            value={newUser.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            value={newUser.password}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCreateUser} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageEmployees;