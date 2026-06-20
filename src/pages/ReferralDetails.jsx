import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useReferrals } from '../hooks/useReferrals';
import { formatDate } from '../utils/formatDate';
import { formatCurrency } from '../utils/formatCurrency';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';

/**
 * ReferralDetails page displaying details for a specific referral ID.
 */
export const ReferralDetails = () => {
  const { id } = useParams();
  const { loading, error, singleReferral, fetchReferralDetails } = useReferrals();

  useEffect(() => {
    if (id) {
      fetchReferralDetails(id);
    }
  }, [id, fetchReferralDetails]);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <Loader type="details" />
      </div>
    );
  }

  // Error state (excluding "not found" which is handled below)
  if (error) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 space-y-6">
        <div className="flex justify-start">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-sm font-semibold text-gray-400 hover:text-white transition duration-150"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to dashboard</span>
          </Link>
        </div>
        <ErrorMessage message={error} onRetry={() => fetchReferralDetails(id)} />
      </div>
    );
  }

  // Referral Not Found State
  if (!singleReferral) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center px-4 text-center space-y-6 animate-fade-in">
        <div className="p-4 bg-gray-900/60 border border-gray-800 rounded-full">
          <svg className="w-10 h-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-200">Referral not found</h2>
          <p className="text-sm text-gray-400 max-w-sm mx-auto">
            The referral ID you are trying to access does not exist or has been deleted.
          </p>
        </div>
        <Link 
          to="/" 
          className="px-6 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl shadow-md transition duration-150"
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  // Extracted values with default fallbacks
  const partnerName = singleReferral.name || 'Unknown Partner';
  const refId = singleReferral.id || id || 'Unknown ID';
  const serviceName = singleReferral.serviceName || singleReferral.service || 'Unknown Service';
  const dateVal = formatDate(singleReferral.date) || 'Unknown Date';
  const profitVal = (singleReferral.profit !== undefined && singleReferral.profit !== null)
    ? formatCurrency(singleReferral.profit)
    : 'Unknown Profit';


  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-fade-in">
      {/* Back Link */}
      <div className="flex justify-start">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-sm font-semibold text-gray-400 hover:text-white transition duration-150 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to dashboard</span>
        </Link>
      </div>

      {/* Main Details Card */}
      <div className="bg-gray-900/40 border border-gray-850 rounded-3xl p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-2xl"></div>

        {/* Heading */}
        <div className="border-b border-gray-850 pb-6 mb-6">
          <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest block mb-2">
            Referral Details
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            {partnerName}
          </h1>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Referral ID</p>
            <p className="text-base font-semibold text-gray-250">{refId}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Service Name</p>
            <p className="text-base font-semibold text-gray-250">{serviceName}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Date</p>
            <p className="text-base font-semibold text-gray-250">{dateVal}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Profit</p>
            <p className="text-lg font-bold text-indigo-400">{profitVal}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralDetails;
