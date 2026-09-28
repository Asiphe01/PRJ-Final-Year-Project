import {Heart} from 'lucide-react';
import StatCard from './StatCard';

function HomeDashboard({userName= 'Peter'}) {
    return (
        <div className="section">
            <h2 className="section-label">Homedashboard</h2>
            <div className="home-card">
                <div className="hero-card">
                    <p className="hero-title">BC Heart Monitor</p>
                    <div className="hero-icon">
                        <Heart size={64} color="#ff4d4d" fill="#ff4d4d"/>
                 </div>                
                 <div>
                    <p className="hero-greeting">Hi {userName}!</p>
                    <p className="hero-sub">How are you today?</p>
                  </div>
                </div>
                
    
             <div className="Stat-grid">
                <StatCard title="ECG" value="88BPM"/>
                <StatCard title="HRV Analysis" value="73" subtitle="Normal"/>
                <StatCard title="Stress Level" value="low"/>
                <StatCard title="Avg. Variability" value="92 ms"/>
             </div>
         </div>
     </div>
    
    );
}

export default HomeDashboard;