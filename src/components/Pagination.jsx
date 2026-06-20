import React from 'react';

/**
 * Pagination component for client-side table navigation.
 * @param {Object} props
 * @param {number} props.totalItems - Total count of records
 * @param {number} [props.itemsPerPage] - Number of items displayed per page (defaults to 10)
 * @param {number} props.currentPage - Current active page (1-based index)
 * @param {Function} props.onPageChange - Callback function triggered on page selection
 */
export const Pagination = ({ totalItems, itemsPerPage = 10, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  /**
   * Action trigger for previous page index
   */
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  /**
   * Action trigger for next page index
   */
  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pages = Array.from({ length: totalPages }, (_, idx) => idx + 1);

  if (totalItems === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 bg-gray-900/30 border border-gray-850 p-4 rounded-2xl shadow-sm">
      {/* Informative Counter: Showing 1–10 of 50 entries */}
      <div className="text-sm text-gray-400">
        Showing <span className="font-semibold text-gray-200">{startIndex}</span>&ndash;
        <span className="font-semibold text-gray-200">{endIndex}</span> of{' '}
        <span className="font-semibold text-gray-200">{totalItems}</span> entries
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-1.5">
        {/* Previous Button */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 text-xs font-semibold bg-gray-950/60 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-950/60 disabled:border-gray-800 rounded-xl transition duration-150 cursor-pointer select-none"
        >
          Previous
        </button>

        {/* Page List Numbers */}
        <div className="flex items-center space-x-1">
          {pages.map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 flex items-center justify-center text-xs font-bold rounded-xl transition-all duration-150 cursor-pointer select-none ${
                currentPage === page
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-gray-950/60 border border-gray-800 hover:bg-gray-850 hover:border-gray-700 text-gray-400 hover:text-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-xs font-semibold bg-gray-950/60 hover:bg-gray-800 border border-gray-800 hover:border-gray-700 text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-950/60 disabled:border-gray-800 rounded-xl transition duration-150 cursor-pointer select-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
