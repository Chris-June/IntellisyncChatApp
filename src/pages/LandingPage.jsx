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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import FeatureCarousel from '../components/Features/FeatureCarousel';

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

const languageAssistants = [
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
    path: '/french-language',
    color: 'bg-purple-500'
  },
  {
    name: 'Spanish Language Assistant',
    role: 'Spanish Language Expert',
    description: 'Learn Spanish with personalized lessons and cultural insights',
    icon: 'Languages',
    path: '/spanish-language',
    color: 'bg-pink-500'
  },
  {
    name: 'German Language Assistant',
    role: 'German Language Expert',
    description: 'Master German grammar and conversation skills',
    icon: 'Languages',
    path: '/german-language',
    color: 'bg-cyan-500'
  },
  {
    name: 'Japanese Language Assistant',
    role: 'Japanese Language Expert',
    description: 'Learn Japanese writing systems and conversation',
    icon: 'Languages',
    path: '/japanese-language',
    color: 'bg-rose-500'
  },
  {
    name: 'Creative Writing Assistant',
    role: 'Writing Expert',
    description: 'Develop creative writing skills and storytelling techniques',
    icon: 'BookText',
    path: '/creative-writing',
    color: 'bg-emerald-500'
  }
];

const scienceAssistants = [
  {
    name: 'Geography Assistant',
    role: 'Geography Expert',
    description: 'Explore world geography, cultures, and environments',
    icon: 'Globe',
    path: '/geography',
    color: 'bg-green-500'
  },
  {
    name: 'Biology Assistant',
    role: 'Biology Expert',
    description: 'Understand life sciences and biological systems',
    icon: 'Microscope',
    path: '/biology',
    color: 'bg-teal-500'
  },
  {
    name: 'Chemistry Assistant',
    role: 'Chemistry Expert',
    description: 'Master chemical concepts and reactions',
    icon: 'Microscope',
    path: '/chemistry',
    color: 'bg-indigo-500'
  },
  {
    name: 'Environmental Science Assistant',
    role: 'Environmental Expert',
    description: 'Learn about ecosystems and environmental conservation',
    icon: 'Globe',
    path: '/environmental-science',
    color: 'bg-lime-500'
  },
  {
    name: 'Astronomy Assistant',
    role: 'Astronomy Expert',
    description: 'Explore the cosmos and celestial phenomena',
    icon: 'Globe',
    path: '/astronomy',
    color: 'bg-violet-500'
  },
  {
    name: 'Computer Science Assistant',
    role: 'CS Expert',
    description: 'Learn programming and computer science concepts',
    icon: 'Calculator',
    path: '/computer-science',
    color: 'bg-sky-500'
  }
];

const mathAssistants = [
  {
    name: 'Math Assistant',
    role: 'Mathematics Expert',
    description: 'Excel in mathematics from basics to advanced topics',
    icon: 'Calculator',
    path: '/math',
    color: 'bg-orange-500'
  },
  {
    name: 'Statistics Assistant',
    role: 'Statistics Expert',
    description: 'Master statistical analysis and probability',
    icon: 'Calculator',
    path: '/statistics',
    color: 'bg-red-500'
  },
  {
    name: 'Physics Assistant',
    role: 'Physics Expert',
    description: 'Understand physical principles and problem-solving',
    icon: 'Calculator',
    path: '/physics',
    color: 'bg-yellow-500'
  },
  {
    name: 'Calculus Assistant',
    role: 'Calculus Expert',
    description: 'Master derivatives, integrals, and advanced calculus',
    icon: 'Calculator',
    path: '/calculus',
    color: 'bg-amber-500'
  },
  {
    name: 'Linear Algebra Assistant',
    role: 'Linear Algebra Expert',
    description: 'Learn matrices, vectors, and linear transformations',
    icon: 'Calculator',
    path: '/linear-algebra',
    color: 'bg-fuchsia-500'
  },
  {
    name: 'Geometry Assistant',
    role: 'Geometry Expert',
    description: 'Explore geometric concepts and proofs',
    icon: 'Calculator',
    path: '/geometry',
    color: 'bg-slate-500'
  }
];

const educationalFeatures = [
  {
    title: "Personalized Learning",
    description: "Adaptive learning paths tailored to your unique needs and learning style.",
    icon: "🎯"
  },
  {
    title: "Expert Knowledge",
    description: "Access to deep subject expertise across multiple academic disciplines.",
    icon: "🧠"
  },
  {
    title: "Interactive Learning",
    description: "Engage in dynamic conversations and receive instant feedback on your work.",
    icon: "💡"
  },
  {
    title: "Progress Tracking",
    description: "Monitor your academic growth with detailed progress tracking and analytics.",
    icon: "📊"
  },
  {
    title: "24/7 Availability",
    description: "Get help whenever you need it, day or night, without scheduling constraints.",
    icon: "⏰"
  },
  {
    title: "Multi-subject Support",
    description: "Comprehensive assistance across various subjects and academic levels.",
    icon: "📚"
  }
];

