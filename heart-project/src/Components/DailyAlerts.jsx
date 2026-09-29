import React, {useState, useEffect} from 'react';
import {Bell, AlertTriangle, Activity, Heart, CheckCircle2} from 'lucide-react';

const initialAlerts = [
    {
        id: 1,
        title: 'Heart Rate Spike Recorded',
        detail: 'Elevated heart rate of 120 bpm detected.',
        time: '2026-06-15 10:30 AM',
        type: 'critical',
        icon: Heart,
    },
    {
        id: 2,
        title: 'Glucose Level logged',
        detail: 'Glucose level of 5.4 mg/dL recorded.',
        time: '2026-06-15 09:45 AM',
        type: 'Normal',
        icon: Activity,
    },
    {   
        id: 3,
        title: 'Morning ECG Sync Complete',
        detail: 'Baseline waveform data successfully synced.',
        time: '2026-06-15 08:00 AM',
        type: 'Normal',
        icon: CheckCircle2,
    },
 {
        id: 4,
        title: 'Blood Pressure Check',
        detail: '1100/70 mmhg - within normal resting range.',
        time: '2026-06-15 07:30 AM',
        type: 'Normal',
        icon: AlertTriangle,
    },
];

function DailyAlerts() {
    const [alerts, setAlerts] = useState(initialAlerts);

    const pushNewAlert = (newAlert) => {
        setAlerts((prevAlerts) => [newAlert, ...prevAlerts]);
    };

    return (
       <div className="daily-alerts-card">
      <div className="alerts-header-container">
        <div className="alerts-title-group">
          <Bell size={20} className="alert-bell-icon" />
          <h3 className="alerts-header">Daily Alerts</h3>
        </div>
        <span className="live-badge">Live</span>
      </div>

      <div className="alerts-list">
        {alerts.map((alert) => {
          const IconComponent = alert.icon;
          return (
            <div key={alert.id} className={`alert-item alert-${alert.type}`}>
              <div className="alert-icon-wrapper">
                <IconComponent size={18} />
              </div>

              <div className="alert-content">
                <div className="alert-top-row">
                  <p className="alert-title">{alert.title}</p>
                  <span className="alert-time">{alert.time}</span>
                </div>
                <p className="alert-detail">{alert.detail}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    );
}

export default DailyAlerts;