import React from 'react';
import {LineChart, Line, ResponsiveContainer} from 'recharts';

const ecgWaveData = [
    {v: 70}, {v: 72}, {v: 68}, {v: 90}, {v: 60},
    {v: 74}, {v: 72}, {v: 71}, {v: 88}, {v: 65},
    {v: 73}, {v: 72}
];

function HomeDashboard({userName= 'Peter'}) {
    return (
        <div className="section">
            <h2 className="section-label">Homedashboard</h2>

            <div className="home-card">
                <div className="hero-banner-card">
                    <p className="hero-title">BC Heart Monitor</p>
                    
                    <div className="hero-graphic-container">
                        <img
                        src="heartbeat.png"
                        alt="Heart ECG Line"
                        className="hero-heart-img"
                        />  
                    </div>

                 <div className="hero-text-block">
                    <p className="hero-greeting">Hi {userName}!</p>
                    <p className="hero-sub">How are you today?</p>
                  </div>
                </div>
                
    
             <div className="home-Grid">
                {/*Card 1: ECG Waveform*/}
                <div className="inner-stat-card">
                    <span className="card-Header-label">ECG</span>
                    <div className="ecg-chart-container">
                        <ResponsiveContainer width="100%" height={45}>
                            <LineChart data={ecgWaveData}>
                                <line
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
                        <span className="card-Header-label">HRV Analysis</span>
                        <div className="hrv-heart-badge">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#7f22fe">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z " />
                            </svg>
                        </div>
                    </div>

                    <div className="card-button-row">
                        <p className="card-main-value">73</p>
                        <span className="status-tag">Status: Normal</span>
                    </div>
                </div>

                {/*Card 3: Stress Level*/}
                <div className="inner-stat-card flex-between">
                    <span className="card-Header-label">Stress Level</span>
                    <p className="card-main-value highlight">Low</p>
                </div>

                {/* Card 4: Ave. Variability */}
                <div className="inner-stat-card flex-between">
                    <span className="card-Header-label">Ave. Variability</span>
                    <p className="card-main-value highlight">92 ms</p>
                </div>
             </div>
         </div>
     </div>
    
    );
}

export default HomeDashboard;