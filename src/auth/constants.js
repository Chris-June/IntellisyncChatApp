/**
 * Authentication and Authorization Constants
 */

export const USER_ROLES = {
  STUDENT: 'student',
  PARENT: 'parent',
  TEACHER: 'teacher',
  ADMIN: 'admin'
};

export const PERMISSIONS = {
  // Student permissions
  VIEW_OWN_DASHBOARD: 'view:own_dashboard',
  VIEW_OWN_PROGRESS: 'view:own_progress',
  SUBMIT_ASSIGNMENTS: 'create:assignments',
  VIEW_OWN_GRADES: 'view:own_grades',
  
  // Parent permissions
  VIEW_CHILD_DASHBOARD: 'view:child_dashboard',
  VIEW_CHILD_PROGRESS: 'view:child_progress',
  VIEW_CHILD_GRADES: 'view:child_grades',
  COMMUNICATE_WITH_TEACHERS: 'create:teacher_messages',
  
  // Teacher permissions
  VIEW_CLASS_DASHBOARD: 'view:class_dashboard',
  MANAGE_ASSIGNMENTS: 'manage:assignments',
  GRADE_SUBMISSIONS: 'update:grades',
  VIEW_STUDENT_PROGRESS: 'view:student_progress',
  MANAGE_CLASSES: 'manage:classes',
  
  // Admin permissions
  MANAGE_USERS: 'manage:users',
  MANAGE_SCHOOL_SETTINGS: 'manage:settings',
  VIEW_ANALYTICS: 'view:analytics'
};

// Role-Permission mappings
export const ROLE_PERMISSIONS = {
  [USER_ROLES.STUDENT]: [
    PERMISSIONS.VIEW_OWN_DASHBOARD,
    PERMISSIONS.VIEW_OWN_PROGRESS,
    PERMISSIONS.SUBMIT_ASSIGNMENTS,
    PERMISSIONS.VIEW_OWN_GRADES
  ],
  
  [USER_ROLES.PARENT]: [
    PERMISSIONS.VIEW_CHILD_DASHBOARD,
    PERMISSIONS.VIEW_CHILD_PROGRESS,
    PERMISSIONS.VIEW_CHILD_GRADES,
    PERMISSIONS.COMMUNICATE_WITH_TEACHERS
  ],
  
  [USER_ROLES.TEACHER]: [
    PERMISSIONS.VIEW_CLASS_DASHBOARD,
    PERMISSIONS.MANAGE_ASSIGNMENTS,
    PERMISSIONS.GRADE_SUBMISSIONS,
    PERMISSIONS.VIEW_STUDENT_PROGRESS,
    PERMISSIONS.MANAGE_CLASSES,
    PERMISSIONS.COMMUNICATE_WITH_TEACHERS
  ],
  
  [USER_ROLES.ADMIN]: [
    ...Object.values(PERMISSIONS) // Admins have all permissions
  ]
};

// Protected route paths
export const PROTECTED_PATHS = {
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    PROGRESS: '/student/progress',
    ASSIGNMENTS: '/student/assignments',
    GRADES: '/student/grades'
  },
  
  PARENT: {
    DASHBOARD: '/parent/dashboard',
    CHILDREN: '/parent/children',
    PROGRESS: '/parent/progress',
    COMMUNICATIONS: '/parent/communications'
  },
  
  TEACHER: {
    DASHBOARD: '/teacher/dashboard',
    CLASSES: '/teacher/classes',
    ASSIGNMENTS: '/teacher/assignments',
    GRADING: '/teacher/grading',
    STUDENTS: '/teacher/students'
  },
  
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    SETTINGS: '/admin/settings',
    ANALYTICS: '/admin/analytics'
  }
};
