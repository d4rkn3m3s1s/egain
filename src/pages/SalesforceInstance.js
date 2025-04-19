import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SalesforceInstance = () => {
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('en-US');
  const [department, setDepartment] = useState('');
  const [syncType, setSyncType] = useState('once');
  const [isActive, setIsActive] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mailList, setMailList] = useState('');
  const [authorizing, setAuthorizing] = useState(true);
  
  return (
    <div className="form-container">
      <div className="page-title">
        <Link to="/" className="back-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
        Add a Salesforce Instance
      </div>
      
      <div className="info-box">
        Sync knowledge content from Salesforce to eGain. For more help visit our, <a href="#">Help center</a>.
      </div>
      
      <div className="form-group">
        <label className="form-label required">Connect To Salesforce</label>
        {authorizing ? (
          <button className="btn btn-secondary" disabled>Authorizing...</button>
        ) : (
          <button className="btn btn-primary">Connect</button>
        )}
        
        {authorizing && (
          <div className="auth-status">
            <span className="auth-status-icon">⌛</span>
            Authorization in Progress
          </div>
        )}
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
    </div>
  );
};

export default SalesforceInstance; 