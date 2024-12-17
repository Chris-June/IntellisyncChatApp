import React, { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext({});

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = useCallback((key, isLoading) => {
    setLoadingStates(prev => ({
      ...prev,
      [key]: isLoading
    }));
  }, []);

  const startLoading = useCallback((key) => {
    setLoading(key, true);
  }, [setLoading]);

  const stopLoading = useCallback((key) => {
    setLoading(key, false);
  }, [setLoading]);

  const isLoading = useCallback((key) => {
    return loadingStates[key] || false;
  }, [loadingStates]);

  const value = {
    setLoading,
    startLoading,
    stopLoading,
    isLoading,
    loadingStates
  };

  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
};
