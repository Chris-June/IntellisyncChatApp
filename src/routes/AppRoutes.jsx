import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PROTECTED_PATHS, USER_ROLES } from '../auth/constants';
import {
  StudentRoute,
  ParentRoute,
  TeacherRoute,
  AdminRoute
} from '../components/Auth/ProtectedRoutes';

// Import your components
import LoginForm from '../components/Auth/LoginForm';
import SignUpForm from '../components/Auth/SignUpForm';
import Dashboard from '../pages/Dashboard';
// TODO: Import other view components

const AppRoutes = () => {
  const { user } = useAuth();

  // Helper function to redirect to role-specific dashboard
  const getDashboardPath = (userRole) => {
    switch (userRole) {
      case USER_ROLES.STUDENT:
        return PROTECTED_PATHS.STUDENT.DASHBOARD;
      case USER_ROLES.PARENT:
        return PROTECTED_PATHS.PARENT.DASHBOARD;
      case USER_ROLES.TEACHER:
        return PROTECTED_PATHS.TEACHER.DASHBOARD;
      case USER_ROLES.ADMIN:
        return PROTECTED_PATHS.ADMIN.DASHBOARD;
      default:
        return '/login';
    }
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          user ? (
            <Navigate to={getDashboardPath(user.role)} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignUpForm />} />

      {/* Student Routes */}
      <Route element={<StudentRoute />}>
        <Route path={PROTECTED_PATHS.STUDENT.DASHBOARD} element={<Dashboard />} />
        <Route path={PROTECTED_PATHS.STUDENT.PROGRESS} element={<StudentProgress />} />
        <Route path={PROTECTED_PATHS.STUDENT.ASSIGNMENTS} element={<StudentAssignments />} />
        <Route path={PROTECTED_PATHS.STUDENT.GRADES} element={<StudentGrades />} />
      </Route>

      {/* Parent Routes */}
      <Route element={<ParentRoute />}>
        <Route path={PROTECTED_PATHS.PARENT.DASHBOARD} element={<Dashboard />} />
        <Route path={PROTECTED_PATHS.PARENT.CHILDREN} element={<ChildrenList />} />
        <Route path={PROTECTED_PATHS.PARENT.PROGRESS} element={<ChildProgress />} />
        <Route path={PROTECTED_PATHS.PARENT.COMMUNICATIONS} element={<Communications />} />
      </Route>

      {/* Teacher Routes */}
      <Route element={<TeacherRoute />}>
        <Route path={PROTECTED_PATHS.TEACHER.DASHBOARD} element={<Dashboard />} />
        <Route path={PROTECTED_PATHS.TEACHER.CLASSES} element={<ClassManagement />} />
        <Route path={PROTECTED_PATHS.TEACHER.ASSIGNMENTS} element={<AssignmentManagement />} />
        <Route path={PROTECTED_PATHS.TEACHER.GRADING} element={<Grading />} />
        <Route path={PROTECTED_PATHS.TEACHER.STUDENTS} element={<StudentManagement />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminRoute />}>
        <Route path={PROTECTED_PATHS.ADMIN.DASHBOARD} element={<Dashboard />} />
        <Route path={PROTECTED_PATHS.ADMIN.USERS} element={<UserManagement />} />
        <Route path={PROTECTED_PATHS.ADMIN.SETTINGS} element={<Settings />} />
        <Route path={PROTECTED_PATHS.ADMIN.ANALYTICS} element={<Analytics />} />
      </Route>

      {/* Fallback route for unauthorized access */}
      <Route path="/unauthorized" element={<UnauthorizedAccess />} />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
