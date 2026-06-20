import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/formatDate';
import { formatCurrency } from '../utils/formatCurrency';

/**
 * ReferralTable component displaying list of referrals in a responsive tabular view.
 * @param {Object} props
 * @param {Array} props.referrals - List of referral objects to render
 */
export const ReferralTable = ({ referrals }) => {
  const navigate = useNavigate();

  if (!referrals || referrals.length === 0) {
    return (
      <div className="text-center py-16 bg-gray-900/20 border border-gray-850 rounded-2xl animate-fade-in">
        <svg 
          className="mx-auto h-12 w-12 text-gray-600 mb-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
        <h3 className="text-base font-bold text-gray-300">No Referrals Found</h3>
        <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
          We couldn't find any referral matches matching your query.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900/40 border border-gray-850 rounded-2xl overflow-hidden shadow-sm animate-fade-in">
      {/* Header Info */}
      <div className="px-6 py-4.5 border-b border-gray-850 flex items-center justify-between">
        <h2 className="text-lg font-bold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent tracking-tight">
          All Referrals
        </h2>
        <span className="text-xs font-semibold text-gray-400 bg-gray-950/60 px-3 py-1 rounded-full border border-gray-800">
          {referrals.length} {referrals.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-950/40 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-855">
              <th className="py-4.5 px-6 select-none">Name</th>
              <th className="py-4.5 px-6 select-none">Service</th>
              <th className="py-4.5 px-6 select-none">Date</th>
              <th className="py-4.5 px-6 text-right select-none">Profit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-850/60">
            {referrals.map((referral) => {
              const id = referral.id;
              const name = referral.name || 'Unnamed Partner';
              const service = referral.serviceName || referral.service || 'N/A';
              const date = formatDate(referral.date);
              const profit = formatCurrency(referral.profit);

              return (
                <tr
                  key={id}
                  onClick={() => navigate(`/referral/${id}`)}
                  className="hover:bg-gray-900/40 active:bg-gray-900/60 transition duration-150 cursor-pointer group"
                >
                  {/* Referral Name */}
                  <td className="py-4 px-6 text-sm font-semibold text-gray-200 group-hover:text-indigo-400 transition-all duration-150">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-850 flex items-center justify-center font-bold text-xs text-gray-400 group-hover:bg-indigo-600/10 group-hover:text-indigo-400 transition-all duration-200">
                        {name.charAt(0).toUpperCase()}
                      </div>
                      <span>{name}</span>
                    </div>
                  </td>
                  
                  {/* Service */}
                  <td className="py-4 px-6 text-sm text-gray-300">
                    {service}
                  </td>
                  
                  {/* Date formatted as YYYY/MM/DD */}
                  <td className="py-4 px-6 text-sm text-gray-400 font-medium">
                    {date}
                  </td>
                  
                  {/* Profit as USD with no decimals */}
                  <td className="py-4 px-6 text-sm font-bold text-indigo-400 text-right tracking-tight">
                    {profit}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralTable;
