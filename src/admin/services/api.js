const API_URL = 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('adminToken');

const apiRequest = async (method, endpoint, data = null, isFormData = false) => {
  const headers = {};

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    if (isFormData) {
      config.body = data;
    } else {
      headers['Content-Type'] = 'application/json';
      config.body = JSON.stringify(data);
    }
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

// Admin Services
export const adminAPI = {
  register: (data) => apiRequest('POST', '/admin/register', data),
  login: (data) => apiRequest('POST', '/admin/login', data),
  getCurrentAdmin: () => apiRequest('GET', '/admin/me'),
};

// Course Services
export const courseAPI = {
  getAll: () => apiRequest('GET', '/courses'),
  getById: (id) => apiRequest('GET', `/courses/${id}`),
  create: (data, isFormData = false) => apiRequest('POST', '/courses', data, isFormData),
  update: (id, data, isFormData = false) => apiRequest('PUT', `/courses/${id}`, data, isFormData),
  delete: (id) => apiRequest('DELETE', `/courses/${id}`),
};

// Event Services
export const eventAPI = {
  getAll: () => apiRequest('GET', '/events'),
  getById: (id) => apiRequest('GET', `/events/${id}`),
  create: (data, isFormData = false) => apiRequest('POST', '/events', data, isFormData),
  update: (id, data, isFormData = false) => apiRequest('PUT', `/events/${id}`, data, isFormData),
  delete: (id) => apiRequest('DELETE', `/events/${id}`),
};

// Student Services
export const studentAPI = {
  getAll: () => apiRequest('GET', '/students'),
  getById: (id) => apiRequest('GET', `/students/${id}`),
  create: (data, isFormData = false) => apiRequest('POST', '/students', data, isFormData),
  update: (id, data, isFormData = false) => apiRequest('PUT', `/students/${id}`, data, isFormData),
  delete: (id) => apiRequest('DELETE', `/students/${id}`),
};

// Teacher Services
export const teacherAPI = {
  getAll: () => apiRequest('GET', '/teachers'),
  getById: (id) => apiRequest('GET', `/teachers/${id}`),
  create: (data, isFormData = false) => apiRequest('POST', '/teachers', data, isFormData),
  update: (id, data, isFormData = false) => apiRequest('PUT', `/teachers/${id}`, data, isFormData),
  delete: (id) => apiRequest('DELETE', `/teachers/${id}`),
};

// Achievement Services
export const achievementAPI = {
  getAll: () => apiRequest('GET', '/achievements'),
  getById: (id) => apiRequest('GET', `/achievements/${id}`),
  create: (data) => apiRequest('POST', '/achievements', data),
  update: (id, data) => apiRequest('PUT', `/achievements/${id}`, data),
  delete: (id) => apiRequest('DELETE', `/achievements/${id}`),
};

export const scholarshipAPI = {
  getAll: () => apiRequest('GET', '/scholarships'),
  getById: (id) => apiRequest('GET', `/scholarships/${id}`),
  create: (data, isFormData = false) => apiRequest('POST', '/scholarships', data, isFormData),
  update: (id, data, isFormData = false) => apiRequest('PUT', `/scholarships/${id}`, data, isFormData),
  delete: (id) => apiRequest('DELETE', `/scholarships/${id}`),
};

// Message Services
export const messageAPI = {
  getAll: () => apiRequest('GET', '/messages'),
  getById: (id) => apiRequest('GET', `/messages/${id}`),
  create: (data) => apiRequest('POST', '/messages', data),
  update: (id, data) => apiRequest('PUT', `/messages/${id}`, data),
  delete: (id) => apiRequest('DELETE', `/messages/${id}`),
};

// Enrollment Services
export const enrollmentAPI = {
  getAll: () => apiRequest('GET', '/enrollments'),
  getById: (id) => apiRequest('GET', `/enrollments/${id}`),
  create: (data) => apiRequest('POST', '/enrollments', data),
  update: (id, data) => apiRequest('PUT', `/enrollments/${id}`, data),
  delete: (id) => apiRequest('DELETE', `/enrollments/${id}`),
};

// Dashboard Services
export const dashboardAPI = {
  getStats: () => apiRequest('GET', '/dashboard/stats'),
  getRecentActivities: () => apiRequest('GET', '/dashboard/recent'),
};
