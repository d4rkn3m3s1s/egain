import React from 'react';

const DashboardStats = () => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-title">
          Connection Status
          <span className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
          </span>
        </div>
        <div className="stat-value">Connected</div>
        <div className="stat-info success">• All systems operational</div>
        <div className="stat-info">Last verified: 5 minutes ago</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-title">
          Indexed Documents
          <span className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </span>
        </div>
        <div className="stat-value">12,543</div>
        <div className="stat-info">+2,464 from last sync</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-title">
          Users Mapped
          <span className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </span>
        </div>
        <div className="stat-value">573</div>
        <div className="stat-info">100% of SharePoint users</div>
      </div>
      
      <div className="stat-card">
        <div className="stat-title">
          Last Sync
          <span className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </span>
        </div>
        <div className="stat-value">2h ago</div>
        <div className="stat-info">Next sync in 4h</div>
      </div>
    </div>
  );
};

export default DashboardStats; 