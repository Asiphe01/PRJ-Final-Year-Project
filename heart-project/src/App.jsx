import {useState} from 'react';
import Sidebar from './Components/sidebar.jsx';
import HomeDashboard from './Components/HomeDashboard.jsx';
import PrimaryDashboard from './Components/PrimaryDashboard.jsx';
import DailyAlerts from './Components/DailyAlerts.jsx';
import ProfilePage from './Components/ProfilePage.jsx';
import RegisterPage from './Components/Register.jsx';
import Reports from './Components/Reports.jsx';
import './App.css';


const dummyPatient = {
  name: 'Jazzy Smith',
  gender: 'Female',
  age: 22,
  height: "5'8",
  bloodPressure: '110/70 mmHg',
  heartRate: 105,
  glucose: 5.4,
};

function App() {
  const [activeTab, setActiveTab] = useState('home');
  return (
    <div className="app-container">
      {/*left Vertical Sidebar*/}
      <Sidebar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/*Main Display Area*/}
      <main className="dashboard-content">
         {activeTab === 'profile' && <ProfilePage />}
         {activeTab === 'register' && <RegisterPage />}
         {activeTab === 'home' && <HomeDashboard userName={dummyPatient.name.split(' ')[0]} />}
         {activeTab === 'dashboard' && <PrimaryDashboard patient={dummyPatient} />}
         {activeTab === 'reports' && <Reports />}
        </main>
      
      {/* Right Column Alerts*/}
      <aside className="alerts-column">
        <DailyAlerts />
      </aside>
    </div>
  );
}
export default App
