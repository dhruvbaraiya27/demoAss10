// src/services/authService.js
import API from '../utils/api';

export const authService = {
  login: async (email, password) => {
    try {
      const response = await API.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Login failed');
    }
  },

  register: async (userData) => {
    try {
      const response = await API.post('/user/create', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Registration failed');
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await API.get('/auth/current-user');
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to fetch current user');
    }
  }
};