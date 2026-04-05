import { useState, useEffect, useCallback } from 'react';
import userService from '../services/userService';

/**
 * Custom hook for managing user data.
 * Provides users list, CRUD operations, loading/error state.
 */
export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await userService.getAll();
      setUsers(response.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const createUser = async (userData) => {
    const response = await userService.create(userData);
    // Refresh the list after creating
    await fetchUsers();
    return response.data;
  };

  const deleteUser = async (id) => {
    await userService.delete(id);
    // Refresh the list after deleting
    await fetchUsers();
  };

  return {
    users,
    loading,
    error,
    createUser,
    deleteUser,
    refresh: fetchUsers,
  };
}
