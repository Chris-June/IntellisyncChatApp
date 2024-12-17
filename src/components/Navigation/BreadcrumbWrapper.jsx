import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBreadcrumb } from '../../contexts/BreadcrumbContext';
import { getBreadcrumbsForPath } from '../../routes/routeConfig';
import Breadcrumb from './Breadcrumb';

const BreadcrumbWrapper = () => {
  const location = useLocation();
  const { updateBreadcrumbs } = useBreadcrumb();

  useEffect(() => {
    const breadcrumbs = getBreadcrumbsForPath(location.pathname);
    updateBreadcrumbs(breadcrumbs);
  }, [location.pathname, updateBreadcrumbs]);

  return <Breadcrumb />;
};

export default BreadcrumbWrapper;
