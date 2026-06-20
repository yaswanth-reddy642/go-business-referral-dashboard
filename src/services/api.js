import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = 'https://v9fes04dwf.execute-api.eu-north-1.amazonaws.com/api';

// Create configured Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to dynamically inject the JWT token from cookies
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('jwt_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Authentication service
 */
export const authService = {
  /**
   * Signs in user and returns response data
   * @param {string} email 
   * @param {string} password 
   */
  login: async (email, password) => {
    const response = await api.post('/auth/signin', { email, password });
    // Success response format: { data: { token: "<token>" } }
    // Or failure format: { message: "Invalid email or password" }
    return response.data;
  },
};

/**
 * Referrals service
 */
export const referralsService = {
  /**
   * Fetches referrals. Supports query params: search, sort, and id
   * @param {Object} queryParams
   * @param {string} [queryParams.search]
   * @param {string} [queryParams.sort]
   * @param {string|number} [queryParams.id]
   */
  getReferrals: async ({ search, sort, id } = {}) => {
    const params = {};
    if (search) {
      params.search = search;
      params.q = search; // Supporting both search and q parameters
    }
    if (sort) {
      params.sort = sort;
    }
    if (id !== undefined && id !== null) {
      params.id = id;
    }

    const response = await api.get('/referrals', { params });
    return response.data;
  },
};

export default api;
