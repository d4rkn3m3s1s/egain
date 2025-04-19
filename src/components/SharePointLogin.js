import React, { useState } from 'react';
import './SharePointLogin.css';

const SharePointLogin = ({ isOpen, onClose, onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    siteUrl: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulate API call - replace with actual SharePoint authentication
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo, just pass authentication with any credentials
      onLogin({
        authenticated: true,
        username: credentials.username,
        siteUrl: credentials.siteUrl
      });
      
      onClose();
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="sharepoint-login-overlay">
      <div className="sharepoint-login-modal">
        <div className="sharepoint-login-header">
          <h2>Connect to SharePoint</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="sharepoint-login-content">
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="siteUrl">SharePoint Site URL</label>
              <input
                type="text"
                id="siteUrl"
                name="siteUrl"
                placeholder="https://yourcompany.sharepoint.com/sites/yoursite"
                value={credentials.siteUrl}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="your.email@company.com"
                value={credentials.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Your password"
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-group">
              <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
              <button 
                type="submit" 
                className="connect-button"
                disabled={isLoading}
              >
                {isLoading ? 'Connecting...' : 'Connect'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SharePointLogin; 