import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TooltipProvider } from './components/ui/tooltip';
import NavHeader from './components/Navigation/NavHeader';
import LandingPage from './pages/LandingPage';

// Import Educational Assistant pages
import MathAssistant from './pages/MathAssistant';
import EnglishAssistant from './pages/EnglishAssistant';
import ScienceAssistant from './pages/ScienceAssistant';
import HistoryAssistant from './pages/HistoryAssistant';
import FrenchLanguageAssistant from './pages/FrenchLanguageAssistant';
import SocialStudiesAssistant from './pages/SocialStudiesAssistant';
import GuidanceCouncilorAssistant from './pages/GuidanceCouncilorAssistant';
import GeographyAssistant from './pages/GeographyAssistant';
import HealthWellnessAssistant from './pages/HealthWellnessAssistant';

const PageWithNav = ({ children }) => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <NavHeader />
      <main className="min-h-screen pt-16">
        {children}
      </main>
    </>
  );
};

function App() {
  return (
    <Router>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/guidance-counselor" element={<PageWithNav><GuidanceCouncilorAssistant /></PageWithNav>} />
            <Route path="/english" element={<PageWithNav><EnglishAssistant /></PageWithNav>} />
            <Route path="/french-language" element={<PageWithNav><FrenchLanguageAssistant /></PageWithNav>} />
            <Route path="/geography" element={<PageWithNav><GeographyAssistant /></PageWithNav>} />
            <Route path="/health-wellness" element={<PageWithNav><HealthWellnessAssistant /></PageWithNav>} />
            <Route path="/history" element={<PageWithNav><HistoryAssistant /></PageWithNav>} />
            <Route path="/math" element={<PageWithNav><MathAssistant /></PageWithNav>} />
            <Route path="/science" element={<PageWithNav><ScienceAssistant /></PageWithNav>} />
            <Route path="/social-studies" element={<PageWithNav><SocialStudiesAssistant /></PageWithNav>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </TooltipProvider>
    </Router>
  );
}

export default App;