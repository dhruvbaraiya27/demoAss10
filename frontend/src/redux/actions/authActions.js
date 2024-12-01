// src/redux/actions/authActions.js
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: 'LOGIN_REQUEST' });
    
    const response = await axios.post('http://localhost:5001/api/auth/login', { 
      email, 
      password 
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Check if response contains expected data
    if (!response.data || !response.data.token) {
      throw new Error('Invalid login response');
    }

    // Store token and user info
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: response.data.user
    });

    // Redirect based on user type
    window.location.href = response.data.user.type === 'admin' 
      ? '/admin/employees' 
      : '/employee/jobs';

  } catch (error) {
    console.error('Login Error:', error);
    
    const errorMessage = error.response?.data?.message 
      || error.message 
      || 'Login failed';

    dispatch({
      type: 'LOGIN_FAILURE',
      payload: errorMessage
    });
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return { type: 'LOGOUT' };
};

export const checkAuthStatus = () => (dispatch) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (token && user) {
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: user
    });
  }
};