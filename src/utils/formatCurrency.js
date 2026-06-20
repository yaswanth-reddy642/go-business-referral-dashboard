/**
 * Formats a number or string value as USD currency with no decimals (e.g., $1,234).
 * @param {number|string} value 
 * @returns {string}
 */
export const formatCurrency = (value) => {
  if (value === undefined || value === null) return '$0';
  
  const numericValue = typeof value === 'number' ? value : parseFloat(value);
  if (isNaN(numericValue)) return '$0';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numericValue);
};
