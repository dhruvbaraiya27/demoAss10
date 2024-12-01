// src/components/admin/AddJobForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { 
  TextField, 
  Button, 
  Container, 
  Box, 
  Typography 
} from '@mui/material';
import { createJob } from '../../redux/actions/jobActions';

const AddJobForm = () => {
  const [jobData, setJobData] = useState({
    companyName: '',
    jobTitle: '',
    description: '',
    salary: ''
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createJob(jobData));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Job
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Company Name"
            name="companyName"
            value={jobData.companyName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Job Title"
            name="jobTitle"
            value={jobData.jobTitle}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            multiline
            rows={4}
            value={jobData.description}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Salary"
            name="salary"
            type="number"
            value={jobData.salary}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Create Job
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddJobForm;