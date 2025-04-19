import React from 'react';

const SharePointActivityChart = () => {
  // Sample data for departments and their activity
  const departments = ['Marketing', 'Sales', 'Support', 'HR', 'Engineering'];
  const activityData = [65, 42, 78, 30, 53];
  
  // Calculate the maximum value for scaling
  const maxValue = Math.max(...activityData);
  const chartHeight = 250;
  const barWidth = 50;
  const barGap = 30;
  const chartWidth = (barWidth + barGap) * departments.length;
  
  // Colors for the bars
  const colors = ['#0078d4', '#2b88d8', '#4a9adc', '#69abe1', '#88bce5'];
  
  return (
    <div className="status-section">
      <h2 className="status-title">Document Activity by Department</h2>
      <div className="status-subtitle">SharePoint document usage across departments</div>
      
      <div className="chart-container" style={{ height: `${chartHeight + 70}px` }}>
        <svg width="100%" height={chartHeight + 70} viewBox={`0 0 ${chartWidth} ${chartHeight + 70}`}>
          {/* Horizontal axis line */}
          <line 
            x1="0" 
            y1={chartHeight} 
            x2={chartWidth} 
            y2={chartHeight} 
            stroke="#e0e0e0" 
            strokeWidth="1"
          />
          
          {/* Vertical grid lines */}
          {[0, 25, 50, 75, 100].map((percent, i) => {
            const y = chartHeight - (chartHeight * (percent / 100));
            return (
              <React.Fragment key={i}>
                <line 
                  x1="0" 
                  y1={y} 
                  x2={chartWidth} 
                  y2={y} 
                  stroke="#e0e0e0" 
                  strokeWidth="1" 
                  strokeDasharray="4,4"
                />
                <text 
                  x="-5" 
                  y={y + 5} 
                  textAnchor="end" 
                  fontSize="12" 
                  fill="#666"
                >
                  {percent}
                </text>
              </React.Fragment>
            );
          })}
          
          {/* Bars and Labels */}
          {departments.map((dept, index) => {
            const x = index * (barWidth + barGap) + barGap / 2;
            const barHeight = (activityData[index] / maxValue) * chartHeight;
            
            return (
              <React.Fragment key={index}>
                {/* Bar */}
                <rect
                  x={x}
                  y={chartHeight - barHeight}
                  width={barWidth}
                  height={barHeight}
                  fill={colors[index % colors.length]}
                  rx={4}
                />
                
                {/* Value label */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight - barHeight - 10}
                  textAnchor="middle"
                  fontSize="14"
                  fontWeight="bold"
                  fill="#333"
                >
                  {activityData[index]}
                </text>
                
                {/* Department label */}
                <text
                  x={x + barWidth / 2}
                  y={chartHeight + 20}
                  textAnchor="middle"
                  fontSize="12"
                  fill="#666"
                >
                  {dept}
                </text>
              </React.Fragment>
            );
          })}
        </svg>
      </div>
      
      <div className="chart-summary">
        <div className="summary-item">
          <div className="summary-value">268</div>
          <div className="summary-label">Total Documents</div>
        </div>
        <div className="summary-item">
          <div className="summary-value">54</div>
          <div className="summary-label">Avg. per Department</div>
        </div>
        <div className="summary-item">
          <div className="summary-value">Marketing</div>
          <div className="summary-label">Most Active</div>
        </div>
      </div>
    </div>
  );
};

export default SharePointActivityChart; 