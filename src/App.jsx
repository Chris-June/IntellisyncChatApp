import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavHeader from './components/Navigation/NavHeader';
import Landing from './pages/Landing';
import GeneralAssistant from './pages/GeneralAssistant';
import CreativeWriter from './pages/CreativeWriter';
import CodeExpert from './pages/CodeExpert';
import ResearchAssistant from './pages/ResearchAssistant';
import BusinessConsultant from './pages/BusinessConsultant';
import LanguageTutor from './pages/LanguageTutor';
import HealthCoach from './pages/HealthCoach';
import TravelGuide from './pages/TravelGuide';
import MathScienceTutor from './pages/MathScienceTutor';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Routes>
          <Route
            path="/"
            element={<Landing />}
          />
          <Route
            path="/*"
            element={
              <>
                <NavHeader />
                <main className="container mx-auto px-4 py-8">
                  <Routes>
                    <Route path="/general" element={<GeneralAssistant />} />
                    <Route path="/creative" element={<CreativeWriter />} />
                    <Route path="/coder" element={<CodeExpert />} />
                    <Route path="/researcher" element={<ResearchAssistant />} />
                    <Route path="/business" element={<BusinessConsultant />} />
                    <Route path="/language" element={<LanguageTutor />} />
                    <Route path="/health" element={<HealthCoach />} />
                    <Route path="/travel" element={<TravelGuide />} />
                    <Route path="/stem" element={<MathScienceTutor />} />
                  </Routes>
                </main>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;