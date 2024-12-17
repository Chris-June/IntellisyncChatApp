import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth/supabaseAuth';

const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for current user
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);

    // TODO: Set up Supabase auth state listener
    // Will be implemented when Supabase is connected
  }, []);

  const value = {
    user,
    signUp: authService.signUp,
    signIn: authService.signIn,
    signOut: authService.signOut,
    resetPassword: authService.resetPassword,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Protected Route wrapper component
export const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // TODO: Redirect to login page
    return <div>Please log in to access this page</div>;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // TODO: Redirect to unauthorized page
    return <div>You do not have permission to access this page</div>;
  }

  return children;
};
