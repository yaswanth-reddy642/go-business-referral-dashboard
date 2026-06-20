import React from 'react';

/**
 * Reusable Loader component supporting spinners and skeleton animations.
 * @param {Object} props
 * @param {'spinner'|'card'|'table'|'details'} [props.type] - The style representation of the loader
 * @param {number} [props.count] - Number of skeleton items to render
 */
export const Loader = ({ type = 'spinner', count = 3 }) => {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {Array.from({ length: count }).map((_, idx) => (
          <div 
            key={idx} 
            className="bg-gray-900/60 border border-gray-800 rounded-2xl p-6 animate-pulse"
          >
            <div className="h-4 bg-gray-800 rounded-lg w-1/3 mb-4"></div>
            <div className="h-8 bg-gray-800 rounded-lg w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="w-full bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden animate-pulse">
        <div className="h-12 bg-gray-900/80 border-b border-gray-850 flex items-center px-6">
          <div className="h-4 bg-gray-800 rounded w-1/12"></div>
        </div>
        {Array.from({ length: count }).map((_, idx) => (
          <div key={idx} className="flex justify-between items-center px-6 py-4 border-b border-gray-850">
            <div className="h-4 bg-gray-800 rounded w-1/4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/6"></div>
            <div className="h-4 bg-gray-800 rounded w-1/6"></div>
            <div className="h-4 bg-gray-800 rounded w-1/12"></div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'details') {
    return (
      <div className="max-w-2xl mx-auto bg-gray-900/60 border border-gray-800 rounded-2xl p-8 animate-pulse space-y-6">
        <div className="h-8 bg-gray-800 rounded-lg w-1/3"></div>
        <div className="h-6 bg-gray-800 rounded-lg w-1/4"></div>
        <hr className="border-gray-800" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            <div className="h-6 bg-gray-800 rounded w-3/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            <div className="h-6 bg-gray-800 rounded w-3/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            <div className="h-6 bg-gray-800 rounded w-3/4"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
            <div className="h-6 bg-gray-800 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-400 text-sm font-medium tracking-wide">Loading content...</p>
    </div>
  );
};

export default Loader;
