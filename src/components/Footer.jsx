import React from 'react';

/**
 * Footer component for the application.
 */
export const Footer = () => {
  return (
    <footer className="bg-gray-950/40 border-t border-gray-800/80 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-2">
            <span className="text-base font-semibold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              Go Business
            </span>
          </div>

          {/* Links */}
          <div className="flex space-x-8 text-sm text-gray-400">
            <a 
              href="#about" 
              className="hover:text-white hover:underline underline-offset-4 decoration-indigo-500 transition duration-150"
            >
              About
            </a>
            <a 
              href="#privacy" 
              className="hover:text-white hover:underline underline-offset-4 decoration-indigo-500 transition duration-150"
            >
              Privacy
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-500 sm:text-right">
            &copy; 2024 Go Business. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
