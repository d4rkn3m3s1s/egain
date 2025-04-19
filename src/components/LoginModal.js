import React, { useState } from 'react';
import './LoginModal.css';

const LoginModal = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for authentication
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, you would verify credentials with SharePoint API
      onLoginSuccess();
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Connect to SharePoint</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <form onSubmit={handleLogin}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your SharePoint username"
                disabled={isLoading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                disabled={isLoading}
              />
            </div>
            
            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-button" 
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="login-button"
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

export default LoginModal; 