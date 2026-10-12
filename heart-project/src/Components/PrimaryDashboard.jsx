import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';

const ecgData = [
    {v: 70}, {v: 72}, {v: 68}, {v: 90}, {v: 60},
    {v: 74}, {v: 72}, {v: 71}, {v: 88}, {v: 65},
    {v: 73}, {v: 72},
];

function BeatingHeartGraphic() {
  return (
    <div className="heart-graphic-wrapper">
      <svg viewBox="0 0 300 300" className="beating-heart-svg">
        <defs>
          <radialGradient id="heartGlow" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#4da6ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#4da6ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="heartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff6b6b" />
            <stop offset="55%" stopColor="#e23c3c" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>
        </defs>

        <circle cx="150" cy="140" r="130" fill="url(#heartGlow)" />

        <polyline
          className="heart-ecg-trace"
          fill="none"
          stroke="#7dd3fc"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
          points="0,150 60,150 75,120 90,180 105,70 120,230 135,150 300,150"
        />

        <g className="heart-pulse-group">
          <path
            d="M150 240
               C70 180 30 120 55 75
               C75 35 125 30 150 70
               C175 30 225 35 245 75
               C270 120 230 180 150 240 Z"
            fill="url(#heartFill)"
          />
          <path
            d="M90 70 C105 50 130 55 140 75"
            fill="none"
            stroke="#ffb3b3"
            strokeWidth="5"
            strokeLinecap="round"
            opacity="0.55"
          />
        </g>
      </svg>
    </div>
  );
}

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

      {/* Main Content: single column, everything stacked top to bottom */}
<div className="pd-content-grid">

  <div className="pd-left-section">
    <div className="heart-bp-row">
      <BeatingHeartGraphic />

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
        <ResponsiveContainer width="100%" height={"100%"}>
          <LineChart data={ecgData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <YAxis domain={[75, 90]} stroke="#a395b8" fontSize={11} ticks={[75, 80, 85, 90]} />
            <Line
              type="monotone"
              dataKey="v"
              stroke="#00d2ff"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#00d2ff' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>

  {/* RIGHT COLUMN */}
  <div className="pd-right-column">
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