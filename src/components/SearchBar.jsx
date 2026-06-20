import React, { useState, useEffect } from 'react';

/**
 * SearchBar component providing search input and sorting selection filters.
 * @param {Object} props
 * @param {Function} props.onSearchChange - Event handler called with debounced search query
 * @param {Function} props.onSortChange - Event handler called with sorting direction ('asc'|'desc')
 * @param {string} [props.defaultSort] - Default sorting parameter
 */
export const SearchBar = ({ onSearchChange, onSortChange, defaultSort = 'desc' }) => {
  const [searchValue, setSearchValue] = useState('');
  const [sortValue, setSortValue] = useState(defaultSort);

  // Debouncing the input query to prevent spamming the backend API on every keystroke
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearchChange(searchValue);
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, onSearchChange]);

  /**
   * Sort field update action.
   */
  const handleSortChange = (e) => {
    const val = e.target.value;
    setSortValue(val);
    onSortChange(val);
  };

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-gray-900/30 border border-gray-850 p-4 rounded-2xl shadow-sm">
      
      {/* Search Input Box */}
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Name or service…"
          aria-label="Search referrals"
          className="block w-full pl-11 pr-4 py-2.5 bg-gray-950/60 border border-gray-800 hover:border-gray-700/60 focus:border-indigo-500/50 rounded-xl text-sm placeholder-gray-500 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all duration-200"
        />
      </div>

      {/* Sort Selection Box */}
      <div className="flex items-center space-x-3">
        <label 
          htmlFor="sort-by-date" 
          className="text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
        >
          Sort by date
        </label>
        <select
          id="sort-by-date"
          value={sortValue}
          onChange={handleSortChange}
          className="block w-full sm:w-auto pl-3 pr-10 py-2.5 bg-gray-950/60 border border-gray-800 hover:border-gray-700/60 focus:border-indigo-500/50 rounded-xl text-sm text-gray-300 focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition-all duration-200 cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%25.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_10px] bg-[right_14px_center] bg-no-repeat"
        >
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>

    </div>
  );
};

export default SearchBar;
