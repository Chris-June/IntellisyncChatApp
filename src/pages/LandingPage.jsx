import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Brain,
  Code,
  Briefcase,
  PenTool,
  Heart,
  Languages,
  Calculator,
  BookOpen,
  Plane,
  ArrowRight,
  Github,
  Twitter,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '../components/Layout/Footer';

const assistants = [
  {
    name: 'Chris',
    role: 'General Assistant',
    description: 'Your versatile AI companion for any task',
    icon: Brain,
    path: '/general-assistant',
    color: 'bg-blue-500'
  },
  {
    name: 'Dev',
    role: 'Code Expert',
    description: 'Technical guidance and programming solutions',
    icon: Code,
    path: '/code-expert',
    color: 'bg-purple-500'
  },
  {
    name: 'Alex',
    role: 'Business Consultant',
    description: 'Strategic business insights and planning',
    icon: Briefcase,
    path: '/business-consultant',
    color: 'bg-green-500'
  },
  {
    name: 'Maya',
    role: 'Creative Writer',
    description: 'Unleash your creative writing potential',
    icon: PenTool,
    path: '/creative-writer',
    color: 'bg-pink-500'
  },
  {
    name: 'Sage',
    role: 'Health Coach',
    description: 'Guidance for your wellness journey',
    icon: Heart,
    path: '/health-coach',
    color: 'bg-red-500'
  },
  {
    name: 'Lingo',
    role: 'Language Tutor',
    description: 'Master new languages effectively',
    icon: Languages,
    path: '/language-tutor',
    color: 'bg-yellow-500'
  },
  {
    name: 'Newton',
    role: 'Math & Science Tutor',
    description: 'Clear explanations for STEM topics',
    icon: Calculator,
    path: '/math-science-tutor',
    color: 'bg-indigo-500'
  },
  {
    name: 'Scholar',
    role: 'Research Assistant',
    description: 'Academic research and analysis support',
    icon: BookOpen,
    path: '/research-assistant',
    color: 'bg-orange-500'
  },
  {
    name: 'Marco',
    role: 'Travel Guide',
    description: 'Expert travel planning and recommendations',
    icon: Plane,
    path: '/travel-guide',
    color: 'bg-teal-500'
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center">
              <motion.h1 
                className="text-4xl sm:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Your AI-Powered
                <br />
                Conversation Hub
              </motion.h1>
              <motion.p 
                className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Experience the power of specialized AI assistants, each expertly designed 
                to help you with specific tasks, from creative writing to technical problem-solving.
              </motion.p>
              <motion.div 
                className="mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link to="/creative-writer">
                  <Button size="lg" className="mr-4">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/general-assistant">
                  <Button variant="outline" size="lg">
                    Try Demo
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 px-6 bg-muted/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div 
                className="p-6 bg-card rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-3">Personal Connection</h3>
                <p className="text-muted-foreground">Each assistant remembers your name and preferences for a truly personalized experience.</p>
              </motion.div>
              <motion.div 
                className="p-6 bg-card rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <h3 className="text-xl font-semibold mb-3">Specialized Expertise</h3>
                <p className="text-muted-foreground">Nine unique AI personalities, each with deep knowledge in their respective fields.</p>
              </motion.div>
              <motion.div 
                className="p-6 bg-card rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <h3 className="text-xl font-semibold mb-3">Seamless Interaction</h3>
                <p className="text-muted-foreground">Natural conversations with context-aware responses and helpful suggestions.</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Assistants Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Choose Your Assistant</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {assistants.map((assistant, index) => (
                <motion.div
                  key={assistant.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link 
                    to={assistant.path}
                    className="block p-6 bg-card rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className={`w-12 h-12 ${assistant.color} rounded-full flex items-center justify-center mb-4`}>
                      <assistant.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{assistant.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{assistant.role}</p>
                    <p className="text-sm text-muted-foreground">{assistant.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </div>
  );
};

export default LandingPage;
