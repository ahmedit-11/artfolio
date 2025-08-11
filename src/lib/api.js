// api.js
// Centralized API service for all backend communication

import axios from 'axios';
import Cookies from 'js-cookie';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://192.168.1.110:8000/api',
  withCredentials: true,
});

// Request interceptor to attach auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear cookie and redirect to login
      Cookies.remove('token');
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);

// CSRF token helper
const getCsrfCookie = async () => {
  await axios.get('http://192.168.1.110:8000/sanctum/csrf-cookie', {
    withCredentials: true
  });
};

// Authentication API calls
export const authAPI = {
  // Login user
  login: async (credentials) => {
    await getCsrfCookie();
    const response = await api.post('/login', credentials);
    if (response.data?.data?.access_token) {
      Cookies.set('token', response.data.data.access_token);
    }
    return response.data;
  },

  // Register user
  register: async (userData) => {
    await getCsrfCookie();
    const response = await api.post('/register', userData);
    if (response.data?.data?.access_token) {
      Cookies.set('token', response.data.data.access_token);
    }
    return response.data;
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.post('/logout');
      return response.data;
    } catch (error) {
      // Even if backend logout fails, we should clear the token locally
      console.warn('Backend logout failed, but clearing token locally:', error);
      throw error;
    } finally {
      // Always clear the token from cookies regardless of backend response
      Cookies.remove('token');
    }
  },

  // Get current user profile
  getProfile: async () => {
    const response = await api.get('/user/profile');
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.put('/user/profile', profileData);
    return response.data;
  }
};

// Portfolio API calls
export const portfolioAPI = {
  // Get all portfolios
  getAll: async (params = {}) => {
    const response = await api.get('/portfolios', { params });
    return response.data;
  },

  // Get single portfolio
  getById: async (id) => {
    const response = await api.get(`/portfolios/${id}`);
    return response.data;
  },

  // Create new portfolio
  create: async (portfolioData) => {
    const response = await api.post('/portfolios', portfolioData);
    return response.data;
  },

  // Update portfolio
  update: async (id, portfolioData) => {
    const response = await api.put(`/portfolios/${id}`, portfolioData);
    return response.data;
  },

  // Delete portfolio
  delete: async (id) => {
    const response = await api.delete(`/portfolios/${id}`);
    return response.data;
  },

  // Search portfolios
  search: async (query, filters = {}) => {
    const response = await api.get('/portfolios/search', {
      params: { q: query, ...filters }
    });
    return response.data;
  }
};

// User API calls
export const userAPI = {
  // Get all users
  getAll: async (params = {}) => {
    const response = await api.get('/users', { params });
    return response.data;
  },

  // Get user by ID
  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Follow/unfollow user
  toggleFollow: async (userId) => {
    const response = await api.post(`/users/${userId}/follow`);
    return response.data;
  },

  // Get user's followers
  getFollowers: async (userId) => {
    const response = await api.get(`/users/${userId}/followers`);
    return response.data;
  },

  // Get user's following
  getFollowing: async (userId) => {
    const response = await api.get(`/users/${userId}/following`);
    return response.data;
  }
};

// Comment API calls
export const commentAPI = {
  // Get comments for portfolio
  getByPortfolio: async (portfolioId) => {
    const response = await api.get(`/portfolios/${portfolioId}/comments`);
    return response.data;
  },

  // Create comment
  create: async (portfolioId, commentData) => {
    const response = await api.post(`/portfolios/${portfolioId}/comments`, commentData);
    return response.data;
  },

  // Update comment
  update: async (commentId, commentData) => {
    const response = await api.put(`/comments/${commentId}`, commentData);
    return response.data;
  },

  // Delete comment
  delete: async (commentId) => {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  }
};

// Interaction API calls (likes, ratings)
export const interactionAPI = {
  // Like/unlike portfolio
  toggleLike: async (portfolioId) => {
    const response = await api.post(`/portfolios/${portfolioId}/like`);
    return response.data;
  },

  // Rate portfolio
  rate: async (portfolioId, rating) => {
    const response = await api.post(`/portfolios/${portfolioId}/rate`, { rating });
    return response.data;
  },

  // Get portfolio interactions
  getByPortfolio: async (portfolioId) => {
    const response = await api.get(`/portfolios/${portfolioId}/interactions`);
    return response.data;
  }
};

// Admin API calls
export const adminAPI = {
  // Get dashboard stats
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },

  // Get all users for admin
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  // Ban user
  banUser: async (userId, banData) => {
    const response = await api.post(`/admin/users/${userId}/ban`, banData);
    return response.data;
  },

  // Unban user
  unbanUser: async (userId) => {
    const response = await api.post(`/admin/users/${userId}/unban`);
    return response.data;
  },

  // Get reports
  getReports: async (params = {}) => {
    const response = await api.get('/admin/reports', { params });
    return response.data;
  },

  // Handle report
  handleReport: async (reportId, action, data = {}) => {
    const response = await api.post(`/admin/reports/${reportId}/${action}`, data);
    return response.data;
  },

  // Get ban logs
  getBanLogs: async (params = {}) => {
    const response = await api.get('/admin/ban-logs', { params });
    return response.data;
  }
};

// Categories and Tags API
export const categoryAPI = {
  // Get all categories
  getAll: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get all tags
  getTags: async () => {
    const response = await api.get('/tags');
    return response.data;
  }
};

// Notifications API
export const notificationAPI = {
  // Get user notifications
  getAll: async () => {
    const response = await api.get('/notifications');
    return response.data;
  },

  // Mark notification as read
  markAsRead: async (notificationId) => {
    const response = await api.put(`/notifications/${notificationId}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async () => {
    const response = await api.put('/notifications/read-all');
    return response.data;
  }
};

// Chat API calls
export const chatAPI = {
  // Get conversations
  getConversations: async () => {
    const response = await api.get('/conversations');
    return response.data;
  },

  // Get messages for conversation
  getMessages: async (conversationId) => {
    const response = await api.get(`/conversations/${conversationId}/messages`);
    return response.data;
  },

  // Send message
  sendMessage: async (conversationId, messageData) => {
    const response = await api.post(`/conversations/${conversationId}/messages`, messageData);
    return response.data;
  },

  // Start new conversation
  startConversation: async (userId) => {
    const response = await api.post('/conversations', { user_id: userId });
    return response.data;
  }
};

// Export the configured axios instance for custom calls
export default api;
