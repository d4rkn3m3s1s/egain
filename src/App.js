import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SalesforceInstance from './pages/SalesforceInstance';
import SharepointIntegration from './pages/SharepointIntegration';

function App() {
  return (
    <div className="app-layout">
      <Header />
      <div className="content-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<SharepointIntegration />} />
            <Route path="/salesforce" element={<SalesforceInstance />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App; 