import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { dashboardAPI } from '../services/api.js';

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const result = await dashboardAPI.getStats();
      setStats(result.stats);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const StatCard = ({ icon, title, value, color }) => (
    <div className={`${color} rounded-lg shadow-lg p-6 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white opacity-80 text-sm font-semibold mb-2">{title}</p>
          <p className="text-4xl font-bold">{value || 0}</p>
        </div>
        <div className="text-5xl opacity-20">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-8 py-6 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Noor Academy</h1>
            <p className="text-cyan-100">Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="font-semibold">{admin?.name}</p>
              <p className="text-sm text-cyan-100">{admin?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-6 mb-8">
          <StatCard icon="📚" title="Total Courses" value={stats?.totalCourses} color="bg-blue-500" />
          <StatCard icon="👨‍🎓" title="Total Students" value={stats?.totalStudents} color="bg-green-500" />
          <StatCard icon="👨‍🏫" title="Total Teachers" value={stats?.totalTeachers} color="bg-purple-500" />
          <StatCard icon="📅" title="Total Events" value={stats?.totalEvents} color="bg-yellow-500" />
          <StatCard icon="🏆" title="Scholarships" value={stats?.totalScholarships} color="bg-pink-500" />
          <StatCard icon="✉️" title="Messages" value={stats?.totalMessages} color="bg-slate-500" />
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Management Panels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link to="/admin/courses" className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Courses</h3>
            <p className="text-gray-600 mb-4">Add, edit, and manage courses</p>
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition font-semibold">Manage</button>
          </Link>

          <Link to="/admin/events" className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 text-center">
            <div className="text-5xl mb-4">📅</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Events</h3>
            <p className="text-gray-600 mb-4">Create and manage academy events</p>
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition font-semibold">Manage</button>
          </Link>

          <Link to="/admin/students" className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 text-center">
            <div className="text-5xl mb-4">👨‍🎓</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Students</h3>
            <p className="text-gray-600 mb-4">Manage student records and enrollment</p>
            <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition font-semibold">Manage</button>
          </Link>

          <Link to="/admin/teachers" className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 text-center">
            <div className="text-5xl mb-4">👨‍🏫</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Teachers</h3>
            <p className="text-gray-600 mb-4">Add and manage teacher profiles</p>
            <button className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition font-semibold">Manage</button>
          </Link>

          <Link to="/admin/scholarships" className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Scholarships</h3>
            <p className="text-gray-600 mb-4">Manage scholarship recipients and updates</p>
            <button className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition font-semibold">Manage</button>
          </Link>

          <Link to="/" className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 text-center">
            <div className="text-5xl mb-4">🌐</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Website</h3>
            <p className="text-gray-600 mb-4">Visit the main website</p>
            <button className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition font-semibold">Visit</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
