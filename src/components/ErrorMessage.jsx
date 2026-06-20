import React from 'react';

/**
 * Reusable Error and Warning notification component.
 * @param {Object} props
 * @param {string} props.message - Descriptive text of the error/warning
 * @param {'error'|'warning'|'empty'} [props.type] - Style variations
 * @param {Function} [props.onRetry] - Optional click handler for retry actions
 */
export const ErrorMessage = ({ message, type = 'error', onRetry }) => {
  const isWarning = type === 'warning' || type === 'empty';

  return (
    <div
      role="alert"
      className={`w-full max-w-2xl mx-auto my-6 p-6 rounded-2xl border flex flex-col items-center text-center space-y-4 animate-fade-in ${
        isWarning
          ? 'bg-amber-950/20 border-amber-900/30 text-amber-200'
          : 'bg-red-950/20 border-red-900/30 text-red-200'
      }`}
    >
      <div className={`p-3 rounded-full ${isWarning ? 'bg-amber-900/30' : 'bg-red-900/30'}`}>
        {isWarning ? (
          <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        )}
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-semibold tracking-wide">
          {type === 'empty' ? 'No Referrals Found' : isWarning ? 'Warning' : 'Error Occurred'}
        </h3>
        <p className="text-sm text-gray-300 max-w-md">
          {message || 'An error occurred while communicating with the service. Please try again.'}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-700/80 text-white text-sm font-semibold rounded-xl transition duration-150 cursor-pointer"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
