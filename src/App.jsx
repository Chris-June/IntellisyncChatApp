import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/general-assistant" element={<GeneralAssistant />} />
          <Route path="/business-consultant" element={<BusinessConsultant />} />
          <Route path="/code-expert" element={<CodeExpert />} />
          <Route path="/creative-writer" element={<CreativeWriter />} />
          <Route path="/health-coach" element={<HealthCoach />} />
          <Route path="/language-tutor" element={<LanguageTutor />} />
          <Route path="/math-science-tutor" element={<MathScienceTutor />} />
          <Route path="/research-assistant" element={<ResearchAssistant />} />
          <Route path="/travel-guide" element={<TravelGuide />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;