import React from 'react';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip} from 'recharts';

const ecgData = [
    {v: 70}, {v: 72}, {v: 68}, {v: 90}, {v: 60},
    {v: 74}, {v: 72}, {v: 71}, {v: 88}, {v: 65},
    {v: 73}, {v: 72},
];

function PrimaryDashboard ({ patient }) {
    return (
        <div className="primary-dashboard-card">
      <div className="pd-header-titles">
        <span className="pd-subtitle">Check Your:</span>
        <h2 className="pd-title">Overall Health Status</h2>
      </div>

      {/* Top Patient Info Header */}
      <div className="patient-profile-card">
        <div className="profile-avatar-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80" 
            alt="Jazzy Smith" 
            className="profile-avatar-img"
          />
        </div>
        <div className="profile-details-grid">
          <div className="detail-item">
            <span className="detail-label">Name:</span>
            <span className="detail-value">Jazzy Smith</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Gender:</span>
            <span className="detail-value">Female</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Age:</span>
            <span className="detail-value">22</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Height:</span>
            <span className="detail-value">5'8</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Left (Heart + BP + ECG) & Right (Heart Rate + Glucose) */}
      <div className="pd-content-grid">
        
        {/* LEFT / CENTER SECTION */}
        <div className="pd-left-section">
          {/* Heart Graphic + Blood Pressure Row */}
          <div className="heart-bp-row">
            <div className="heart-graphic-wrapper">
              <img 
                src="heart-3d.png" 
                alt="Heart Graphic" 
                className="pd-heart-3d-img"
              />
            </div>

            {/* Blood Pressure Card (Sits next to heart) */}
            <div className="pd-stat-card bp-card">
              <div className="pd-stat-top-row">
                <div className="pd-icon-badge red-badge">🩸</div>
                <div>
                  <span className="pd-stat-name">Blood Pressure</span>
                  <p className="pd-stat-main-val">110/70 mmhg</p>
                </div>
              </div>
              <div className="pd-stat-pill red-pill">
                10% more than last month 📈
              </div>
            </div>
          </div>

          {/* Heart ECG Card (Sits at the bottom left under heart & BP) */}
          <div className="ecg-large-card">
            <div className="ecg-card-header">
              <div>
                <h4 className="ecg-title">Heart ECG</h4>
                <span className="ecg-date">1 - 7 December 2020 ▾</span>
              </div>
              <div className="ecg-avg-badge">
                <span className="avg-val">72 bmp</span>
                <span className="avg-label">Average</span>
              </div>
            </div>

            <div className="ecg-chart-box">
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={ecgData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <YAxis domain={[75, 90]} stroke="#a395b8" fontSize={11} ticks={[75, 80, 85, 90]} />
                  <Line 
                    type="monotone" 
                    dataKey="val" 
                    stroke="#00d2ff" 
                    strokeWidth={2.5} 
                    dot={{ r: 3, fill: '#00d2ff' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Heart Rate + Glucose) */}
        <div className="pd-right-column">
          {/* Heart Rate Card */}
          <div className="pd-stat-card">
            <div className="pd-stat-top-row">
              <div className="pd-icon-badge orange-badge">❤️</div>
              <div>
                <span className="pd-stat-name">Heart Rate</span>
                <p className="pd-stat-main-val">105 bmp</p>
              </div>
            </div>
            <div className="pd-stat-pill normal-pill">
              Stable reading
            </div>
          </div>

          {/* Glucose Levels Card */}
          <div className="pd-stat-card">
            <div className="pd-stat-top-row">
              <div className="pd-icon-badge purple-badge">💧</div>
              <div>
                <span className="pd-stat-name">Glucose Levels</span>
                <p className="pd-stat-main-val">5.4 mg/dL</p>
              </div>
            </div>
            <div className="pd-stat-pill purple-pill">
              5% less than last month 📉
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PrimaryDashboard;