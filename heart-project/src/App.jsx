import Sidebar from './Components/sidebar';
import HomeDashboard from './Components/HomeDashboard';
import PrimaryDashboard from './Components/PrimaryDashboard';
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
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <HomeDashboard userName="Peter" />
        <PrimaryDashboard patient={dummyPatient} />
      </div>
    </div>
  );
}
export default App
