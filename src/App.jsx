import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TooltipProvider } from './components/ui/tooltip';
import { ToastProvider } from './contexts/ToastContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { BreadcrumbProvider } from './contexts/BreadcrumbContext';
import { KeyboardShortcutProvider } from './contexts/KeyboardShortcutContext';
import ToastContainer from './components/Toast/ToastContainer';
import NavHeader from './components/Navigation/NavHeader';
import BreadcrumbWrapper from './components/Navigation/BreadcrumbWrapper';
import KeyboardShortcutHelper from './components/Navigation/KeyboardShortcutHelper';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';

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
    <BreadcrumbProvider>
      <LoadingProvider>
        <ToastProvider>
          <Router>
            <KeyboardShortcutProvider>
              <TooltipProvider>
                <div className="min-h-screen bg-background text-foreground">
                  <BreadcrumbWrapper />
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<PageWithNav><Dashboard /></PageWithNav>} />
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
                  <KeyboardShortcutHelper />
                </div>
              </TooltipProvider>
            </KeyboardShortcutProvider>
          </Router>
          <ToastContainer />
        </ToastProvider>
      </LoadingProvider>
    </BreadcrumbProvider>
  );
}

export default App;