import { LineChart, Line, ResponsiveContainer} from 'recharts';

const ecgData = [
    {v: 70}, {v: 72}, {v: 68}, {v: 90}, {v: 60},
    {v: 74}, {v: 72}, {v: 71}, {v: 88}, {v: 65},
    {v: 73}, {v: 72},
];

function PrimaryDashboard ({ patient }) {
    return (
        <div className="section">
            <h2 className="section-label"> Primary Dashboard</h2>
            <div className="primary-card">
                <p className="check-label">Check Your:</p>
                <h3 className="overall-title">Overall Health Status</h3>

                <div className="patient-row">
                    <div className="avatar-placeholder" />
                      <div className="patient-info">
                        <div>
                            <p className="info-label">Name:</p>
                            <p className="info-value">{patient.name}</p>
                        </div>
                        <div>
                            <p className="info-label">Gender:</p>
                            <p className="info-label">{patient.gender}</p>
                        </div>
                        <div>
                            <p className="info-label">Age:</p>
                            <p className="info-value">{patient.age}</p>
                        </div>
                        <div>
                            <p className="info-label">Height:</p>
                            <p className="info-value">{patient.height}</p>
                        </div> 
                </div>
            </div>

            <div className="vitals-row">
                <div className="heart-visual">❤️</div>

                <div className="vital-card">
                <   p className="vital-title">Blood Pressure</p>
                    <p className="vital-value">{patient.bloodPesssure}</p>
                    <p className="vital-title">10% more than last month</p>
                </div>

                <div className="vital-card">
                    <p className="vital-title">Heart Rate</p>
                    <p className="vital-value">{patient.heartRate} bpm/p</p>
                    <p className="vital-note">Stable reading</p>
                </div>
            </div>

            <div className="chart-row">
                <div className="chart-card">
                    <p className="chart-label"> Heart ECG  {patient.heartRate} bpm avg</p>
                    <ResponsiveContainer width="100%" height={80}>
                        <LineChart data={ecgData}>
                            <Line type="monotone" dataKey="v" stroke="#4da6ff" dot={false} strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                <div className="vital-card">
                    <p className="vital-title">Glucose Levels</p>
                    <p className="vital value">{patient.glucose} mg/dL</p>
                    <p className="vital-note">5% less than last month</p>
                </div>
               </div>
           </div>
        </div>
    );
}

export default PrimaryDashboard;