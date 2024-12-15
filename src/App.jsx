import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TooltipProvider } from './components/ui/tooltip';
import NavHeader from './components/Navigation/NavHeader';
import LandingPage from './pages/LandingPage';
import GeneralAssistant from './pages/GeneralAssistant';
import BusinessConsultant from './pages/BusinessConsultant';
import CodeExpert from './pages/CodeExpert';
import CreativeWriter from './pages/CreativeWriter';
import HealthCoach from './pages/HealthCoach';
import LanguageTutor from './pages/LanguageTutor';
import MathScienceTutor from './pages/MathScienceTutor';
import ResearchAssistant from './pages/ResearchAssistant';
import TravelGuide from './pages/TravelGuide';

const PageWithNav = ({ children }) => (
  <>
    <NavHeader />
    <main className="min-h-screen">
      {children}
    </main>
  </>
);

function App() {
  return (
    <Router>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/general-assistant" element={<PageWithNav><GeneralAssistant /></PageWithNav>} />
            <Route path="/business-consultant" element={<PageWithNav><BusinessConsultant /></PageWithNav>} />
            <Route path="/code-expert" element={<PageWithNav><CodeExpert /></PageWithNav>} />
            <Route path="/creative-writer" element={<PageWithNav><CreativeWriter /></PageWithNav>} />
            <Route path="/health-coach" element={<PageWithNav><HealthCoach /></PageWithNav>} />
            <Route path="/language-tutor" element={<PageWithNav><LanguageTutor /></PageWithNav>} />
            <Route path="/math-science-tutor" element={<PageWithNav><MathScienceTutor /></PageWithNav>} />
            <Route path="/research-assistant" element={<PageWithNav><ResearchAssistant /></PageWithNav>} />
            <Route path="/travel-guide" element={<PageWithNav><TravelGuide /></PageWithNav>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </TooltipProvider>
    </Router>
  );
}

export default App;