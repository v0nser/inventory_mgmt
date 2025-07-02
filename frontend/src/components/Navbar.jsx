import { useNavigate } from 'react-router-dom';

export default function Navbar({ role, onLogout }) {
  const navigate = useNavigate();
  return (
    <nav className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/dashboard')}>
        <span className="font-bold text-xl tracking-wide">InventoryMgmt</span>
      </div>
      <div className="flex items-center gap-4">
        {role && <span className="bg-blue-800 px-2 py-1 rounded text-xs uppercase">{role}</span>}
        <button onClick={onLogout} className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition">Logout</button>
      </div>
    </nav>
  );
} 