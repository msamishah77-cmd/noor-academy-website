import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventAPI } from '../services/api.js';

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    capacity: 100,
    image: '',
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const result = await eventAPI.getAll();
      setEvents(result.events);
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
        await eventAPI.update(editingId, payload, true);
        alert('Event updated!');
      } else {
        await eventAPI.create(payload, true);
        alert('Event created!');
      }
      resetForm();
      fetchEvents();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
      location: '',
      capacity: 100,
      image: '',
    });
    setImageFile(null);
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this event?')) {
      try {
        await eventAPI.delete(id);
        alert('Event deleted!');
        fetchEvents();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white px-8 py-6 shadow-lg flex justify-between items-center">
        <h1 className="text-3xl font-bold">Events Management</h1>
        <Link to="/admin/dashboard" className="bg-white text-yellow-600 px-4 py-2 rounded-lg font-semibold">
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
          className="bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition mb-6"
        >
          {showForm ? 'Cancel' : '+ Add New Event'}
        </button>

        {showForm && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">{editingId ? 'Edit Event' : 'Add New Event'}</h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="title"
                placeholder="Event Title *"
                value={formData.title}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
              <input
                type="text"
                name="location"
                placeholder="Location *"
                value={formData.location}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
              <input
                type="number"
                name="capacity"
                placeholder="Capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-semibold mb-2">Event Image</label>
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                />
              </div>
              <textarea
                name="description"
                placeholder="Description *"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600"
                required
              />
              <button
                type="submit"
                className="md:col-span-2 bg-yellow-600 text-white font-semibold py-3 rounded-lg hover:bg-yellow-700 transition"
              >
                {editingId ? 'Update Event' : 'Create Event'}
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <p>Loading...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-600">No events found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event) => (
              <div key={event._id} className="bg-white rounded-lg shadow-lg p-6">
                {event.image && <img src={event.image.startsWith('http') ? event.image : `http://localhost:5000${event.image}`} alt={event.title} className="w-full h-40 object-cover rounded-lg mb-4" />}
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-2">{event.description.substring(0, 80)}...</p>
                <p className="text-sm mb-1"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p className="text-sm mb-1"><strong>Time:</strong> {event.time}</p>
                <p className="text-sm mb-1"><strong>Location:</strong> {event.location}</p>
                <p className="text-sm mb-4"><strong>Capacity:</strong> {event.capacity}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setFormData({
                        title: event.title || '',
                        description: event.description || '',
                        date: event.date ? new Date(event.date).toISOString().slice(0, 10) : '',
                        time: event.time || '',
                        location: event.location || '',
                        capacity: event.capacity || 100,
                        image: event.image || '',
                      });
                      setEditingId(event._id);
                      setShowForm(true);
                    }}
                    className="flex-1 bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 font-semibold"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
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

export default EventsManager;
