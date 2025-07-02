import { useEffect, useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Dashboard({ role }) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await api.get('/api/items', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setItems(res.data);
      } catch (err) {
        setError('Failed to fetch items');
      }
    };
    fetchItems();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col">
      <Navbar role={role} onLogout={handleLogout} />
      <div className="flex-1 flex flex-col justify-center items-center py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-2 gap-4 w-full max-w-5xl mx-auto px-2">
          <h1 className="text-3xl font-bold text-blue-700">Inventory Dashboard</h1>
          {role === 'admin' && (
            <button onClick={() => navigate('/admin')} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Admin Panel</button>
          )}
        </div>
        <p className="text-center text-gray-500 mb-6 w-full max-w-5xl mx-auto">View all items in your inventory below. Keep track of stock levels and item details.</p>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full max-w-5xl mx-auto px-2">
          {items.map(item => (
            <div key={item._id} className="bg-white rounded-xl shadow p-5 flex flex-col gap-2">
              <div className="font-semibold text-lg text-blue-800">{item.name}</div>
              <div className="text-gray-700">Qty: <span className="font-bold">{item.quantity}</span></div>
              <div className="text-gray-500 text-sm">{item.description}</div>
            </div>
          ))}
        </div>
        {items.length === 0 && <div className="mt-8 text-center text-gray-600">No items found.</div>}
      </div>
    </div>
  );
} 