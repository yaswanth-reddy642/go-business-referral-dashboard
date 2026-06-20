import React, { useEffect, useState, useMemo } from 'react';
import { useReferrals } from '../hooks/useReferrals';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import MetricCard from '../components/MetricCard';
import ServiceSummary from '../components/ServiceSummary';
import SearchBar from '../components/SearchBar';
import ReferralTable from '../components/ReferralTable';
import Pagination from '../components/Pagination';

/**
 * Dashboard page displaying stats, service summaries, referral links, and the referral table.
 */
export const Dashboard = () => {
  const { loading, error, dashboardData, fetchDashboard } = useReferrals();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');
  
  // Client-side pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Toast notification state
  const [toast, setToast] = useState({ visible: false, message: '' });

  // Fetch dashboard data on mount, and whenever query/sorting parameters change
  useEffect(() => {
    fetchDashboard({ search: searchQuery, sort: sortOrder });
    // Reset to first page when search/sort updates
    setCurrentPage(1);
  }, [fetchDashboard, searchQuery, sortOrder]);

  const { metrics, serviceSummary, referral, referrals } = dashboardData;

  // Extract referral sharing properties
  const referralLink = referral?.link || referral?.referralLink || 'https://gobusiness.com/ref/default';
  const referralCode = referral?.code || referral?.referralCode || 'GOBUS100';

  /**
   * Copy helper that interacts with the Clipboard API
   * @param {string} text - Text to copy to clipboard
   * @param {string} label - Toast message label
   */
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setToast({ visible: true, message: `${label} copied to clipboard!` });
        setTimeout(() => {
          setToast({ visible: false, message: '' });
        }, 3000);
      })
      .catch(() => {
        setToast({ visible: true, message: `Failed to copy ${label.toLowerCase()}.` });
        setTimeout(() => {
          setToast({ visible: false, message: '' });
        }, 3000);
      });
  };

  // Client-side pagination slice
  const paginatedReferrals = useMemo(() => {
    if (!referrals) return [];
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return referrals.slice(startIndex, endIndex);
  }, [referrals, currentPage]);

  const totalReferralsCount = referrals?.length || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 relative">
      
      {/* Toast Notification */}
      {toast.visible && (
        <div className="fixed bottom-5 right-5 z-55 bg-indigo-600 border border-indigo-500 text-white px-5 py-3 rounded-2xl shadow-xl shadow-indigo-900/20 text-sm font-semibold flex items-center space-x-2 animate-fade-in">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Grid */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-850 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Referral Dashboard
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Track your referrals, earnings, and partner activity in one place.
          </p>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <ErrorMessage 
          message={error} 
          onRetry={() => fetchDashboard({ search: searchQuery, sort: sortOrder })} 
        />
      )}

      {/* Metrics & Sharing Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Overview Metrics */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent tracking-tight">
            Overview
          </h2>
          {loading && metrics.length === 0 ? (
            <Loader type="card" count={3} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {metrics && metrics.map((metric, idx) => (
                <MetricCard 
                  key={idx} 
                  label={metric.label || metric.name || 'Stat'} 
                  value={metric.value !== undefined ? metric.value : '0'} 
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Share Referral Panel */}
        <div className="bg-gray-900/40 border border-gray-850 rounded-2xl p-6 flex flex-col justify-between shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-gray-100 mb-2">
              Refer friends and earn more
            </h2>
            <p className="text-xs text-gray-400 mb-6 leading-relaxed">
              Share your business referral link or invite code with your network to earn rewards.
            </p>
          </div>

          <div className="space-y-4">
            {/* Referral Link Copy Box */}
            <div className="space-y-1.5">
              <label 
                htmlFor="referral-link" 
                className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider"
              >
                Your Referral Link
              </label>
              <div className="flex space-x-2">
                <input
                  id="referral-link"
                  type="text"
                  readOnly
                  value={referralLink}
                  className="flex-1 px-3 py-2 bg-gray-950/60 border border-gray-800 text-xs text-gray-450 rounded-xl focus:outline-none select-all"
                />
                <button
                  onClick={() => handleCopy(referralLink, 'Referral link')}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-550 active:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition duration-150 cursor-pointer select-none"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Referral Code Copy Box */}
            <div className="space-y-1.5">
              <label 
                htmlFor="referral-code" 
                className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider"
              >
                Your Referral Code
              </label>
              <div className="flex space-x-2">
                <input
                  id="referral-code"
                  type="text"
                  readOnly
                  value={referralCode}
                  className="flex-1 px-3 py-2 bg-gray-950/60 border border-gray-800 text-xs text-gray-450 rounded-xl focus:outline-none select-all font-mono tracking-widest font-semibold"
                />
                <button
                  onClick={() => handleCopy(referralCode, 'Referral code')}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-550 active:bg-indigo-700 text-white text-xs font-semibold rounded-xl transition duration-150 cursor-pointer select-none"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Service Summary Section */}
      {!loading && serviceSummary && (
        <ServiceSummary serviceSummary={serviceSummary} />
      )}

      {/* Referrals Table Section */}
      <div className="space-y-4">
        {/* Search, Sort, Filters */}
        <SearchBar 
          onSearchChange={setSearchQuery} 
          onSortChange={setSortOrder} 
          defaultSort={sortOrder}
        />

        {/* Table content / Skeletons */}
        {loading ? (
          <Loader type="table" count={5} />
        ) : (
          <>
            <ReferralTable referrals={paginatedReferrals} />
            <Pagination 
              currentPage={currentPage}
              totalItems={totalReferralsCount}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
