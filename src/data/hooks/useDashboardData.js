import { useState, useEffect } from 'react';
import { DashboardService } from '../services/dashboardService';
import { DashboardAdapter } from '../adapters/dashboardAdapter';

export const useDashboardData = (userType, userId) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let apiData;

        switch (userType) {
          case 'student':
            apiData = await DashboardService.fetchStudentProgress(userId);
            setData(DashboardAdapter.transformStudentData(apiData));
            break;
          case 'teacher':
            apiData = await DashboardService.fetchClassMetrics(userId);
            setData(DashboardAdapter.transformTeacherData(apiData));
            break;
          case 'parent':
            apiData = await DashboardService.fetchChildProgress(userId);
            setData(DashboardAdapter.transformParentData(apiData));
            break;
          default:
            throw new Error('Invalid user type');
        }
      } catch (err) {
        setError(err);
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userType, userId]);

  return { data, loading, error };
};
