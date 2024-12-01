// src/services/userService.js
import API from '../utils/api';

export const userService = {
  getAllUsers: async () => {
    try {
      const response = await API.get('/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to fetch users');
    }
  },

  getUserProfile: async (userId) => {
    try {
      const response = await API.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || new Error('Failed to fetch user profile');
    }
  }
};