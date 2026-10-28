import React from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const navLinks = [
  { to: 'dashboard', label: 'Dashboard', icon: '📊' },
  { to: 'courses', label: 'Courses', icon: '📚' },
  { to: 'events', label: 'Events', icon: '📅' },
  { to: 'students', label: 'Students', icon: '👨‍🎓' },
  { to: 'teachers', label: 'Teachers', icon: '👨‍🏫' },
  { to: 'scholarships', label: 'Scholarships', icon: '🏆' },
  { to: 'settings', label: 'Settings', icon: '⚙️' },
  { to: 'messages', label: 'Messages', icon: '✉️' },
  { to: 'enrollments', label: 'Enrollments', icon: '📝' },
];

const AdminLayout = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-full max-w-xs bg-slate-900 text-white flex flex-col">
        <div className="px-6 py-8 border-b border-slate-800">
          <div className="text-sm uppercase tracking-[0.3em] text-slate-400 mb-4">Admin Panel</div>
          <div className="space-y-1">
            <p className="text-xl font-semibold">{admin?.name || 'Admin'}</p>
            <p className="text-sm text-slate-400">{admin?.email || 'admin@example.com'}</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={`/admin/${link.to}`}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition font-semibold ${
                  isActive ? 'bg-slate-700 text-white' : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </NavLink>
          ))}

          <Link
            to="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-emerald-300 hover:bg-slate-800 hover:text-emerald-200 transition font-semibold"
          >
            <span>🏠</span>
            <span>View Website</span>
          </Link>
        </nav>

        <div className="px-6 py-6 border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-xl font-semibold transition"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6">
        <header className="mb-6 flex flex-col gap-4 rounded-xl bg-white px-6 py-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Noor Academy</p>
            <h1 className="text-2xl font-bold text-slate-900">Admin Panel</h1>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-600"
          >
            <span>🏠</span>
            <span>View Website</span>
          </Link>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
