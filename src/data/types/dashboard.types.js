/**
 * Type definitions for Dashboard data
 */

// Student Types
export const StudentDataTypes = {
  PROGRESS: 'progress',
  PERFORMANCE: 'performance',
  ACHIEVEMENTS: 'achievements'
};

/**
 * @typedef {Object} StudentProgress
 * @property {string} subjectName
 * @property {number} completionRate
 * @property {number} score
 * @property {Date} lastUpdated
 */

/**
 * @typedef {Object} StudentPerformance
 * @property {string} subject
 * @property {number} currentGrade
 * @property {number} improvement
 * @property {Array<Object>} assessments
 */

/**
 * @typedef {Object} StudentAchievement
 * @property {string} id
 * @property {string} title
 * @property {Date} dateEarned
 * @property {string} category
 */

// Teacher Types
export const TeacherDataTypes = {
  CLASS_METRICS: 'classMetrics',
  STUDENT_LIST: 'studentList',
  PERFORMANCE: 'performance'
};

/**
 * @typedef {Object} ClassMetrics
 * @property {number} totalStudents
 * @property {number} averageAttendance
 * @property {number} averagePerformance
 * @property {Object} subjectBreakdown
 */

/**
 * @typedef {Object} StudentListItem
 * @property {string} id
 * @property {string} name
 * @property {number} currentGrade
 * @property {string} status
 * @property {Date} lastActive
 */

// Parent Types
export const ParentDataTypes = {
  CHILD_PROGRESS: 'childProgress',
  CHILD_PERFORMANCE: 'childPerformance',
  CHILD_ACHIEVEMENTS: 'childAchievements'
};

/**
 * @typedef {Object} ChildProgress
 * @property {string} childId
 * @property {Array<StudentProgress>} progressBySubject
 * @property {number} overallProgress
 * @property {Date} lastUpdated
 */

// Common Dashboard Types
export const DashboardDataTypes = {
  USER_STATS: 'userStats',
  PERFORMANCE_METRICS: 'performanceMetrics'
};

/**
 * @typedef {Object} UserStats
 * @property {string} userId
 * @property {string} role
 * @property {Object} metrics
 * @property {Date} lastLogin
 */

/**
 * @typedef {Object} PerformanceMetrics
 * @property {Array<Object>} timeSeriesData
 * @property {Object} aggregates
 * @property {Object} comparisons
 */
