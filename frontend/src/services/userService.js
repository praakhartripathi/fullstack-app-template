import api from './api';

/**
 * User service — CRUD API calls to the User Service backend.
 */
const userService = {
  /** Fetch all users */
  getAll: () => api.get('/api/v1/users'),

  /** Fetch a single user by ID */
  getById: (id) => api.get(`/api/v1/users/${id}`),

  /** Create a new user */
  create: (data) => api.post('/api/v1/users', data),

  /** Update an existing user */
  update: (id, data) => api.put(`/api/v1/users/${id}`, data),

  /** Delete a user */
  delete: (id) => api.delete(`/api/v1/users/${id}`),
};

export default userService;
