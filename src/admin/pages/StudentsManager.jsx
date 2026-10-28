import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { studentAPI, courseAPI } from '../services/api.js';

const StudentsManager = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    photo: '',
    address: '',
    parentContact: '',
    status: 'Active',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsRes, coursesRes] = await Promise.all([
        studentAPI.getAll(),
        courseAPI.getAll(),
      ]);
      setStudents(studentsRes.students);
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
    ['name', 'email', 'phone', 'course', 'address', 'parentContact', 'status'].forEach((key) => {
      const value = formData[key];
      if (value !== null && value !== undefined && value !== '') {
        payload.append(key, value);
      }
    });

    if (imageFile) {
      payload.append('image', imageFile);
    }

    try {
      if (editingId) {
        await studentAPI.update(editingId, payload, true);
        alert('Student updated!');
      } else {
        await studentAPI.create(payload, true);
        alert('Student created!');
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
      course: '',
      photo: '',
      address: '',
      parentContact: '',
      status: 'Active',
    });
    setImageFile(null);
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this student?')) {
      try {
        await studentAPI.delete(id);
        alert('Student deleted!');
        fetchData();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  const handleStatusToggle = async (student) => {
    try {
      await studentAPI.update(student._id, { status: student.status === 'Active' ? 'Inactive' : 'Active' });
      alert(`Student ${student.status === 'Active' ? 'deactivated' : 'activated'}!`);
      fetchData();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const visibleStudents = students.filter((student) => {
    const query = searchTerm.toLowerCase();
    return !query || [student.name, student.email, student.phone].some((value) => value?.toLowerCase().includes(query));
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-6 shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">Students Management</h1>
        <Link to="/admin/dashboard" className="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold">
          Dashboard
        </Link>
      </div>

      <div className="p-8">
        <input
          type="search"
          placeholder="Search students"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
        />
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
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition mb-6"
        >
          {showForm ? 'Cancel' : '+ Add New Student'}
        </button>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Student' : 'Add New Student'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Student Name *"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              />
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                required
              >
                <option value="">Select Course *</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Student Image</label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                />
              </div>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option>Active</option>
                <option>Inactive</option>
                <option>Graduated</option>
              </select>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <input
                type="tel"
                name="parentContact"
                placeholder="Parent Contact"
                value={formData.parentContact}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
              />
              <button
                type="submit"
                className="md:col-span-2 bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
              >
                {editingId ? 'Update Student' : 'Create Student'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : students.length === 0 ? (
          <p className="text-gray-600">No students found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="w-full">
              <thead className="bg-green-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Name</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Phone</th>
                  <th className="px-6 py-3 text-left">Course</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleStudents.map((student) => (
                  <tr key={student._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <div className="flex items-center gap-3">
                        {student.profilePicture && (
                          <img src={student.profilePicture.startsWith('http') ? student.profilePicture : `http://localhost:5000${student.profilePicture}`} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                        )}
                        <span>{student.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">{student.email}</td>
                    <td className="px-6 py-3">{student.phone}</td>
                    <td className="px-6 py-3">{student.course?.title || 'N/A'}</td>
                    <td className="px-6 py-3">{student.status}</td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => {
                          setFormData({
                            name: student.name || '',
                            email: student.email || '',
                            phone: student.phone || '',
                            course: student.course?._id || student.course || '',
                            photo: student.photo || '',
                            address: student.address || '',
                            parentContact: student.parentContact || '',
                            status: student.status || 'Active',
                          });
                          setEditingId(student._id);
                          setShowForm(true);
                        }}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleStatusToggle(student)}
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 ml-2"
                      >
                        {student.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsManager;
