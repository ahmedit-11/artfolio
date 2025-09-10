// api.js
// Centralized API service for all backend communication

import axios from 'axios';
import Cookies from 'js-cookie';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: false,
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
      // Don't redirect if this is a login attempt (let the login page handle the error)
      const isLoginAttempt = error.config?.url?.includes('/login');
      const skipRedirect = error.config?.skipAuthRedirect;

      if (!isLoginAttempt && !skipRedirect) {
        // Token expired or invalid - clear cookie and redirect to login
        Cookies.remove('token');
        if (window.location.pathname !== '/signin') {
          window.location.replace('/signin');
        }
      }
    }
    return Promise.reject(error);
  }
);

// CSRF token helper - Not needed when supports_credentials: false
// const getCsrfCookie = async () => {
//   await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
//     withCredentials: false
//   });
// };

// Authentication API calls
export const authAPI = {
  // Login user
  login: async (credentials) => {
    const response = await api.post('/login', credentials);
    if (response.data?.access_token) {
      Cookies.set('token', response.data.access_token);
      // Store user data in localStorage for chat
      if (response.data?.user) {
        const user = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          profile_picture: response.data.user.profile_picture,
          avatar: response.data.user.profile_picture
        };
        localStorage.setItem('user', JSON.stringify(user));
      }
    }
    return response.data;
  },

  // Register user
  register: async (userData) => {
    const response = await api.post('/register', userData);
    if (response.data?.access_token) {
      Cookies.set('token', response.data.access_token);
      // Store user data in localStorage for chat
      if (response.data?.user) {
        const user = {
          id: response.data.user.id,
          name: response.data.user.name,
          email: response.data.user.email,
          profile_picture: response.data.user.profile_picture,
          avatar: response.data.user.profile_picture
        };
        localStorage.setItem('user', JSON.stringify(user));
      }
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
    const response = await api.get('/user/profile', { skipAuthRedirect: true });
    return response.data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await api.post('/user/profile', profileData);
    return response.data;
  },

  // Search users
  searchUsers: async (query) => {
    const response = await api.get('/users', { params: { search: query, per_page: 100 } });
    return response.data;
  },
  
  // Get all users (paginated)
  getAllUsers: async (page = 1, perPage = 100) => {
    const response = await api.get('/users', { params: { page, per_page: perPage } });
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await api.post('/forgot-password', { email });
    return response.data;
  },

  // Reset password
  resetPassword: async (resetData) => {
    const response = await api.post('/reset-password', resetData);
    return response.data;
  },

  // Change password
  changePassword: async (passwordData) => {
    const response = await api.post('/change-password', passwordData);
    return response.data;
  }
};

// Project API calls (backend uses 'projects' not 'portfolios')
export const projectAPI = {
  // Get all projects
  getAll: async (params = {}) => {
    const response = await api.get('/projects', { params });
    return response.data;
  },

  // Get single project by slug (for public viewing)
  getBySlug: async (slug) => {
    const response = await api.get(`/projects/${slug}`);
    return response.data;
  },

  // Get single project by ID (for authenticated operations)
  getById: async (id) => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },

  // Get personalized projects (For You page)
  getForYou: async () => {
    const response = await api.get('/projects/for-you');
    return response.data;
  },

  // Create new project
  create: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  // Update project
  update: async (id, projectData) => {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data;
  },

  // Delete project
  delete: async (id) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },

  // Search projects
  search: async (params = {}) => {
    const response = await api.get('/search/projects', { params });
    return response.data;
  },

  // Get trending projects
  getTrending: async () => {
    const response = await api.get('/trending-projects');
    return response.data;
  },

  // Toggle like on project
  toggleLike: async (projectId) => {
    const response = await api.post(`/projects/${projectId}/toggle-like`);
    return response.data;
  },

  // Add comment to project
  addComment: async (projectId, commentData) => {
    const response = await api.post(`/projects/${projectId}/comments`, commentData);
    return response.data;
  }
};

// User API calls
export const userAPI = {
  // Get all users (using search endpoint without keyword for all users)
  getAll: async (params = {}) => {
    // Use search endpoint without keyword to get all users
    const response = await api.get('/search/users', { params });
    return response.data;
  },

  // Get user by ID (using search with specific user_id if available, or fetch from user list)
  getById: async (id) => {
    try {
      // Try to get user from authenticated profile endpoint if it's the current user
      const response = await api.get('/user/profile', { skipAuthRedirect: true });
      if (response.data && response.data.id == id) {
        return response.data;
      }
    } catch (error) {
      // Not the current user, continue
    }
    
    // Fallback: search for users and find the one with matching ID
    // This is not ideal but works with the available endpoints
    const searchResponse = await api.get('/search/users', { params: { per_page: 100 } });
    if (searchResponse.data && searchResponse.data.data) {
      const user = searchResponse.data.data.find(u => u.id == id);
      if (user) {
        return { data: user };
      }
    }
    
    // If user not found, return a basic user object
    return {
      data: {
        id: id,
        name: `User ${id}`,
        profile_picture: null,
        bio: null
      }
    };
  },

  // Search users
  search: async (params = {}) => {
    const response = await api.get('/search/users', { params });
    return response.data;
  },

  // Follow/unfollow user
  toggleFollow: async (userId) => {
    const response = await api.post(`/users/${userId}/toggle-follow`);
    return response.data;
  }
};

