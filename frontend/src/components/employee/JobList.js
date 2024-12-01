// src/components/employee/JobList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  CircularProgress 
} from '@mui/material';
import { fetchJobs } from '../../redux/actions/jobActions';

const JobList = () => {
  const dispatch = useDispatch();
  const { jobs, loading, error } = useSelector(state => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  if (loading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Available Jobs
      </Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} md={6} key={job._id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{job.jobTitle}</Typography>
                <Typography color="text.secondary">{job.companyName}</Typography>
                <Typography variant="body2">{job.description}</Typography>
                <Typography variant="subtitle1">
                  Salary: ${job.salary}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default JobList;