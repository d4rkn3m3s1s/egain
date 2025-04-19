import React from 'react';
import { useNavigate } from 'react-router-dom';

const AuthenticationPage = () => {
  const navigate = useNavigate();

  const handlePersonalAuth = () => {
    // Authentication logic would go here
    navigate('/search');
  };

  const handleOrgAuth = () => {
    // Organization-level authentication logic would go here
    navigate('/admin');
  };

  return (
    <div className="container">
      <div className="auth-card">
        <div className="text-center mb-6">
          <img 
            src="/logo.svg" 
            alt="Company Logo" 
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="text-2xl font-semibold mb-2">eGain SharePoint Integration</h1>
          <p className="text-gray-600">Connect eGain to your SharePoint content</p>
        </div>

        <div className="flex flex-col gap-4">
          <button 
            className="btn-primary" 
            onClick={handlePersonalAuth}
          >
            Authorize for myself
          </button>
          
          <button 
            className="btn-secondary" 
            onClick={handleOrgAuth}
          >
            Authorize for my organization
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationPage; 