// Comment API calls
export const commentAPI = {
  // Delete comment
  delete: async (commentId) => {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  }
};

// Discovery API calls
export const discoveryAPI = {
  // Get categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get tags
  getTags: async () => {
    const response = await api.get('/tags');
    return response.data;
  },

  // Get projects by category
  getProjectsByCategory: async (categorySlug) => {
    const response = await api.get(`/categories/${categorySlug}/projects`);
    return response.data;
  },

  // Get projects by tag
  getProjectsByTag: async (tagSlug) => {
    const response = await api.get(`/tags/${tagSlug}/projects`);
    return response.data;
  }
};

// Admin API calls
export const adminAPI = {
  // Get dashboard stats
  getDashboard: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  // Get all users for admin
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },

  // Update user
  updateUser: async (userId, userData) => {
    const response = await api.post(`/admin/users/${userId}/update`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // Get all projects for admin
  getProjects: async (params = {}) => {
    const response = await api.get('/admin/projects', { params });
    return response.data;
  },

  // Update project
  updateProject: async (projectId, projectData) => {
    const response = await api.post(`/admin/projects/${projectId}/update`, projectData);
    return response.data;
  },

  // Delete project
  deleteProject: async (projectId) => {
    const response = await api.delete(`/admin/projects/${projectId}`);
    return response.data;
  },

  // Get all comments for admin
  getComments: async (params = {}) => {
    const response = await api.get('/admin/comments', { params });
    return response.data;
  },

  // Delete comment
  deleteComment: async (commentId) => {
    const response = await api.delete(`/admin/comments/${commentId}`);
    return response.data;
  },

  // Categories management
  getCategories: async (params = {}) => {
    const response = await api.get('/admin/categories', { params });
    return response.data;
  },

  createCategory: async (categoryData) => {
    const response = await api.post('/admin/categories', categoryData);
    return response.data;
  },

  updateCategory: async (categoryId, categoryData) => {
    const response = await api.post(`/admin/categories/${categoryId}/update`, categoryData);
    return response.data;
  },

  deleteCategory: async (categoryId) => {
    const response = await api.delete(`/admin/categories/${categoryId}`);
    return response.data;
  },

  // Tags management
  getTags: async (params = {}) => {
    const response = await api.get('/admin/tags', { params });
    return response.data;
  },

  createTag: async (tagData) => {
    const response = await api.post('/admin/tags', tagData);
    return response.data;
  },

  updateTag: async (tagId, tagData) => {
    const response = await api.post(`/admin/tags/${tagId}/update`, tagData);
    return response.data;
  },

  deleteTag: async (tagId) => {
    const response = await api.delete(`/admin/tags/${tagId}`);
    return response.data;
  },

  // Contact messages
  getContactMessages: async (params = {}) => {
    const response = await api.get('/admin/contact-messages', { params });
    return response.data;
  },

  deleteContactMessage: async (messageId) => {
    const response = await api.delete(`/admin/contact-messages/${messageId}`);
    return response.data;
  },

  // Reports management
  getReports: async (params = {}) => {
    const response = await api.get('/admin/reports', { params });
    return response.data;
  },

  acceptReport: async (reportId, banData) => {
    const response = await api.post(`/admin/reports/${reportId}/accept`, banData);
    return response.data;
  },

  rejectReport: async (reportId) => {
    const response = await api.post(`/admin/reports/${reportId}/reject`);
    return response.data;
  }
};

// Contact API calls
export const contactAPI = {
  // Submit contact message
  submit: async (messageData) => {
    const response = await api.post('/contact', messageData);
    return response.data;
  },
  // Get contact messages (admin only)
  getMessages: async (params = {}) => {
    const response = await api.get('/admin/contact-messages', { params });
    return response.data;
  }
};

// Keep portfolioAPI for backward compatibility (alias to projectAPI)
export const portfolioAPI = projectAPI;

// Notifications API - Note: Backend endpoints need to be implemented
// export const notificationAPI = {
//   // Get user notifications
//   getAll: async () => {
//     const response = await api.get('/notifications');
//     return response.data;
//   },

//   // Mark notification as read
//   markAsRead: async (notificationId) => {
//     const response = await api.put(`/notifications/${notificationId}/read`);
//     return response.data;
//   },

//   // Mark all notifications as read
//   markAllAsRead: async () => {
//     const response = await api.put('/notifications/read-all');
//     return response.data;
//   }
// };

// Export the configured axios instance for custom calls
export default api;
// Chat API calls
// export const chatAPI = {
//   // Get conversations
//   getConversations: async () => {
//     const response = await api.get('/conversations');
//     return response.data;
//   },

//   // Get messages for conversation
//   getMessages: async (conversationId) => {
//     const response = await api.get(`/conversations/${conversationId}/messages`);
//     return response.data;
//   },

//   // Send message
//   sendMessage: async (conversationId, messageData) => {
//     const response = await api.post(`/conversations/${conversationId}/messages`, messageData);
//     return response.data;
//   },

//   // Start new conversation
//   startConversation: async (userId) => {
//     const response = await api.post('/conversations', { user_id: userId });
//     return response.data;
//   }
// };

// Report API calls
export const reportAPI = {
  // Submit report
  submit: async (reportData) => {
    const response = await api.post('/reports', reportData);
    return response.data;
  }
};
