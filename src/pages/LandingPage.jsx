import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowRight,
  BookOpen,
  Languages,
  Globe,
  GraduationCap,
  Heart,
  BookText,
  Calculator,
  Microscope,
  Users
} from 'lucide-react';
import { Button } from '../components/ui/button';
import Footer from '../components/Layout/Footer';
import FeatureModal from '../components/Modals/FeatureModal';

const iconComponents = {
  BookOpen,
  Languages,
  Globe,
  GraduationCap,
  Heart,
  BookText,
  Calculator,
  Microscope,
  Users
};

const assistants = [
  {
    name: 'English Assistant',
    role: 'Language & Literature Expert',
    description: 'Master English language, literature, and writing skills',
    icon: 'BookOpen',
    path: '/english',
    color: 'bg-blue-500'
  },
  {
    name: 'French Language Assistant',
    role: 'French Language Expert',
    description: 'Learn French through interactive conversations and lessons',
    icon: 'Languages',
    path: '/french',
    color: 'bg-purple-500'
  },
  {
    name: 'Geography Assistant',
    role: 'Geography Expert',
    description: 'Explore world geography, cultures, and environments',
    icon: 'Globe',
    path: '/geography',
    color: 'bg-green-500'
  },
  {
    name: 'Guidance Counselor Assistant',
    role: 'Academic & Career Advisor',
    description: 'Get guidance on academic and career planning',
    icon: 'GraduationCap',
    path: '/guidance',
    color: 'bg-pink-500'
  },
  {
    name: 'Health Wellness Assistant',
    role: 'Health Education Expert',
    description: 'Learn about health, wellness, and physical education',
    icon: 'Heart',
    path: '/health-wellness',
    color: 'bg-red-500'
  },
  {
    name: 'History Assistant',
    role: 'History Expert',
    description: 'Discover and understand historical events and contexts',
    icon: 'BookText',
    path: '/history',
    color: 'bg-yellow-500'
  },
  {
    name: 'Math Assistant',
    role: 'Mathematics Expert',
    description: 'Master mathematics from basic to advanced concepts',
    icon: 'Calculator',
    path: '/math',
    color: 'bg-indigo-500'
  },
  {
    name: 'Science Assistant',
    role: 'Science Expert',
    description: 'Explore scientific concepts across various disciplines',
    icon: 'Microscope',
    path: '/science',
    color: 'bg-orange-500'
  },
  {
    name: 'Social Studies Assistant',
    role: 'Social Studies Expert',
    description: 'Understand society, civics, and social phenomena',
    icon: 'Users',
    path: '/social-studies',
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
                AI-Powered
                <br />
                Education Assistants
              </motion.h1>
              <motion.p 
                className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Experience personalized learning with our specialized Education AI Assistants. From mathematics and sciences to literature and test preparation, get expert guidance tailored to your educational journey.
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
        "Personalized Learning",
        "Expert Knowledge",
        "Interactive Learning",
        "Progress Tracking",
        "24/7 Availability",
        "Multi-subject Support"
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
            {feature === "Personalized Learning" && "Adaptive learning paths tailored to your unique needs and learning style."}
            {feature === "Expert Knowledge" && "Access to deep subject expertise across multiple academic disciplines."}
            {feature === "Interactive Learning" && "Engage in dynamic conversations and receive instant feedback on your work."}
            {feature === "Progress Tracking" && "Monitor your academic growth with detailed progress tracking and analytics."}
            {feature === "24/7 Availability" && "Get help whenever you need it, day or night, without scheduling constraints."}
            {feature === "Multi-subject Support" && "Comprehensive assistance across various subjects and academic levels."}
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
