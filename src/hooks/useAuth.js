import { useState } from 'react';
import Cookies from 'js-cookie';
import { authService } from '../services/api';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(() => Cookies.get('jwt_token') || null);

  /**
   * Performs login request and sets cookie on success
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<{success: boolean, error?: string}>}
   */
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(email, password);
      
      // Suppported token paths: response.data.token and response.token
      const jwtToken = response?.data?.token || response?.token;

      if (jwtToken) {
        // Store token in cookies
        Cookies.set('jwt_token', jwtToken);
        setToken(jwtToken);
        return { success: true };
      } else {
        const errorMsg = response?.message || 'Invalid email or password';
        setError(errorMsg);
        return { success: false, error: errorMsg };
      }
    } catch (err) {
      // Extract error message from API response or network error
      const errorMsg = 
        err.response?.data?.message || 
        err.response?.data?.error || 
        err.message || 
        'Connection error. Please try again.';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logs out user, removes cookie and resets state
   */
  const logout = () => {
    Cookies.remove('jwt_token');
    setToken(null);
  };

  return {
    login,
    logout,
    loading,
    error,
    token,
    isAuthenticated: !!token,
  };
};
export default useAuth;