const technicalFeatures = [
  {
    title: "Enhanced User Experience",
    description: "Modern UI with real-time feedback, keyboard shortcuts, and intuitive navigation. Press '?' to view shortcuts.",
    icon: "✨"
  },
  {
    title: "Smart Form Validation",
    description: "Real-time form validation with password strength indicators and helpful error messages.",
    icon: "🔒"
  },
  {
    title: "Instant Feedback",
    description: "Toast notifications and loading states keep you informed of all actions and processes.",
    icon: "📬"
  },
  {
    title: "Seamless Navigation",
    description: "Breadcrumb navigation and keyboard shortcuts for quick access to any section.",
    icon: "🧭"
  },
  {
    title: "Responsive Design",
    description: "Optimized for all devices with smooth animations and transitions.",
    icon: "📱"
  },
  {
    title: "Accessibility First",
    description: "Built with ARIA support and keyboard navigation for all users.",
    icon: "♿"
  }
];

const communityFeatures = [
  {
    title: "Collaborative Learning",
    description: "Join study groups, share resources, and learn together with peers from around the world.",
    icon: "👥"
  },
  {
    title: "Expert Community",
    description: "Connect with teachers, tutors, and subject matter experts for guidance and mentorship.",
    icon: "🎓"
  },
  {
    title: "Resource Sharing",
    description: "Access and share study materials, notes, and educational resources with the community.",
    icon: "📋"
  },
  {
    title: "24/7 Support",
    description: "Get help anytime with our dedicated support team and community moderators.",
    icon: "💬"
  },
  {
    title: "Progress Sharing",
    description: "Share your achievements, get encouragement, and celebrate milestones together.",
    icon: "🏆"
  },
  {
    title: "Parent Connection",
    description: "Keep parents involved with progress updates and communication channels.",
    icon: "👨‍👩‍👧‍👦"
  }
];

const learningAssistants = [
  {
    title: "Study Buddy",
    description: "Your personal tutor for homework help, exam prep, and concept explanations.",
    icon: "📚"
  },
  {
    title: "Language Coach",
    description: "Master new languages with conversation practice and grammar assistance.",
    icon: "🗣️"
  },
  {
    title: "Math Mentor",
    description: "Step-by-step problem solving and mathematical concept visualization.",
    icon: "🔢"
  }
];

const researchAssistants = [
  {
    title: "Literature Explorer",
    description: "Find and analyze academic papers, articles, and research materials.",
    icon: "📖"
  },
  {
    title: "Data Analyst",
    description: "Help with data interpretation, statistics, and research methodology.",
    icon: "📊"
  },
  {
    title: "Citation Helper",
    description: "Manage references and format citations in various academic styles.",
    icon: "✏️"
  }
];

const projectAssistants = [
  {
    title: "Project Manager",
    description: "Track deadlines, organize tasks, and maintain project timelines.",
    icon: "📅"
  },
  {
    title: "Presentation Coach",
    description: "Help create and rehearse presentations with confidence.",
    icon: "🎯"
  },
  {
    title: "Team Coordinator",
    description: "Facilitate group work, assign tasks, and track progress.",
    icon: "👥"
  }
];

const stemTutors = [
  {
    title: "Math Master",
    description: "Expert in calculus, algebra, and advanced mathematics with visual problem-solving approaches.",
    icon: "➗"
  },
  {
    title: "Science Sage",
    description: "Specialized in physics, chemistry, and biology with interactive experiments and explanations.",
    icon: "🔬"
  },
  {
    title: "Tech Guru",
    description: "Coding, computer science, and engineering concepts made simple and practical.",
    icon: "💻"
  }
];

const humanitiesTutors = [
  {
    title: "Literature Guide",
    description: "Deep analysis of texts, creative writing, and literary theory exploration.",
    icon: "📚"
  },
  {
    title: "History Expert",
    description: "Making historical events come alive with engaging storytelling and context.",
    icon: "🏛️"
  },
  {
    title: "Arts & Culture Mentor",
    description: "Guidance in art history, music theory, and cultural studies.",
    icon: "🎨"
  }
];

