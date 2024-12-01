import axios from 'axios';

export const createJob = (jobData) => async (dispatch) => {
  try {
    dispatch({ type: 'JOB_CREATE_REQUEST' });
    const response = await axios.post('http://localhost:5001/api/jobs/create', jobData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    dispatch({
      type: 'JOB_CREATE_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'JOB_CREATE_FAILURE',
      payload: error.response?.data?.message || 'Job creation failed'
    });
  }
};

export const fetchJobs = () => async (dispatch) => {
  try {
    dispatch({ type: 'JOB_FETCH_REQUEST' });
    const response = await axios.get('http://localhost:5001/api/jobs', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    dispatch({
      type: 'JOB_FETCH_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'JOB_FETCH_FAILURE',
      payload: error.response?.data?.message || 'Failed to fetch jobs'
    });
  }
};