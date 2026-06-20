import React from 'react';
import { formatCurrency } from '../utils/formatCurrency';

/**
 * ServiceSummary component displaying modern cards summarizing referral details for each service.
 * @param {Object} props
 * @param {Object|Array} props.serviceSummary - The serviceSummary data from the API
 */
export const ServiceSummary = ({ serviceSummary }) => {
  
  /**
   * Safe parser that converts serviceSummary variations into a flat normalized array.
   */
  const getSummaries = () => {
    if (!serviceSummary || typeof serviceSummary !== 'object') return [];

    // 1. If it's already an array
    if (Array.isArray(serviceSummary)) {
      return serviceSummary;
    }

    // 2. If it's a single service summary object
    const name = serviceSummary.service || serviceSummary.Service;
    if (name) {
      return [serviceSummary];
    }

    // 3. If it's an object with service names as keys
    return Object.entries(serviceSummary)
      .map(([key, value]) => {
        if (value && typeof value === 'object') {
          return {
            service: key,
            yourReferrals: value.yourReferrals ?? value['Your Referrals'] ?? 0,
            activeReferrals: value.activeReferrals ?? value['Active Referrals'] ?? 0,
            totalRefEarnings: value.totalRefEarnings ?? value['Total Ref. Earnings'] ?? 0,
          };
        }
        return null;
      })
      .filter(Boolean);
  };

  const summaries = getSummaries();

  if (summaries.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent tracking-tight">
        Service Summary
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {summaries.map((summary, idx) => {
          const service = summary.service || summary.Service || 'Unknown Service';
          const yourReferrals = summary.yourReferrals ?? summary['Your Referrals'] ?? 0;
          const activeReferrals = summary.activeReferrals ?? summary['Active Referrals'] ?? 0;
          const totalRefEarnings = summary.totalRefEarnings ?? summary['Total Ref. Earnings'] ?? 0;

          return (
            <div
              key={idx}
              className="bg-gray-900/40 border border-gray-850 hover:border-indigo-500/20 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between shadow-sm hover:shadow-lg hover:shadow-indigo-950/5 group"
            >
              <div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 mb-4">
                  Service Category
                </span>
                <h3 className="text-base font-bold text-gray-100 truncate group-hover:text-white transition duration-200">
                  {service}
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-3 border-t border-gray-850 pt-5 mt-6 text-center">
                <div>
                  <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Referrals
                  </span>
                  <span className="block text-base font-bold text-gray-200 mt-1">
                    {yourReferrals}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Active
                  </span>
                  <span className="block text-base font-bold text-gray-200 mt-1">
                    {activeReferrals}
                  </span>
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    Earnings
                  </span>
                  <span className="block text-base font-bold text-indigo-400 mt-1">
                    {formatCurrency(totalRefEarnings)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSummary;
