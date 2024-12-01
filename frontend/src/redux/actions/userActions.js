import axios from 'axios';

export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch({ type: 'USERS_FETCH_REQUEST' });
    const response = await axios.get('http://localhost:5001/api/users', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    
    dispatch({
      type: 'USERS_FETCH_SUCCESS',
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: 'USERS_FETCH_FAILURE',
      payload: error.response?.data?.message || 'Failed to fetch users'
    });
  }
};