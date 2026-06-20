import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

/**
 * Login page view.
 */
export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  /**
   * Triggers sign-in API call on form submission.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Every click triggers API call as per rule (even if empty)
    const result = await login(email, password);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 bg-dark-bg text-white relative overflow-hidden">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-600/10 rounded-full blur-[110px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-purple-600/5 rounded-full blur-[90px] pointer-events-none"></div>

      <div className="w-full max-w-md bg-gray-900/55 border border-gray-800 rounded-3xl p-8 backdrop-blur-lg shadow-2xl relative z-10 animate-fade-in">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-indigo-650 flex items-center justify-center font-bold text-xl text-white mx-auto shadow-md shadow-indigo-600/20 mb-4 select-none">
            G
          </div>
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white via-gray-150 to-gray-300 bg-clip-text text-transparent tracking-tight">
            Go Business
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-medium">
            Sign in to open your referral dashboard.
          </p>
        </div>

        {/* API Error Notification */}
        {error && (
          <div 
            role="alert" 
            className="mb-6 p-4 bg-red-950/30 border border-red-900/30 text-red-200 text-xs font-semibold rounded-2xl flex items-start space-x-2.5"
          >
            <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text" // Keep standard text or email
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="block w-full px-4 py-3 bg-gray-950/60 border border-gray-800 hover:border-gray-700/60 focus:border-indigo-500/50 rounded-xl text-sm placeholder-gray-500 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition duration-150"
            />
          </div>

          {/* Password Input */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="block w-full px-4 py-3 bg-gray-950/60 border border-gray-800 hover:border-gray-700/60 focus:border-indigo-500/50 rounded-xl text-sm placeholder-gray-500 text-white focus:outline-none focus:ring-4 focus:ring-indigo-500/5 transition duration-150"
            />
          </div>

          {/* Sign In Trigger (Always remains enabled) */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-550 active:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition duration-150 shadow-md shadow-indigo-600/10 cursor-pointer flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign in</span>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
