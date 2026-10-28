import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { messageAPI } from '../services/api.js';

const MessagesManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const result = await messageAPI.getAll();
      setMessages(result.messages);
    } catch (error) {
      alert('Error fetching messages: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      const message = messages.find((msg) => msg._id === id);
      await messageAPI.update(id, { isRead: !message.isRead });
      fetchMessages();
    } catch (error) {
      alert('Error updating message: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await messageAPI.delete(id);
        fetchMessages();
      } catch (error) {
        alert('Error deleting message: ' + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-slate-700 to-slate-900 text-white px-8 py-6 shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">Messages Management</h1>
        <Link to="/admin/dashboard" className="bg-white text-slate-900 px-4 py-2 rounded-lg font-semibold">
          Dashboard
        </Link>
      </div>

      <div className="p-8">
        {loading ? (
          <p className="text-center text-gray-600">Loading messages...</p>
        ) : messages.length === 0 ? (
          <p className="text-gray-600">No messages found.</p>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message._id} className="bg-white rounded-xl shadow p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900">{message.subject}</h2>
                    <p className="text-sm text-slate-500">{message.name} · {message.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleMarkRead(message._id)}
                      className={`px-4 py-2 rounded-lg font-semibold ${message.isRead ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-900'}`}
                    >
                      {message.isRead ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button
                      onClick={() => handleDelete(message._id)}
                      className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 mt-4">{message.message}</p>
                <p className="text-xs text-slate-400 mt-4">Received: {new Date(message.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesManager;
