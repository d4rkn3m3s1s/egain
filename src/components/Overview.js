import React from 'react';
import LineChart from './LineChart';

const Overview = () => {
  // Sample data for the chart
  const chartData = [
    { label: 'Jan', value: 120 },
    { label: 'Feb', value: 250 },
    { label: 'Mar', value: 180 },
    { label: 'Apr', value: 310 },
    { label: 'May', value: 280 },
    { label: 'Jun', value: 420 },
    { label: 'Jul', value: 390 },
  ];

  return (
    <div className="overview-container">
      <h2>SharePoint Integration Overview</h2>
      
      <div className="overview-stats">
        <div className="stat-card">
          <h3>Total Documents</h3>
          <div className="stat-value">1,248</div>
        </div>
        
        <div className="stat-card">
          <h3>Active Users</h3>
          <div className="stat-value">87</div>
        </div>
        
        <div className="stat-card">
          <h3>Sync Status</h3>
          <div className="stat-value">Active</div>
        </div>
      </div>
      
      <div className="chart-section">
        <h3>Document Activity (Last 6 months)</h3>
        <LineChart data={chartData} width={700} height={350} />
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul className="activity-list">
          <li className="activity-item">
            <span className="activity-time">Today, 10:23 AM</span>
            <span className="activity-description">User <b>john.doe</b> synced 23 documents</span>
          </li>
          <li className="activity-item">
            <span className="activity-time">Yesterday, 3:45 PM</span>
            <span className="activity-description">System backup completed successfully</span>
          </li>
          <li className="activity-item">
            <span className="activity-time">Apr 15, 2:12 PM</span>
            <span className="activity-description">User <b>sarah.smith</b> updated permissions for Marketing folder</span>
          </li>
          <li className="activity-item">
            <span className="activity-time">Apr 14, 11:05 AM</span>
            <span className="activity-description">Scheduled sync completed with 5 new documents</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Overview; 