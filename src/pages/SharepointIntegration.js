import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardStats from '../components/DashboardStats';
import SyncStatus from '../components/SyncStatus';
import ContentIndexingStatus from '../components/ContentIndexingStatus';
import PermissionMappingStatus from '../components/PermissionMappingStatus';
import SharePointActivityChart from '../components/SharePointActivityChart';

const SharepointIntegration = () => {
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [department, setDepartment] = useState('');
  const [syncType, setSyncType] = useState('once');
  const [isActive, setIsActive] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mailList, setMailList] = useState('');
  const [activeView, setActiveView] = useState('overview');
  const [showAuthOptions, setShowAuthOptions] = useState(false);
  
  return (
    <div className="form-container">
      <div className="page-header">
        <div className="page-title">
          <Link to="/" className="back-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          SharePoint Integration
        </div>
        
        <div className="view-controls">
          <button 
            className={`view-button ${activeView === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveView('overview')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
            Overview
          </button>
          <button 
            className={`view-button ${activeView === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveView('settings')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
            Settings
          </button>
        </div>
      </div>
      
      {activeView === 'overview' ? (
        <>
          <DashboardStats />
          
          <SyncStatus />
          
          <SharePointActivityChart />
          
          <ContentIndexingStatus />
          
          <PermissionMappingStatus />
        </>
      ) : (
        <>
          <div className="info-box">
            Sync knowledge content from SharePoint to eGain. For more help visit our, <a href="#">Help center</a>.
          </div>
          
          <div className="form-group auth-buttons-container">
            <label className="form-label required">Authorize Content</label>
            <div className="auth-options">
              {showAuthOptions ? (
                <>
                  <button 
                    className="btn btn-auth"
                    onClick={() => {/* Handle personal auth */}}
                  >
                    Authorize for myself (Delegated)
                  </button>
                  
                  <button 
                    className="btn btn-auth"
                    onClick={() => {/* Handle org auth */}}
                  >
                    Authorize for my organization (App level)
                  </button>
                  
                  <button 
                    className="btn btn-secondary btn-small"
                    onClick={() => setShowAuthOptions(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowAuthOptions(true)}
                >
                  Authorize Content
                </button>
              )}
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label required">Connect To SharePoint</label>
            <button className="btn btn-primary">Connect</button>
          </div>
          
          <div className="form-group">
            <label className="form-label">Description</label>
            <input 
              type="text" 
              className="form-input" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label required">Language</label>
            <input 
              type="text" 
              className="form-input" 
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              placeholder="en-US"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label required">Department</label>
            <select 
              className="form-select"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">Select department</option>
              <option value="sales">Sales</option>
              <option value="marketing">Marketing</option>
              <option value="support">Support</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label required">Sync Type</label>
            <div className="radio-group">
              <div 
                className={`radio-button ${syncType === 'once' ? 'active' : ''}`}
                onClick={() => setSyncType('once')}
              >
                Once
              </div>
              <div 
                className={`radio-button ${syncType === 'regular' ? 'active' : ''}`}
                onClick={() => setSyncType('regular')}
              >
                Regular
              </div>
            </div>
            <div className="radio-info">
              Sync once will import only during start, sync regular will import every 24 hours
            </div>
          </div>
          
          <div className="form-group">
            <label className="form-label required">Active</label>
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="form-group">
            <label className="form-label required">eGain API Username</label>
            <input 
              type="text" 
              className="form-input" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label required">eGain API Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label required">
              Notification Mailing List
              <span className="add-button">+</span>
            </label>
            <textarea 
              className="form-textarea" 
              value={mailList}
              onChange={(e) => setMailList(e.target.value)}
            />
          </div>
          
          <div className="button-container">
            <button className="btn btn-secondary">Save</button>
            <button className="btn btn-secondary">Close</button>
          </div>
        </>
      )}
    </div>
  );
};

export default SharepointIntegration; 