import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { scholarshipAPI } from '../services/api.js';

const emptyForm = {
  name: '',
  month: '',
  description: '',
  image: '',
  status: 'Active',
};

const AchievementsManager = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    try {
      const result = await scholarshipAPI.getAll();
      setScholarships(result.scholarships || []);
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setImageFile(null);
      return;
    }
    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Please select a JPG, PNG, or WEBP image.');
      e.target.value = '';
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert('Image must be smaller than 2 MB.');
      e.target.value = '';
      return;
    }
    setImageFile(file);
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setImageFile(null);
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        payload.append(key, value);
      }
    });

    if (imageFile) {
      payload.append('image', imageFile);
    }

    try {
      if (editingId) {
        await scholarshipAPI.update(editingId, payload, true);
        alert('Scholarship updated!');
      } else {
        await scholarshipAPI.create(payload, true);
        alert('Scholarship created!');
      }
      resetForm();
      fetchScholarships();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this scholarship?')) {
      try {
        await scholarshipAPI.delete(id);
        alert('Scholarship deleted!');
        fetchScholarships();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-pink-600 to-pink-700 text-white px-8 py-6 shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">Scholarship Management</h1>
        <Link to="/admin/dashboard" className="bg-white text-pink-600 px-4 py-2 rounded-lg font-semibold">
          Dashboard
        </Link>
      </div>

      <div className="p-8">
        <button
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setEditingId(null);
              setImageFile(null);
              setShowForm(true);
            }
          }}
          className="bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition mb-6"
        >
          {showForm ? 'Cancel' : '+ Add New Scholarship'}
        </button>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Scholarship' : 'Add New Scholarship'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Recipient Name *"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                required
              />
              <input
                type="text"
                name="month"
                placeholder="Month *"
                value={formData.month}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                required
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              <button
                type="submit"
                className="md:col-span-2 bg-pink-600 text-white font-semibold py-3 rounded-lg hover:bg-pink-700 transition"
              >
                {editingId ? 'Update Scholarship' : 'Create Scholarship'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : scholarships.length === 0 ? (
          <p className="text-gray-600">No scholarships found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {scholarships.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-lg p-6">
                {item.image && (
                  <img src={item.image.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} alt={item.name} className="w-full h-40 object-cover rounded-lg mb-4" />
                )}
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-sm mb-1"><strong>Month:</strong> {item.month}</p>
                <p className="text-sm mb-1"><strong>Status:</strong> {item.status}</p>
                <p className="text-gray-600 text-sm mb-4">{item.description || 'No description provided.'}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setFormData({
                        name: item.name,
                        month: item.month,
                        description: item.description || '',
                        image: item.image || '',
                        status: item.status || 'Active',
                      });
                      setEditingId(item._id);
                      setShowForm(true);
                    }}
                    className="flex-1 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsManager;
