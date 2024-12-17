import React, { createContext, useContext, useState, useCallback } from 'react';

const BreadcrumbContext = createContext({});

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error('useBreadcrumb must be used within a BreadcrumbProvider');
  }
  return context;
};

export const BreadcrumbProvider = ({ children }) => {
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const updateBreadcrumbs = useCallback((newBreadcrumbs) => {
    setBreadcrumbs(newBreadcrumbs);
  }, []);

  const appendBreadcrumb = useCallback((breadcrumb) => {
    setBreadcrumbs(prev => [...prev, breadcrumb]);
  }, []);

  const replaceBreadcrumbs = useCallback((newBreadcrumbs) => {
    setBreadcrumbs(newBreadcrumbs);
  }, []);

  const clearBreadcrumbs = useCallback(() => {
    setBreadcrumbs([]);
  }, []);

  const value = {
    breadcrumbs,
    updateBreadcrumbs,
    appendBreadcrumb,
    replaceBreadcrumbs,
    clearBreadcrumbs,
  };

  return (
    <BreadcrumbContext.Provider value={value}>
      {children}
    </BreadcrumbContext.Provider>
  );
};
