import { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase } from 'firebase/database';import { useUserProfile } from './hooks/useUserProfile';

import Sidebar        from './Components/sidebar.jsx';
import HomeDashboard  from './Components/HomeDashboard.jsx';
import PrimaryDashboard from './Components/PrimaryDashboard.jsx';
import DailyAlerts    from './Components/DailyAlerts.jsx';
import ProfilePage    from './Components/ProfilePage.jsx';
import Reports        from './Components/Reports.jsx';
import LoginPage      from './Components/LoginPage.jsx';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const { authUser, profile, loading } = useUserProfile();

  const handleSignOut = () => signOut(auth);

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-orb" aria-hidden="true" />
        <p>Loading…</p>
      </div>
    );
  }

  // Not signed in → LoginPage handles its own sign-in/register with Firebase
  if (!authUser) {
    return <LoginPage />;
  }

  return (
    <div className="app-container">
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onSignOut={handleSignOut}
      />

      <main className="dashboard-content">
        {activeTab === 'home'      && <HomeDashboard profile={profile} />}
        {activeTab === 'dashboard' && <PrimaryDashboard profile={profile} />}
        {activeTab === 'reports'   && <Reports profile={profile} />}
        {activeTab === 'profile'   && <ProfilePage profile={profile} authUser={authUser} onSignOut={handleSignOut} />}
      </main>

      <aside className="alerts-column">
        <DailyAlerts />
      </aside>
    </div>
  );
}

export default App;
