// API Configuration
export const API_BASE_URL = 'http://localhost:5000';

export const API_ENDPOINTS = {
  auth: {
    worker: {
      signup: `${API_BASE_URL}/api/auth/worker/signup`,
      login: `${API_BASE_URL}/api/auth/worker/login`,
    },
    customer: {
      signup: `${API_BASE_URL}/api/auth/customer/signup`,
      login: `${API_BASE_URL}/api/auth/customer/login`,
    },
  },
  user: {
    profile: `${API_BASE_URL}/api/user/profile`,
  },
};

// Helper function to make authenticated requests
export const makeAuthenticatedRequest = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('authToken');
  
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });
};
