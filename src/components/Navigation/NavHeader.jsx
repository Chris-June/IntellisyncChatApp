import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  Brain,
  Code,
  PenTool,
  BookOpen,
  Briefcase,
  Languages,
  Heart,
  Plane,
  Calculator,
  Home
} from 'lucide-react';

const navItems = [
  {
    name: 'Home',
    path: '/',
    icon: Home
  },
  {
    name: 'General Assistant',
    path: '/general-assistant',
    icon: Brain
  },
  {
    name: 'Code Expert',
    path: '/code-expert',
    icon: Code
  },
  {
    name: 'Creative Writer',
    path: '/creative-writer',
    icon: PenTool
  },
  {
    name: 'Research Assistant',
    path: '/research-assistant',
    icon: BookOpen
  },
  {
    name: 'Business Consultant',
    path: '/business-consultant',
    icon: Briefcase
  },
  {
    name: 'Language Tutor',
    path: '/language-tutor',
    icon: Languages
  },
  {
    name: 'Health Coach',
    path: '/health-coach',
    icon: Heart
  },
  {
    name: 'Travel Guide',
    path: '/travel-guide',
    icon: Plane
  },
  {
    name: 'Math & Science',
    path: '/math-science-tutor',
    icon: Calculator
  }
];

const NavHeader = () => {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link 
            to="/" 
            className="mr-6 flex items-center space-x-2"
          >
            <Brain className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              Intellisync AI
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "transition-colors hover:text-foreground/80",
                  location.pathname === item.path
                    ? "text-foreground"
                    : "text-foreground/60"
                )}
              >
                <div className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default NavHeader;
