import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { enrollmentAPI, courseAPI } from '../services/api.js';

const EnrollmentsManager = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    email: '',
    phone: '',
    course: '',
    status: 'Pending',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [enrollmentsRes, coursesRes] = await Promise.all([
        enrollmentAPI.getAll(),
        courseAPI.getAll(),
      ]);
      setEnrollments(enrollmentsRes.enrollments);
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

  const resetForm = () => {
    setFormData({
      studentName: '',
      email: '',
      phone: '',
      course: '',
      status: 'Pending',
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await enrollmentAPI.update(editingId, formData);
        alert('Enrollment updated successfully!');
      } else {
        await enrollmentAPI.create(formData);
        alert('Enrollment created successfully!');
      }
      resetForm();
      fetchData();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this enrollment?')) {
      try {
        await enrollmentAPI.delete(id);
        fetchData();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-8 py-6 shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">Enrollments Management</h1>
        <Link to="/admin/dashboard" className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-semibold">
          Dashboard
        </Link>
      </div>

      <div className="p-8">
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingId(null);
            resetForm();
          }}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition mb-6"
        >
          {showForm ? 'Cancel' : '+ Add Enrollment'}
        </button>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Enrollment' : 'Create Enrollment'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="studentName"
                placeholder="Student Name *"
                value={formData.studentName}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email *"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone *"
                value={formData.phone}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              />
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                required
              >
                <option value="">Select Course *</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.title}
                  </option>
                ))}
              </select>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <button
                type="submit"
                className="md:col-span-2 bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition"
              >
                {editingId ? 'Update Enrollment' : 'Create Enrollment'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <p className="text-center text-gray-600">Loading enrollments...</p>
        ) : enrollments.length === 0 ? (
          <p className="text-gray-600">No enrollments found.</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
            <table className="w-full">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-3 text-left">Student</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Phone</th>
                  <th className="px-6 py-3 text-left">Course</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((enrollment) => (
                  <tr key={enrollment._id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-3">{enrollment.studentName}</td>
                    <td className="px-6 py-3">{enrollment.email}</td>
                    <td className="px-6 py-3">{enrollment.phone}</td>
                    <td className="px-6 py-3">{enrollment.course?.title || 'N/A'}</td>
                    <td className="px-6 py-3">{enrollment.status}</td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => {
                          setFormData({
                            studentName: enrollment.studentName,
                            email: enrollment.email,
                            phone: enrollment.phone,
                            course: enrollment.course?._id || '',
                            status: enrollment.status,
                          });
                          setEditingId(enrollment._id);
                          setShowForm(true);
                        }}
                        className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(enrollment._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
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

export default EnrollmentsManager;
