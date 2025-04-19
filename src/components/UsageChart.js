import React from 'react';

const UsageChart = () => {
  return (
    <div className="status-section">
      <h2 className="status-title">Content Usage Analytics</h2>
      <div className="status-subtitle">SharePoint content usage over the last 30 days</div>
      
      <div className="chart-container">
        {/* Canvas temelli basit bir çizgi grafiği oluşturuyoruz */}
        <svg className="chart" viewBox="0 0 800 300">
          <g className="grid">
            {/* Yatay grid çizgileri */}
            <line x1="50" y1="250" x2="750" y2="250" />
            <line x1="50" y1="200" x2="750" y2="200" />
            <line x1="50" y1="150" x2="750" y2="150" />
            <line x1="50" y1="100" x2="750" y2="100" />
            <line x1="50" y1="50" x2="750" y2="50" />
          </g>
          
          {/* Y ekseni etiketleri */}
          <text x="40" y="250" className="chart-label" textAnchor="end">0</text>
          <text x="40" y="200" className="chart-label" textAnchor="end">100</text>
          <text x="40" y="150" className="chart-label" textAnchor="end">200</text>
          <text x="40" y="100" className="chart-label" textAnchor="end">300</text>
          <text x="40" y="50" className="chart-label" textAnchor="end">400</text>
          
          {/* X ekseni etiketleri */}
          <text x="50" y="270" className="chart-label">Apr 1</text>
          <text x="190" y="270" className="chart-label">Apr 8</text>
          <text x="330" y="270" className="chart-label">Apr 15</text>
          <text x="470" y="270" className="chart-label">Apr 22</text>
          <text x="610" y="270" className="chart-label">Apr 29</text>
          <text x="750" y="270" className="chart-label">May 6</text>
          
          {/* Veri çizgileri */}
          <path 
            className="chart-line" 
            d="M50,230 L120,210 L190,180 L260,190 L330,150 L400,120 L470,140 L540,100 L610,70 L680,90 L750,50"
            stroke="#f9d616"
            strokeWidth="3"
            fill="none"
          />
          
          {/* Veri noktaları */}
          <circle cx="50" cy="230" r="4" className="chart-point" />
          <circle cx="120" cy="210" r="4" className="chart-point" />
          <circle cx="190" cy="180" r="4" className="chart-point" />
          <circle cx="260" cy="190" r="4" className="chart-point" />
          <circle cx="330" cy="150" r="4" className="chart-point" />
          <circle cx="400" cy="120" r="4" className="chart-point" />
          <circle cx="470" cy="140" r="4" className="chart-point" />
          <circle cx="540" cy="100" r="4" className="chart-point" />
          <circle cx="610" cy="70" r="4" className="chart-point" />
          <circle cx="680" cy="90" r="4" className="chart-point" />
          <circle cx="750" cy="50" r="4" className="chart-point" />
        </svg>
      </div>
      
      <div className="chart-legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: "#f9d616" }}></span>
          <span>Daily document views</span>
        </div>
      </div>
      
      <div className="chart-summary">
        <div className="summary-item">
          <div className="summary-value">12,476</div>
          <div className="summary-label">Total views</div>
        </div>
        <div className="summary-item">
          <div className="summary-value">375</div>
          <div className="summary-label">Avg. daily views</div>
        </div>
        <div className="summary-item">
          <div className="summary-value">+32%</div>
          <div className="summary-label">Month-over-month</div>
        </div>
      </div>
    </div>
  );
};

export default UsageChart; 