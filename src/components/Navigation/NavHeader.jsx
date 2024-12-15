import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

const NavHeader = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { path: '/general', label: 'General Assistant', description: 'Your helpful AI companion for general tasks' },
    { path: '/creative', label: 'Creative Writer', description: 'An AI focused on creative writing and storytelling' },
    { path: '/coder', label: 'Code Expert', description: 'Technical assistant specialized in programming' },
    { path: '/researcher', label: 'Research Assistant', description: 'Academic and research-focused AI helper' },
    { path: '/business', label: 'Business Consultant', description: 'Strategic advisor for business and entrepreneurship' },
    { path: '/language', label: 'Language Tutor', description: 'Expert in language learning and linguistics' },
    { path: '/health', label: 'Health Coach', description: 'Guide for health, wellness, and lifestyle improvement' },
    { path: '/travel', label: 'Travel Guide', description: 'Expert in travel planning and global destinations' },
    { path: '/stem', label: 'Math & Science', description: 'STEM education specialist' },
  ];

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">Intellisync Solutions</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden sm:flex sm:flex-1 sm:justify-center">
            <div className="flex space-x-4 overflow-x-auto">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md',
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                  title={item.description}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'block px-3 py-2 rounded-md text-base font-medium',
                    location.pathname === item.path
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavHeader;
