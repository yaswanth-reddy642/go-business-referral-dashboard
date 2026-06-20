/**
 * Formats a date string from YYYY-MM-DD to YYYY/MM/DD.
 * Fallbacks gracefully if string is in another format.
 * @param {string} dateStr 
 * @returns {string}
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  
  // Quick regex replacement for YYYY-MM-DD format
  const matches = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (matches) {
    return `${matches[1]}/${matches[2]}/${matches[3]}`;
  }

  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    
    return `${yyyy}/${mm}/${dd}`;
  } catch (error) {
    return dateStr;
  }
};
