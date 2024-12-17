import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { USER_ROLES, ROLE_PERMISSIONS, PROTECTED_PATHS } from '../../auth/constants';

// Base Protected Route
const ProtectedRoute = ({ children, allowedRoles, requiredPermissions = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role access
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Check permissions
  if (requiredPermissions.length > 0) {
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    const hasRequiredPermissions = requiredPermissions.every(permission =>
      userPermissions.includes(permission)
    );

    if (!hasRequiredPermissions) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children || <Outlet />;
};

// Student Routes
export const StudentRoute = ({ children }) => (
  <ProtectedRoute
    allowedRoles={[USER_ROLES.STUDENT]}
    requiredPermissions={[PERMISSIONS.VIEW_OWN_DASHBOARD]}
  >
    {children}
  </ProtectedRoute>
);

// Parent Routes
export const ParentRoute = ({ children }) => (
  <ProtectedRoute
    allowedRoles={[USER_ROLES.PARENT]}
    requiredPermissions={[PERMISSIONS.VIEW_CHILD_DASHBOARD]}
  >
    {children}
  </ProtectedRoute>
);

// Teacher Routes
export const TeacherRoute = ({ children }) => (
  <ProtectedRoute
    allowedRoles={[USER_ROLES.TEACHER, USER_ROLES.ADMIN]}
    requiredPermissions={[PERMISSIONS.VIEW_CLASS_DASHBOARD]}
  >
    {children}
  </ProtectedRoute>
);

// Admin Routes
export const AdminRoute = ({ children }) => (
  <ProtectedRoute
    allowedRoles={[USER_ROLES.ADMIN]}
    requiredPermissions={[PERMISSIONS.MANAGE_USERS]}
  >
    {children}
  </ProtectedRoute>
);
