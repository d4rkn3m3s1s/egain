import React from 'react';

const SyncStatus = () => {
  const syncData = [
    {
      id: 1,
      day: 'Monday',
      time: '09:00 AM',
      duration: '45 min',
      items: '2,450',
      status: 'Completed',
      success: true
    },
    {
      id: 2,
      day: 'Monday',
      time: '03:00 PM',
      duration: '32 min',
      items: '1,230',
      status: 'Completed',
      success: true
    },
    {
      id: 3,
      day: 'Tuesday',
      time: '09:00 AM',
      duration: '38 min',
      items: '1,890',
      status: 'Completed',
      success: true
    },
    {
      id: 4,
      day: 'Tuesday',
      time: '03:00 PM',
      duration: '55 min',
      items: '2,100',
      status: 'Completed with warnings',
      success: false
    },
    {
      id: 5,
      day: 'Wednesday',
      time: '09:00 AM',
      duration: '41 min',
      items: '2,340',
      status: 'Completed',
      success: true
    },
    {
      id: 6,
      day: 'Wednesday',
      time: '03:00 PM',
      duration: '35 min',
      items: '1,560',
      status: 'Completed',
      success: true
    },
    {
      id: 7,
      day: 'Thursday',
      time: '09:00 AM',
      duration: '40 min',
      items: '2,100',
      status: 'Completed',
      success: true
    }
  ];

  return (
    <div className="status-section">
      <h2 className="status-title">Sync Status</h2>
      <div className="status-subtitle">Last 7 days of synchronization activity</div>
      
      <table className="sync-table">
        <tbody>
          {syncData.map(sync => (
            <tr key={sync.id}>
              <td className={`sync-icon ${sync.success ? 'success' : 'warning'}`}>
                {sync.success ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    <line x1="12" y1="9" x2="12" y2="13"></line>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                )}
              </td>
              <td>
                <div><strong>{sync.day} {sync.time}</strong></div>
                <div>Duration: {sync.duration}</div>
              </td>
              <td className="sync-items">{sync.items} items</td>
              <td className="sync-status">{sync.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SyncStatus; 