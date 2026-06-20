import { useState, useCallback } from 'react';
import { referralsService } from '../services/api';

export const useReferrals = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState({
    metrics: [],
    serviceSummary: {},
    referral: {},
    referrals: [],
  });
  const [singleReferral, setSingleReferral] = useState(null);

  /**
   * Fetches full dashboard data with search and sort params
   * @param {Object} [params]
   * @param {string} [params.search]
   * @param {string} [params.sort]
   */
  const fetchDashboard = useCallback(async ({ search, sort } = {}) => {
    setLoading(true);
    setError(null);
    try {
      const apiResponse = await referralsService.getReferrals({ search, sort });
      
      // Supported structures: apiResponse.data or apiResponse directly
      const parsedData = apiResponse?.data || apiResponse;

      setDashboardData({
        metrics: parsedData?.metrics || [],
        serviceSummary: parsedData?.serviceSummary || {},
        referral: parsedData?.referral || {},
        referrals: parsedData?.referrals || [],
      });
    } catch (err) {
      const errorMsg = 
        err.response?.data?.message || 
        err.response?.data?.error || 
        err.message || 
        'Failed to retrieve dashboard referrals data.';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Safe parser that inspects every potential path in the API response to find the referral object
   */
  const extractReferral = useCallback((apiResponse, targetId) => {
    if (!apiResponse) return null;

    const isValid = (obj) => {
      return obj && 
        typeof obj === 'object' && 
        !Array.isArray(obj) && 
        (obj.id !== undefined || obj.name !== undefined || obj.serviceName !== undefined || obj.service !== undefined);
    };

    // 1. Check direct object paths
    if (isValid(apiResponse.referral)) return apiResponse.referral;
    if (isValid(apiResponse.data?.referral)) return apiResponse.data.referral;
    if (isValid(apiResponse.data)) {
      // Check if data is not an array, and contains a referral structure
      if (isValid(apiResponse.data)) return apiResponse.data;
    }
    if (isValid(apiResponse.data?.data)) return apiResponse.data.data;
    if (isValid(apiResponse)) return apiResponse;

    // 2. Check array paths (looking up by ID match)
    const findInArray = (arr) => {
      if (Array.isArray(arr)) {
        return arr.find(r => r && String(r.id) === String(targetId)) || null;
      }
      return null;
    };

    let matched = findInArray(apiResponse.referrals);
    if (matched) return matched;

    matched = findInArray(apiResponse.data?.referrals);
    if (matched) return matched;

    matched = findInArray(apiResponse.data);
    if (matched) return matched;

    matched = findInArray(apiResponse);
    if (matched) return matched;

    return null;
  }, []);

  /**
   * Fetches single referral details by ID
   * @param {string|number} id 
   */
  const fetchReferralDetails = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    setSingleReferral(null);
    try {
      // 1. Try to fetch details directly using id query parameter
      const apiResponse = await referralsService.getReferrals({ id });
      let item = extractReferral(apiResponse, id);

      // 2. Fallback: if not found, fetch the entire list and locate it
      if (!item) {
        const fullResponse = await referralsService.getReferrals();
        item = extractReferral(fullResponse, id);
      }

      setSingleReferral(item);
      return item;
    } catch (err) {
      // 3. Fallback: on network/request failure, try fetching the whole list to locate the ID
      try {
        const fullResponse = await referralsService.getReferrals();
        const item = extractReferral(fullResponse, id);
        if (item) {
          setError(null);
          setSingleReferral(item);
          return item;
        }
      } catch (innerErr) {
        // Ignore secondary errors
      }

      const errorMsg = 
        err.response?.data?.message || 
        err.response?.data?.error || 
        err.message || 
        'Failed to retrieve referral details.';
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  }, [extractReferral]);

  return {
    loading,
    error,
    dashboardData,
    singleReferral,
    fetchDashboard,
    fetchReferralDetails,
  };
};

export default useReferrals;
