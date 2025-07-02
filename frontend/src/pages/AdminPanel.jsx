import { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function AdminPanel() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', quantity: '', description: '' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchItems = async () => {
    try {
      const res = await api.get('/api/items', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(res.data);
    } catch (err) {
      setError('Failed to fetch items');
    }
  };

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editId) {
        await api.put(`/api/items/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await api.post('/api/items', form, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setForm({ name: '', quantity: '', description: '' });
      setEditId(null);
      fetchItems();
    } catch (err) {
      setError('Failed to save item');
    }
  };

  const handleEdit = item => {
    setForm({ name: item.name, quantity: item.quantity, description: item.description });
    setEditId(item._id);
  };

  const handleDelete = async id => {
    try {
      await api.delete(`/api/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchItems();
    } catch (err) {
      setError('Failed to delete item');
    }
  };

  const handleCancel = () => {
    setForm({ name: '', quantity: '', description: '' });
    setEditId(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col">
      <Navbar role="admin" onLogout={handleLogout} />
      <div className="flex-1 flex flex-col justify-center items-center py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-4 w-full max-w-5xl mx-auto px-2">
          <h1 className="text-3xl font-bold text-blue-700">Admin Panel</h1>
          <button onClick={() => navigate('/dashboard')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Back to Dashboard</button>
        </div>
        <p className="text-center text-gray-500 mb-6 w-full max-w-5xl mx-auto">Admins can add, edit, or remove inventory items. Use this panel to keep your inventory up to date.</p>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="bg-white rounded-xl shadow p-6 mb-8 w-full max-w-5xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">{editId ? 'Edit Item' : 'Add Item'}</h2>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row md:items-end gap-4 flex-wrap">
            <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="flex-1 min-w-[120px] p-3 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500" required />
            <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" type="number" className="flex-1 min-w-[120px] p-3 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500" required />
            <input name="description" value={form.description} onChange={handleChange} placeholder="Description" className="flex-1 min-w-[120px] p-3 bg-gray-100 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 placeholder-gray-500" />
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">{editId ? 'Update' : 'Add'}</button>
              {editId && <button type="button" onClick={handleCancel} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>}
            </div>
          </form>
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full max-w-5xl mx-auto px-2">
          {items.map(item => (
            <div key={item._id} className="bg-white rounded-xl shadow p-5 flex flex-col gap-2">
              <div className="font-semibold text-lg text-blue-800">{item.name}</div>
              <div className="text-gray-700">Qty: <span className="font-bold">{item.quantity}</span></div>
              <div className="text-gray-500 text-sm">{item.description}</div>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEdit(item)} className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
              </div>
            </div>
          ))}
        </div>
        {items.length === 0 && <div className="mt-8 text-center text-gray-600">No items found.</div>}
      </div>
    </div>
  );
} 