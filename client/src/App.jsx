import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuestionnaireProvider } from './context';
import QuestionnaireFlow from './pages/QuestionnaireFlow';
import { TopNavbar } from './components/common/Navigation';
import './styles/variables.css';
import './styles/globals.css';

function App() {
  const handleMenuClick = () => {
    // Handle menu click - can be expanded for drawer/sidebar
    console.log('Menu clicked');
  };

  return (
    <QuestionnaireProvider>
      <Router>
        <div className="app">
          <TopNavbar onMenuClick={handleMenuClick} />
          <Routes>
            <Route path="/questionnaire/*" element={<QuestionnaireFlow />} />
            <Route path="/" element={<Navigate to="/questionnaire" replace />} />
            <Route path="*" element={<Navigate to="/questionnaire" replace />} />
          </Routes>
        </div>
      </Router>
    </QuestionnaireProvider>
  );
}

export default App;
