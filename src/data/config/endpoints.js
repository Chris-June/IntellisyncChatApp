// API endpoint configurations
export const API_ENDPOINTS = {
  // Base URL - to be configured based on environment
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',

  // Student endpoints
  STUDENT_PROGRESS: '/student/progress',
  STUDENT_PERFORMANCE: '/student/performance',
  STUDENT_ACHIEVEMENTS: '/student/achievements',

  // Teacher endpoints
  CLASS_METRICS: '/teacher/class-metrics',
  STUDENT_LIST: '/teacher/students',
  CLASS_PERFORMANCE: '/teacher/performance',

  // Parent endpoints
  CHILD_PROGRESS: '/parent/child-progress',
  CHILD_PERFORMANCE: '/parent/child-performance',
  CHILD_ACHIEVEMENTS: '/parent/child-achievements',

  // Dashboard common endpoints
  USER_STATS: '/dashboard/stats',
  PERFORMANCE_METRICS: '/dashboard/metrics'
};
