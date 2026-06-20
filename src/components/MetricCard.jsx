import React from 'react';

/**
 * MetricCard component representing a single statistical key value pair.
 * @param {Object} props
 * @param {string} props.label - Description text of the metric
 * @param {string|number} props.value - Numerical or text value of the metric
 */
export const MetricCard = ({ label, value }) => {
  return (
    <div className="relative overflow-hidden bg-gray-900/40 border border-gray-850 hover:border-gray-700/60 rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-950/10 group">
      {/* Decorative gradient corner light */}
      <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl group-hover:bg-indigo-500/10 transition-all duration-300"></div>
      
      <p className="text-xs font-semibold text-gray-400 tracking-wider uppercase mb-2">
        {label}
      </p>
      
      <p className="text-3xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
        {value}
      </p>
    </div>
  );
};

export default MetricCard;
