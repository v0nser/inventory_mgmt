import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      await api.post('/api/auth/register', { username, password, role });
      setSuccess('Registration successful!');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center text-blue-700">Register</h2>
        <p className="text-center text-gray-500 mb-6">Create an account to start managing your inventory and tracking your stock.</p>
        {error && <div className="text-red-500 mb-3 text-center">{error}</div>}
        {success && <div className="text-green-500 mb-3 text-center">{success}</div>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 p-3 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-4 p-3 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500"
          required
        />
        <select
          value={role}
          onChange={e => setRole(e.target.value)}
          className="w-full mb-4 p-3 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex items-center justify-center">
          {loading ? <span className="loader mr-2"></span> : null}
          {loading ? 'Registering...' : 'Register'}
        </button>
        <div className="mt-4 text-center">
          <a href="/login" className="text-blue-600 hover:underline">Already have an account?</a>
        </div>
      </form>
      <style>{`.loader{border:2px solid #f3f3f3;border-top:2px solid #3498db;border-radius:50%;width:16px;height:16px;animation:spin 1s linear infinite;}@keyframes spin{0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}`}</style>
    </div>
  );
} 