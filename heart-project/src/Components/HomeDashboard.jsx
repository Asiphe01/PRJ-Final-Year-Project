import React from 'react';
import {LineChart, Line, ResponsiveContainer} from 'recharts';
import heartbeatImg from './heartbeat.png';

const ecgWaveData = [
    {v: 70}, {v: 72}, {v: 68}, {v: 90}, {v: 60},
    {v: 74}, {v: 72}, {v: 71}, {v: 88}, {v: 65},
    {v: 73}, {v: 72}
];

function HRVPulseVisual() {
  return (
    <svg viewBox="0 0 200 100" className="hrv-pulse-visual">
      <defs>
        <radialGradient id="hrvGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7f22fe" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7f22fe" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle className="hrv-glow-dot" cx="100" cy="50" r="22" fill="url(#hrvGlow)" />
      <polyline
        className="hrv-wave-line"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="0,50 60,50 72,30 84,70 96,15 108,85 120,50 200,50"
      />
    </svg>
  );
}

function VariabilityVisual({ intervalA = 90, intervalB = 94 }) {
  return (
    <svg viewBox="0 0 240 110" className="variability-visual">
      {/* ECG trace with three beats */}
      <polyline
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="
          0,40 20,40 28,20 34,55 40,40 70,40
          78,40 86,20 92,55 98,40 128,40
          136,40 144,20 150,55 156,40 240,40
        "
      />

      {/* dashed guide lines dropping from each peak */}
      <line x1="28" y1="20" x2="28" y2="78" stroke="#7f22fe" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="86" y1="20" x2="86" y2="78" stroke="#7f22fe" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="144" y1="20" x2="144" y2="78" stroke="#7f22fe" strokeWidth="1" strokeDasharray="3 3" />

      {/* interval bracket 1 */}
      <path d="M 28 78 L 86 78" stroke="#7f22fe" strokeWidth="1.5" fill="none" />
      <text x="57" y="72" textAnchor="middle" fontSize="11" fill="#a395b8">
        {intervalA}ms
      </text>

      {/* interval bracket 2 */}
      <path d="M 86 92 L 144 92" stroke="#7f22fe" strokeWidth="1.5" fill="none" />
      <text x="115" y="106" textAnchor="middle" fontSize="11" fill="#a395b8">
        {intervalB}ms
      </text>
    </svg>
  );
}

function StressGauge({ value = 20 }) {
  const angle = -90 + (value / 100) * 180;

  return (
    <svg viewBox="0 0 200 110" className="stress-gauge">
      <defs>
        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2ecc40" />
          <stop offset="33%" stopColor="#d4e157" />
          <stop offset="55%" stopColor="#ffb300" />
          <stop offset="75%" stopColor="#ff6f00" />
          <stop offset="100%" stopColor="#e53935" />
        </linearGradient>
      </defs>
      <path
        d="M 10 100 A 90 90 0 0 1 190 100"
        fill="none"
        stroke="url(#gaugeGradient)"
        strokeWidth="18"
        strokeLinecap="round"
      />
      <g transform={`rotate(${angle}, 100, 100)`}>
        <line x1="100" y1="100" x2="100" y2="30" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
      </g>
      <circle cx="100" cy="100" r="7" fill="#ffffff" />
    </svg>
  );
}

function HomeDashboard({userName= 'Peter'}) {
    return (
        <div className="section">
            <h2 className="section-label">Homedashboard</h2>

            <div className="home-card">
                <div className="hero-banner-card">
                    <p className="hero-title">BC Heart Monitor</p>

                    <div className="hero-graphic-container">
                        <img
                        src={heartbeatImg}
                        alt="Heart ECG Line"
                        className="hero-heart-img"
                        />
                    </div>

                 <div className="hero-text-block">
                    <p className="hero-greeting">Hi {userName}!</p>
                    <p className="hero-sub">How are you today?</p>
                  </div>
                </div>

             <div className="home-grid">
                {/*Card 1: ECG Waveform*/}
                <div className="inner-stat-card">
                    <span className="card-header-label">ECG</span>
                    <div className="ecg-chart-container">
                        <ResponsiveContainer width="100%" height={45}>
                            <LineChart data={ecgWaveData}>
                                <Line
                                type="monotone"
                                dataKey="v"
                                stroke="#ff4d4d"
                                strokeWidth={2}
                                dot={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div>
                        <p className="card-sub-status">Sinus Rhythm</p>
                        <p className="card-main-value">88 BMP</p>
                    </div>
                </div>

                {/*Card 2: HRV Analysis*/}
                <div className="inner-stat-card">
                    <div className="card-header-row">
                        <span className="card-header-label">HRV Analysis</span>
                    </div>

                    <HRVPulseVisual />

                    <div className="card-bottom-row">
                        <p className="card-main-value">73</p>
                        <span className="status-tag">Status: Normal</span>
                    </div>
                </div>

                {/*Card 3: Stress Level*/}
                <div className="inner-stat-card flex-between">
                <span className="card-header-label">Stress Level</span>
                <StressGauge value={20} />
                <p className="card-main-value highlight">Low</p>
                </div>

                {/* Card 4: Ave. Variability */}
                <div className="inner-stat-card flex-between">
                    <span className="card-header-label">Ave. Variability</span>
                    <VariabilityVisual intervalA={90} intervalB={94} />
                    <p className="card-main-value highlight">92 ms</p>
                </div>
             </div>
         </div>
     </div>
    );
}

export default HomeDashboard;