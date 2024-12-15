import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
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
  ArrowRight,
  Github,
  Twitter,
  Mail
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'General Assistant',
    description: 'Your everyday AI companion for any task or question',
    path: '/'
  },
  {
    icon: PenTool,
    title: 'Creative Writer',
    description: 'Unleash creativity with AI-powered writing assistance',
    path: '/creative'
  },
  {
    icon: Code,
    title: 'Code Expert',
    description: 'Technical guidance and coding solutions',
    path: '/coder'
  },
  {
    icon: BookOpen,
    title: 'Research Assistant',
    description: 'Academic and research support with detailed analysis',
    path: '/researcher'
  },
  {
    icon: Briefcase,
    title: 'Business Consultant',
    description: 'Strategic business insights and planning',
    path: '/business'
  },
  {
    icon: Languages,
    title: 'Language Tutor',
    description: 'Master new languages with personalized tutoring',
    path: '/language'
  },
  {
    icon: Heart,
    title: 'Health Coach',
    description: 'Guidance for health and wellness improvement',
    path: '/health'
  },
  {
    icon: Plane,
    title: 'Travel Guide',
    description: 'Expert travel planning and recommendations',
    path: '/travel'
  },
  {
    icon: Calculator,
    title: 'Math & Science',
    description: 'STEM education and problem-solving support',
    path: '/stem'
  }
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Your AI-Powered
              <br />
              Conversation Hub
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the power of specialized AI assistants, each expertly designed 
              to help you with specific tasks, from creative writing to technical problem-solving.
            </p>
            <div className="mt-10">
              <Link to="/creative">
                <Button size="lg" className="mr-4">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline" size="lg">
                  Try Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            Specialized AI Assistants for Every Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link 
                key={feature.path} 
                to={feature.path}
                className="group relative p-6 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-background border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">Intellisync Solutions</h3>
              <p className="text-muted-foreground">
                Empowering businesses with intelligent AI solutions.
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://home.intellisyncsolutions.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    GPT Builder Home
                  </a>
                </li>
                <li>
                  <a 
                    href="https://intellisyncsolutions.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    GPT Builder Platform
                  </a>
                </li>
                <li>
                  <a 
                    href="https://docs.intellisyncsolutions.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary"
                  >
                    GPT Builder Documentation
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                <a 
                  href="mailto:chris.june@intellisync.ca"
                  className="flex items-center text-muted-foreground hover:text-primary"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  chris.june@intellisync.ca
                </a>
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/company/intellisync-solutions/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  href="https://x.com/Intelli_Sync"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t">
            <p className="text-center text-muted-foreground">
              {new Date().getFullYear()} Powered by Intellisync Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
