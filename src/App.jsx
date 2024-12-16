import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TooltipProvider } from './components/ui/tooltip';
import NavHeader from './components/Navigation/NavHeader';
import LandingPage from './pages/LandingPage';

// Import SME Business Assistant pages
import GeneralAssistant from './pages/GeneralAssistant';
import CEOAssistant from './pages/CEOAssistant';
import CFOAssistant from './pages/CFOAssistant';
import HRAssistant from './pages/HRAssistant';
import EmployeeRelationsAssistant from './pages/EmployeeRelationsAssistant';
import SalesManagerAssistant from './pages/SalesManagerAssistant';
import CMOAssistant from './pages/CMOAssistant';
import LegalAdvisorAssistant from './pages/LegalAdvisorAssistant';
import OperationsManagerAssistant from './pages/OperationsManagerAssistant';

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
            <Route path="/ceo-assistant" element={<PageWithNav><CEOAssistant /></PageWithNav>} />
            <Route path="/cfo-assistant" element={<PageWithNav><CFOAssistant /></PageWithNav>} />
            <Route path="/hr-assistant" element={<PageWithNav><HRAssistant /></PageWithNav>} />
            <Route path="/employee-relations-assistant" element={<PageWithNav><EmployeeRelationsAssistant /></PageWithNav>} />
            <Route path="/sales-manager-assistant" element={<PageWithNav><SalesManagerAssistant /></PageWithNav>} />
            <Route path="/cmo-assistant" element={<PageWithNav><CMOAssistant /></PageWithNav>} />
            <Route path="/legal-advisor-assistant" element={<PageWithNav><LegalAdvisorAssistant /></PageWithNav>} />
            <Route path="/operations-manager-assistant" element={<PageWithNav><OperationsManagerAssistant /></PageWithNav>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </TooltipProvider>
    </Router>
  );
}

export default App;