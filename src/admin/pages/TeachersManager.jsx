import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { teacherAPI, courseAPI } from '../services/api.js';

const TeachersManager = () => {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    photo: '',
    qualification: '',
    specialization: '',
    experience: '',
    courses: [],
    address: '',
    status: 'Active',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [teachersRes, coursesRes] = await Promise.all([
        teacherAPI.getAll(),
        courseAPI.getAll(),
      ]);
      setTeachers(teachersRes.teachers);
      setCourses(coursesRes.courses);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    ['name', 'email', 'phone', 'qualification', 'specialization', 'experience', 'address', 'status'].forEach((key) => {
      const value = formData[key];
      if (value !== null && value !== undefined && value !== '') {
        payload.append(key, value);
      }
    });

    (formData.courses || []).forEach((course) => {
      payload.append('courses', course?._id || course);
    });

    if (imageFile) {
      payload.append('image', imageFile);
    }

    try {
      if (editingId) {
        await teacherAPI.update(editingId, payload, true);
        alert('Teacher updated!');
      } else {
        await teacherAPI.create(payload, true);
        alert('Teacher created!');
      }
      resetForm();
      fetchData();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      photo: '',
      qualification: '',
      specialization: '',
      experience: '',
      courses: [],
      address: '',
      status: 'Active',
    });
    setImageFile(null);
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this teacher?')) {
      try {
        await teacherAPI.delete(id);
        alert('Teacher deleted!');
        fetchData();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  const handleStatusToggle = async (teacher) => {
    try {
      await teacherAPI.update(teacher._id, { status: teacher.status === 'Active' ? 'Inactive' : 'Active' });
      alert(`Teacher ${teacher.status === 'Active' ? 'deactivated' : 'activated'}!`);
      fetchData();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-6 shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">Teachers Management</h1>
        <Link to="/admin/dashboard" className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold">
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
          className="bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition mb-6"
        >
          {showForm ? 'Cancel' : '+ Add New Teacher'}
        </button>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Teacher' : 'Add New Teacher'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Teacher Name *"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <input
                type="text"
                name="qualification"
                placeholder="Qualification *"
                value={formData.qualification}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <input
                type="text"
                name="specialization"
                placeholder="Specialization *"
                value={formData.specialization}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <input
                type="number"
                name="experience"
                placeholder="Years of Experience *"
                value={formData.experience}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Teacher Image</label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="submit"
                className="md:col-span-2 bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition"
              >
                {editingId ? 'Update Teacher' : 'Create Teacher'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : teachers.length === 0 ? (
          <p className="text-gray-600">No teachers found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <div key={teacher._id} className="bg-white rounded-lg shadow-lg p-6">
                {teacher.photo && <img src={teacher.photo.startsWith('http') ? teacher.photo : `http://localhost:5000${teacher.photo}`} alt={teacher.name} className="w-full h-40 object-cover rounded-lg mb-4" />}
                <h3 className="text-xl font-bold mb-2">{teacher.name}</h3>
                <p className="text-sm mb-1"><strong>Email:</strong> {teacher.email}</p>
                <p className="text-sm mb-1"><strong>Phone:</strong> {teacher.phone}</p>
                <p className="text-sm mb-1"><strong>Qualification:</strong> {teacher.qualification}</p>
                <p className="text-sm mb-1"><strong>Specialization:</strong> {teacher.specialization}</p>
                <p className="text-sm mb-4"><strong>Experience:</strong> {teacher.experience} years</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setFormData({
                        name: teacher.name || '',
                        email: teacher.email || '',
                        phone: teacher.phone || '',
                        photo: teacher.photo || '',
                        qualification: teacher.qualification || '',
                        specialization: teacher.specialization || '',
                        experience: teacher.experience || '',
                        courses: (teacher.courses || []).map((course) => course?._id || course),
                        address: teacher.address || '',
                        status: teacher.status || 'Active',
                      });
                      setEditingId(teacher._id);
                      setShowForm(true);
                    }}
                    className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(teacher._id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-semibold"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleStatusToggle(teacher)}
                    className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 font-semibold"
                  >
                    {teacher.status === 'Active' ? 'Deactivate' : 'Activate'}
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

export default TeachersManager;
