import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const SettingsManager = () => {
  const { admin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-8 py-6 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Admin Settings</h1>
          <p className="text-slate-300">Manage account details and app settings.</p>
        </div>
        <Link to="/admin/dashboard" className="bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold">
          Dashboard
        </Link>
      </div>

      <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Account Info</h2>
          <div className="space-y-3 text-gray-700">
            <p><strong>Name:</strong> {admin?.name}</p>
            <p><strong>Email:</strong> {admin?.email}</p>
            <p><strong>Role:</strong> Admin</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
              <p className="font-semibold">Secure admin access</p>
              <p className="text-sm text-slate-600">Keep your admin login private and do not share credentials.</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
              <p className="font-semibold">Course & enrollment sync</p>
              <p className="text-sm text-slate-600">Use the Courses and Enrollments panels to manage registration paths.</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200">
              <p className="font-semibold">Monitor messages</p>
              <p className="text-sm text-slate-600">Check the Messages panel for new contact requests.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsManager;
