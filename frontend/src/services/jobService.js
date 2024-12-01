// src/services/jobService.js
import API from '../utils/api';

export const jobService = {
  createJob: async (jobData) => {
    try {
      const response = await API.post('http://localhost:5001/api/jobs/create', jobData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Job creation failed');
    }
  },

  getAllJobs: async () => {
    try {
      const response = await API.get('http://localhost:5001/api/jobs/');
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to fetch jobs');
    }
  },

  // getJobById: async (jobId) => {
  //   try {
  //     const response = await API.get(`/jobs/${jobId}`);
  //     return response.data;
  //   } catch (error) {
  //     throw error.response?.data || new Error('Failed to fetch job details');
  //   }
  // }
};