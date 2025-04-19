import React, { useState } from 'react';
import './SharePointIntegration.css';
import LoginModal from './LoginModal';
import OverviewChart from './OverviewChart';
import SharePointActivityChart from './SharePointActivityChart';

const SharePointIntegration = () => {
  const [activeView, setActiveView] = useState('default');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleConnect = () => {
    setShowLoginModal(true);
  };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  const handleLoginSuccess = (user) => {
    // Update connection state
    setIsConnected(true);
    setUserData(user);
    setShowLoginModal(false);
    setActiveView('overview');
    
    // In a real app, you might fetch data from SharePoint here
  };

  // Sample data for the chart
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    values: [65, 59, 80, 81, 56, 55, 40, 45, 60, 70, 85, 90]
  };

  return (
    <div className="sharepoint-integration">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>SharePoint Integration</h2>
        </div>
        <nav className="nav-menu">
          <ul>
            <li className={activeView === 'default' ? 'active' : ''} onClick={() => setActiveView('default')}>
              Home
            </li>
            {isConnected && (
              <>
                <li className={activeView === 'overview' ? 'active' : ''} onClick={() => setActiveView('overview')}>
                  Overview
                </li>
                <li className={activeView === 'documents' ? 'active' : ''} onClick={() => setActiveView('documents')}>
                  Documents
                </li>
                <li className={activeView === 'settings' ? 'active' : ''} onClick={() => setActiveView('settings')}>
                  Settings
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      <div className="main-content">
        {activeView === 'default' && (
          <div className="default-view">
            <h1>Welcome to eGain-SharePoint Integration</h1>
            <p>
              Connect your SharePoint account to access and manage your documents directly from eGain.
            </p>
            {!isConnected ? (
              <button className="connect-button" onClick={handleConnect}>
                Connect to SharePoint
              </button>
            ) : (
              <div className="connection-info">
                <div className="connected-status">
                  <span className="status-dot"></span>
                  <span>Connected to SharePoint</span>
                </div>
                <p>Logged in as: {userData?.username}</p>
                <button className="disconnect-button" onClick={() => setIsConnected(false)}>
                  Disconnect
                </button>
              </div>
            )}
          </div>
        )}

        {activeView === 'overview' && (
          <div className="overview-section">
            <h1>Overview</h1>
            <div className="stats-container">
              <div className="stat-card">
                <h3>Documents</h3>
                <p className="stat-number">126</p>
              </div>
              <div className="stat-card">
                <h3>Shared Files</h3>
                <p className="stat-number">42</p>
              </div>
              <div className="stat-card">
                <h3>Total Storage</h3>
                <p className="stat-number">2.4 GB</p>
              </div>
            </div>
            
            <div className="chart-container">
              <h2>Document Activity (Last 12 Months)</h2>
              <OverviewChart data={chartData} />
            </div>
            
            <SharePointActivityChart />
            
            <div className="recent-activity">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">📄</div>
                  <div className="activity-details">
                    <p className="activity-title">Customer Requirements.docx</p>
                    <p className="activity-meta">Modified 2 hours ago</p>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📊</div>
                  <div className="activity-details">
                    <p className="activity-title">Q2 Report.xlsx</p>
                    <p className="activity-meta">Created 1 day ago</p>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📝</div>
                  <div className="activity-details">
                    <p className="activity-title">Meeting Notes.docx</p>
                    <p className="activity-meta">Shared 3 days ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'documents' && (
          <div className="documents-section">
            <h1>Documents</h1>
            <p>This feature is coming soon.</p>
          </div>
        )}

        {activeView === 'settings' && (
          <div className="settings-section">
            <h1>Settings</h1>
            <p>This feature is coming soon.</p>
          </div>
        )}
      </div>

      {showLoginModal && (
        <LoginModal
          onClose={handleCloseModal}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default SharePointIntegration; 