import React from 'react';

const ContentIndexingStatus = () => {
  return (
    <div className="status-section">
      <h2 className="status-title">Content Indexing Status</h2>
      <div className="status-subtitle">Overview of indexed SharePoint content by type</div>
      
      <div className="content-grid">
        <div>
          <div className="content-label">Sites</div>
          <div className="content-value">24</div>
          <div className="content-label">100% indexed</div>
          
          <div className="content-stat">
            <div className="content-label">Pages</div>
            <div className="content-value">1,245</div>
            <div className="content-label">100% indexed</div>
          </div>
        </div>
        
        <div>
          <div className="content-label">Lists</div>
          <div className="content-value">156</div>
          <div className="content-label">100% indexed</div>
          
          <div className="content-stat">
            <div className="content-label">Documents</div>
            <div className="content-value">10,876</div>
            <div className="content-label">98% indexed</div>
          </div>
        </div>
        
        <div>
          <div className="content-label">Document Libraries</div>
          <div className="content-value">87</div>
          <div className="content-label">100% indexed</div>
          
          <div className="content-stat">
            <div className="content-label">List Items</div>
            <div className="content-value">24,567</div>
            <div className="content-label">95% indexed</div>
          </div>
        </div>
      </div>
      
      <a href="#" className="report-link">View Detailed Report</a>
    </div>
  );
};

export default ContentIndexingStatus; 