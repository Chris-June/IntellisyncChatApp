import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import {
  Home,
  GraduationCap,
  BookOpen,
  Languages,
  Globe,
  Heart,
  BookText,
  Calculator,
  Microscope,
  Users,
  BarChart2
} from 'lucide-react';

// Change the names to match your new routes.
const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Dashboard', href: '/dashboard', icon: BarChart2 },
  { name: 'Guidance Counselor', href: '/guidance-counselor', icon: GraduationCap },
  { name: 'English', href: '/english', icon: BookOpen },
  { name: 'French Language', href: '/french-language', icon: Languages },
  { name: 'Geography', href: '/geography', icon: Globe },
  { name: 'Health & Wellness', href: '/health-wellness', icon: Heart },
  { name: 'History', href: '/history', icon: BookText },
  { name: 'Math', href: '/math', icon: Calculator },
  { name: 'Science', href: '/science', icon: Microscope },
  { name: 'Social Studies', href: '/social-studies', icon: Users },
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