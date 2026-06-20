import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

/**
 * Navbar component for authenticated pages.
 */
export const Navbar = () => {
  const navigate = useNavigate();

  /**
   * Cleans authentication cookie and redirects to login.
   */
  const handleLogout = () => {
    Cookies.remove('jwt_token');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-gray-950/70 backdrop-blur-md border-b border-gray-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand & Home Link */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-600/30">
                G
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-500 bg-clip-text text-transparent tracking-tight">
                Go Business
              </span>
            </Link>
            <Link
              to="/"
              className="text-sm font-medium text-gray-300 hover:text-white hover:underline underline-offset-4 decoration-indigo-400 transition-all duration-150"
            >
              Home
            </Link>
          </div>

          {/* Logout Action */}
          <div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white bg-gray-900/80 hover:bg-gray-800 border border-gray-850 hover:border-gray-700 rounded-xl transition duration-150 shadow-sm cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
