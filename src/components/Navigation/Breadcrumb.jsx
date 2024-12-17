import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';
import { useBreadcrumb } from '../../contexts/BreadcrumbContext';

const Breadcrumb = () => {
  const { breadcrumbs } = useBreadcrumb();
  const location = useLocation();

  // If no custom breadcrumbs are set, generate from the current path
  const displayBreadcrumbs = breadcrumbs.length > 0
    ? breadcrumbs
    : location.pathname
        .split('/')
        .filter(Boolean)
        .map((path, index, array) => ({
          label: path.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' '),
          path: '/' + array.slice(0, index + 1).join('/'),
        }));

  if (displayBreadcrumbs.length === 0) return null;

  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground"
          >
            <HomeIcon className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {displayBreadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.path} className="flex items-center">
            <ChevronRightIcon
              className="h-4 w-4 text-muted-foreground flex-shrink-0"
              aria-hidden="true"
            />
            <Link
              to={breadcrumb.path}
              className={`ml-2 text-sm font-medium ${
                index === displayBreadcrumbs.length - 1
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-current={
                index === displayBreadcrumbs.length - 1 ? 'page' : undefined
              }
            >
              {breadcrumb.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
