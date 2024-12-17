import React from 'react';
import NavHeader from './NavHeader';
import BreadcrumbWrapper from './BreadcrumbWrapper';

const PageWithNav = ({ children }) => {
  return (
    <div className="min-h-screen">
      <NavHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <BreadcrumbWrapper />
        </div>
        {children}
      </main>
    </div>
  );
};

export default PageWithNav;