const languageTutors = [
  {
    title: "Global Languages",
    description: "Master new languages with native-like fluency and cultural understanding.",
    icon: "🌍"
  },
  {
    title: "Writing Coach",
    description: "Perfect your writing skills in essays, research papers, and creative works.",
    icon: "✍️"
  },
  {
    title: "Speech Trainer",
    description: "Improve pronunciation, public speaking, and presentation skills.",
    icon: "🎤"
  }
];

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
    path: '/french-language',
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
    path: '/guidance-counselor',
    color: 'bg-pink-500'
  },
  {
    name: 'Health and Wellness Assistant',
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
    description: 'Explore societies, cultures, and civic education',
    icon: 'Users',
    path: '/social-studies',
    color: 'bg-emerald-500'
  }
];

const AssistantCard = ({ assistant }) => {
  const IconComponent = iconComponents[assistant.icon];
  const isOriginalAssistant = [
    'English Assistant',
    'French Language Assistant',
    'Geography Assistant',
    'Math Assistant',
    'Social Studies Assistant',
    'Guidance Counselor Assistant',
    'Health and Wellness Assistant',
    'History Assistant'
  ].includes(assistant.name);

  return (
    <motion.div
      className={`rounded-lg ${assistant.color} bg-opacity-10 p-6`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <IconComponent className="h-6 w-6 text-white mb-4" />
      <h3 className="text-xl font-semibold text-white mb-1">{assistant.name}</h3>
      <p className="text-sm text-gray-300 mb-2">{assistant.role}</p>
      <p className="text-sm text-gray-400 mb-4">{assistant.description}</p>
      {isOriginalAssistant ? (
        <Link to={assistant.path}>
          <Button variant="secondary" className="w-full bg-white/10 text-white hover:bg-white/20">
            Start Chat
          </Button>
        </Link>
      ) : (
        <Button variant="secondary" className="w-full bg-white/10 text-white hover:bg-white/20">
          Coming Soon
        </Button>
      )}
    </motion.div>
  );
};

const LandingPage = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-grow">
        
        {/* Hero Section */}
        <section className="bg-black text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6">AI-Powered Education Assistants</h1>
            <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Experience personalized learning with our specialized Education AI Assistants. 
              From mathematics and sciences to literature and test preparation, get expert guidance 
              tailored to your educational journey.
            </p>
            <Button className="bg-white text-black hover:bg-gray-100">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>

       {/* Features Section */}
<section className="bg-black py-20">
  <div className="container mx-auto px-4">
    <h2 className="text-4xl font-bold text-center text-white mb-12">Key Features</h2>
    <Tabs defaultValue="educational" className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList className="bg-zinc-900">
          <TabsTrigger value="educational" className="text-lg px-6">
            Educational Features
          </TabsTrigger>
          <TabsTrigger value="technical" className="text-lg px-6">
            Technical Features
          </TabsTrigger>
          <TabsTrigger value="community" className="text-lg px-6">
            Community & Support
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="educational" className="mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FeatureCarousel 
            features={educationalFeatures} 
            onFeatureClick={setSelectedFeature}
          />
        </motion.div>
      </TabsContent>

      <TabsContent value="technical" className="mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FeatureCarousel 
            features={technicalFeatures} 
            onFeatureClick={setSelectedFeature}
          />
        </motion.div>
      </TabsContent>

      <TabsContent value="community" className="mt-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FeatureCarousel 
            features={communityFeatures} 
            onFeatureClick={setSelectedFeature}
          />
        </motion.div>
      </TabsContent>
    </Tabs>
  </div>
</section>

        {/* Assistants Grid */}
        <section className="bg-black py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-white mb-12">Your AI Assistants</h2>
            <Tabs defaultValue="languages" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="bg-zinc-900">
                  <TabsTrigger value="languages" className="text-lg px-6">
                    Language & Literature
                  </TabsTrigger>
                  <TabsTrigger value="stem" className="text-lg px-6">
                    STEM
                  </TabsTrigger>
                  <TabsTrigger value="humanities" className="text-lg px-6">
                    Humanities
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="languages" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="px-6">
                    <FeatureCarousel
                      features={languageAssistants}
                      renderFeature={(assistant) => (
                        <div key={assistant.name} className="px-3">
                          <AssistantCard assistant={assistant} />
                        </div>
                      )}
                    />
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="stem" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="px-6">
                    <FeatureCarousel
                      features={scienceAssistants.concat(mathAssistants)}
                      renderFeature={(assistant) => (
                        <div key={assistant.name} className="px-3">
                          <AssistantCard assistant={assistant} />
                        </div>
                      )}
                    />
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="humanities" className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="px-6">
                    <FeatureCarousel
                      features={assistants.filter(a => [
                        'Geography Assistant',
                        'History Assistant',
                        'Social Studies Assistant',
                        'Health and Wellness Assistant',
                        'Guidance Counselor Assistant'
                      ].includes(a.name))}
                      renderFeature={(assistant) => (
                        <div key={assistant.name} className="px-3">
                          <AssistantCard assistant={assistant} />
                        </div>
                      )}
                    />
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
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
