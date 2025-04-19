import React from 'react';

const PermissionMappingStatus = () => {
  return (
    <div className="status-section">
      <h2 className="status-title">Permission Mapping Status</h2>
      <div className="status-subtitle">Overview of SharePoint permissions mirrored to eGain</div>
      
      <div className="content-grid">
        <div>
          <div className="content-label">Users</div>
          <div className="content-value">573</div>
          <div className="content-label">100% mapped</div>
        </div>
        
        <div>
          <div className="content-label">Groups</div>
          <div className="content-value">42</div>
          <div className="content-label">100% mapped</div>
        </div>
        
        <div>
          <div className="content-label">Permission Levels</div>
          <div className="content-value">15</div>
          <div className="content-label">100% mapped</div>
        </div>
      </div>
    </div>
  );
};

export default PermissionMappingStatus; 