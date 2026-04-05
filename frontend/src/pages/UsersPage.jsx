import { useState } from 'react';
import useUsers from '../hooks/useUsers';
import LoadingSpinner from '../components/LoadingSpinner';

/**
 * Users page — demonstrates full CRUD via the User Service API.
 */
export default function UsersPage() {
  const { users, loading, error, createUser, deleteUser, refresh } = useUsers();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    username: '', email: '', password: '', firstName: '', lastName: '',
  });
  const [formError, setFormError] = useState(null);

  const handleCreate = async (e) => {
    e.preventDefault();
    setFormError(null);
    try {
      await createUser(form);
      setForm({ username: '', email: '', password: '', firstName: '', lastName: '' });
      setShowForm(false);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create user');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete user');
      }
    }
  };

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-1">Manage users via the User Service API</p>
        </div>
        <div className="flex gap-3">
          <button onClick={refresh} className="btn-secondary text-sm px-4 py-2">
            ↻ Refresh
          </button>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary text-sm px-4 py-2">
            {showForm ? '✕ Cancel' : '+ Add User'}
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="card animate-fade-in-up">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Create New User</h2>

          {formError && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 text-red-700 text-sm border border-red-200">
              {formError}
            </div>
          )}

          <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              className="input-field"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              className="input-field"
              placeholder="First Name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              required
            />
            <input
              className="input-field"
              placeholder="Last Name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              required
            />
            <input
              className="input-field"
              type="password"
              placeholder="Password (min 6 chars)"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              minLength={6}
            />
            <button type="submit" className="btn-primary">
              Create User
            </button>
          </form>
        </div>
      )}

      {/* Loading / Error */}
      {loading && <LoadingSpinner message="Fetching users..." />}

      {error && (
        <div className="card bg-red-50 border-red-200 text-red-700">
          <p className="font-medium">Error loading users</p>
          <p className="text-sm mt-1">{error}</p>
          <button onClick={refresh} className="mt-3 text-sm font-medium text-red-700 hover:text-red-800 underline">
            Try again
          </button>
        </div>
      )}

      {/* Users Table */}
      {!loading && !error && (
        <div className="card p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No users found. Create one to get started.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-500 font-mono">#{user.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                            {user.firstName?.[0]}{user.lastName?.[0]}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                            <p className="text-xs text-gray-500">@{user.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.status === 'ACTIVE'
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            user.status === 'ACTIVE' ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
