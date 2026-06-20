import React from 'react';
import { Link } from 'react-router-dom';

/**
 * 404 Not Found fallback page view.
 */
export const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-dark-bg text-white text-center relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="space-y-4 relative z-10 animate-fade-in">
        <div className="text-6xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-violet-500 bg-clip-text text-transparent select-none">
          404
        </div>
        <h1 className="text-2xl font-bold text-gray-200">
          404 - Page Not Found
        </h1>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          The page you are looking for does not exist, has been removed, or is temporarily unavailable.
        </p>
        
        <div className="pt-6">
          <Link
            to="/"
            className="px-6 py-3 bg-indigo-650 hover:bg-indigo-600 active:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-md transition duration-150 cursor-pointer inline-block"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
