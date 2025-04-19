import React, { useState } from 'react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('indexing');
  const [indexingProgress, setIndexingProgress] = useState(0);
  const [isIndexing, setIsIndexing] = useState(false);
  
  const handleStartIndexing = () => {
    setIsIndexing(true);
    
    // Mock indexing progress
    const interval = setInterval(() => {
      setIndexingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsIndexing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 800);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'indexing':
        return (
          <div className="config-card">
            <h2 className="text-xl font-semibold mb-4">Indexing Settings</h2>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Content to Index</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  Documents
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  Pages
                </label>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  Lists
                </label>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Indexing Depth</label>
              <select className="w-full p-2 border rounded">
                <option>Deep (all content)</option>
                <option>Medium (skip archived)</option>
                <option>Shallow (recent content only)</option>
              </select>
            </div>
            
            {isIndexing ? (
              <div className="mb-4">
                <label className="block mb-2 font-medium">Indexing Progress</label>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${indexingProgress}%`, backgroundColor: 'var(--primary-color)' }}
                  ></div>
                </div>
                <div className="text-right mt-1 text-sm">{indexingProgress}%</div>
              </div>
            ) : (
              <button 
                className="btn-primary"
                onClick={handleStartIndexing}
              >
                Start Indexing
              </button>
            )}
          </div>
        );
        
      case 'permissions':
        return (
          <div className="config-card">
            <h2 className="text-xl font-semibold mb-4">Permission Mapping</h2>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Default Access Level</label>
              <select className="w-full p-2 border rounded">
                <option>Respect SharePoint permissions</option>
                <option>Read-only for all users</option>
                <option>Custom permission mapping</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Role Mapping</label>
              
              <div className="border rounded p-4 mb-2">
                <div className="font-medium mb-2">SharePoint Editors → eGain Agents</div>
                <button className="text-sm text-blue-600">Edit Mapping</button>
              </div>
              
              <div className="border rounded p-4 mb-2">
                <div className="font-medium mb-2">SharePoint Viewers → eGain Viewers</div>
                <button className="text-sm text-blue-600">Edit Mapping</button>
              </div>
              
              <button className="btn-secondary mt-2">Add New Mapping</button>
            </div>
          </div>
        );
        
      case 'sync':
        return (
          <div className="config-card">
            <h2 className="text-xl font-semibold mb-4">Sync Schedule</h2>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Sync Frequency</label>
              <select className="w-full p-2 border rounded">
                <option>Every hour</option>
                <option>Every 6 hours</option>
                <option>Daily</option>
                <option>Weekly</option>
                <option>Manual only</option>
              </select>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Last Sync</label>
              <div className="text-gray-700">2023-06-25 14:30:22</div>
            </div>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Next Scheduled Sync</label>
              <div className="text-gray-700">2023-06-25 15:30:00</div>
            </div>
            
            <button className="btn-primary">
              Run Sync Now
            </button>
          </div>
        );
        
      case 'analytics':
        return (
          <div className="config-card">
            <h2 className="text-xl font-semibold mb-4">Analytics</h2>
            
            <div className="mb-4">
              <label className="block mb-2 font-medium">Usage Statistics</label>
              <div className="border rounded p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-600">Total Searches</div>
                    <div className="text-xl font-semibold">1,245</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Active Users</div>
                    <div className="text-xl font-semibold">37</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Documents Indexed</div>
                    <div className="text-xl font-semibold">8,392</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Avg. Response Time</div>
                    <div className="text-xl font-semibold">1.2s</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block mb-2 font-medium">Top Searches</label>
              <ul className="border rounded divide-y">
                <li className="p-3 flex justify-between">
                  <span>sharepoint permissions</span>
                  <span className="text-gray-600">124 searches</span>
                </li>
                <li className="p-3 flex justify-between">
                  <span>integration guide</span>
                  <span className="text-gray-600">98 searches</span>
                </li>
                <li className="p-3 flex justify-between">
                  <span>troubleshooting</span>
                  <span className="text-gray-600">76 searches</span>
                </li>
              </ul>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="admin-layout">
      <div className="sidebar">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        
        <nav>
          <div 
            className={`sidebar-item ${activeTab === 'indexing' ? 'active' : ''}`}
            onClick={() => setActiveTab('indexing')}
          >
            Indexing Settings
          </div>
          
          <div 
            className={`sidebar-item ${activeTab === 'permissions' ? 'active' : ''}`}
            onClick={() => setActiveTab('permissions')}
          >
            Permission Mapping
          </div>
          
          <div 
            className={`sidebar-item ${activeTab === 'sync' ? 'active' : ''}`}
            onClick={() => setActiveTab('sync')}
          >
            Sync Schedule
          </div>
          
          <div 
            className={`sidebar-item ${activeTab === 'analytics' ? 'active' : ''}`}
            onClick={() => setActiveTab('analytics')}
          >
            Analytics
          </div>
        </nav>
      </div>
      
      <div className="admin-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminPanel; 