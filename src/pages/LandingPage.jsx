import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  Brain,
  Briefcase,
  DollarSign,
  Users,
  Building,
  TrendingUp,
  Megaphone,
  FileText,
  Settings
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Footer from '../components/Layout/Footer';
import FeatureModal from '../components/Modals/FeatureModal';

const iconComponents = {
  Brain,
  Briefcase,
  DollarSign,
  Users,
  Building,
  TrendingUp,
  Megaphone,
  FileText,
  Settings
};

const assistants = [
  {
    name: 'Intellisync Solutions',
    role: 'General Assistant',
    description: 'Your versatile AI companion for business support',
    icon: 'Brain', // General-purpose assistant
    path: '/general-assistant',
    color: 'bg-blue-500'
  },
  {
    name: 'CEO Assistant',
    role: 'Strategic Advisor',
    description: 'Guidance for vision setting and leadership',
    icon: 'Briefcase', // Leadership and executive strategy
    path: '/ceo-assistant',
    color: 'bg-purple-500'
  },
  {
    name: 'CFO Assistant',
    role: 'Financial Expert',
    description: 'Insights into budgeting, forecasting, and financial planning',
    icon: 'DollarSign', // Finance and budgeting
    path: '/cfo-assistant',
    color: 'bg-green-500'
  },
  {
    name: 'HR Assistant',
    role: 'HR Specialist',
    description: 'Support for employee management and organizational culture',
    icon: 'Users', // Employee management and HR
    path: '/hr-assistant',
    color: 'bg-pink-500'
  },
  {
    name: 'Employee Relations Assistant',
    role: 'Conflict Resolver',
    description: 'Promoting workplace harmony and employee engagement',
    icon: 'Building', // Office/building icon for employee relations
    path: '/employee-relations-assistant',
    color: 'bg-red-500'
  },
  {
    name: 'Sales Manager Assistant',
    role: 'Sales Strategist',
    description: 'Data-backed strategies to drive revenue growth',
    icon: 'TrendingUp', // Sales growth and revenue trends
    path: '/sales-manager-assistant',
    color: 'bg-yellow-500'
  },
  {
    name: 'CMO Assistant',
    role: 'Marketing Expert',
    description: 'Creative solutions for marketing and brand strategy',
    icon: 'Megaphone', // Marketing and outreach
    path: '/cmo-assistant',
    color: 'bg-indigo-500'
  },
  {
    name: 'Legal Advisor Assistant',
    role: 'Legal Expert',
    description: 'Compliance, contracts, and risk management guidance',
    icon: 'FileText', // Legal documents and compliance
    path: '/legal-advisor-assistant',
    color: 'bg-orange-500'
  },
  {
    name: 'Operations Manager Assistant',
    role: 'Operational Optimizer',
    description: 'Process improvements and operational planning support',
    icon: 'Settings', // Settings icon for operations and efficiency
    path: '/operations-manager-assistant',
    color: 'bg-teal-500'
  }
];

const LandingPage = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

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
                Intellisync AI-Powered
                <br />
                Executive Assistants
              </motion.h1>
              <motion.p 
                className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
               Experience the power of specialized Executive AI Assistants, each expertly tailored to support your business needs—from strategic decision-making and financial planning to employee management and marketing strategy.
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
              </motion.div>
            </div>
          </div>
        </section>

       {/* Features Section */}
<section className="py-12 px-6 bg-muted/50">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
    <div className="grid md:grid-cols-3 gap-8">
      {[
        "Personal Connection",
        "Specialized Expertise",
        "Seamless Interaction",
        "Strategic Insights",
        "Proactive Suggestions",
        "Enhanced Collaboration"
      ].map((feature, index) => (
        <motion.div 
          key={feature}
          className="p-6 bg-card rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
        >
          <h3 className="text-xl font-semibold mb-3">{feature}</h3>
          <p className="text-muted-foreground mb-4">
            {feature === "Personal Connection" && "Each assistant remembers your name and preferences for a truly personalized experience."}
            {feature === "Specialized Expertise" && "Nine unique AI personalities, each with deep knowledge in their respective fields."}
            {feature === "Seamless Interaction" && "Natural conversations with context-aware responses and helpful suggestions."}
            {feature === "Strategic Insights" && "Access actionable data-driven insights to make informed business decisions with confidence."}
            {feature === "Proactive Suggestions" && "Receive proactive recommendations tailored to your business goals, challenges, and opportunities."}
            {feature === "Enhanced Collaboration" && "Seamlessly integrate with your team, enhancing collaboration and streamlining workflows."}
          </p>
          <Button 
            variant="outline" 
            onClick={() => setSelectedFeature(feature)}
            className="w-full"
          >
            Learn More
          </Button>
        </motion.div>
      ))}
    </div>
  </div>
</section>

        {/* Assistants Grid */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Your AI Assistants</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {assistants.map((assistant, index) => {
                const IconComponent = iconComponents[assistant.icon];
                return (
                  <motion.div
                    key={assistant.name}
                    className={`p-6 rounded-lg shadow-lg ${assistant.color} bg-opacity-10 hover:bg-opacity-20 transition-all duration-300`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`p-2 rounded-lg ${assistant.color} bg-opacity-20`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold">{assistant.name}</h3>
                        <p className="text-sm text-muted-foreground">{assistant.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{assistant.description}</p>
                    <Link to={assistant.path}>
                      <Button className="w-full">
                        Start Chat
                      </Button>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
      <FeatureModal
        isOpen={!!selectedFeature}
        onClose={() => setSelectedFeature(null)}
        feature={selectedFeature}
      />
    </div>
  );
};

export default LandingPage;
