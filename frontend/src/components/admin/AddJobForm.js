// src/components/admin/AddJobForm.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Container, Box, Typography, Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { createJob } from "../../redux/actions/jobActions";

const AddJobForm = () => {
  const [open, setOpen] = React.useState(false);
  const { loading, error, jobs } = useSelector((state) => state.jobs);

  useEffect(() => {
    if (jobs.length > 0) {
      // reset the form
      console.log("jobs:", jobs);

      setJobData({
        companyName: "",
        jobTitle: "",
        description: "",
        salary: "",
      });
    }
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  }, [jobs]);

  const [jobData, setJobData] = useState({
    companyName: "",
    jobTitle: "",
    description: "",
    salary: "",
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    console.log("jobData:", jobData);

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
          {error && (
            <Alert severity="error" sx={{ width: "100%", mt: 2 }}>
              {error}
            </Alert>
          )}
          {loading && (
            <Alert severity="success" sx={{ width: "100%", mt: 2 }}>
              Job created successfully
            </Alert>
          )}
          {jobs.length > 0 && (
            <Collapse in={open}>
              <Alert
                severity="success"
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
                sx={{ width: "100%", mt: 2 }}
              >
                {jobs[jobs.length - 1].jobTitle} created successfully
              </Alert>
            </Collapse>
          )}
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
