import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  Building2,
  Calculator,
  Users,
  UserCheck,
  TrendingUp,
  BarChart2,
  Scale,
  Settings,
  Home,
  Brain
} from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'General Assistant', href: '/general-assistant', icon: Brain },
  { name: 'CEO Assistant', href: '/ceo-assistant', icon: Building2 },
  { name: 'CFO Assistant', href: '/cfo-assistant', icon: Calculator },
  { name: 'HR Assistant', href: '/hr-assistant', icon: Users },
  { name: 'Employee Relations', href: '/employee-relations-assistant', icon: UserCheck },
  { name: 'Sales Manager', href: '/sales-manager-assistant', icon: TrendingUp },
  { name: 'CMO Assistant', href: '/cmo-assistant', icon: BarChart2 },
  { name: 'Legal Advisor', href: '/legal-advisor-assistant', icon: Scale },
  { name: 'Operations Manager', href: '/operations-manager-assistant', icon: Settings },
];

const NavHeader = () => {
  const location = useLocation();

  return (
    <nav className="bg-background border-b fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold"></span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      item.href === location.pathname
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground',
                      'inline-flex items-center gap-2 border-b-2 px-1 pt-1 text-sm font-medium'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavHeader;