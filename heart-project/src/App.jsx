import { useState, useEffect } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import Sidebar        from './Components/sidebar.jsx';
import HomeDashboard  from './Components/HomeDashboard.jsx';
import PrimaryDashboard from './Components/PrimaryDashboard.jsx';
import DailyAlerts    from './Components/DailyAlerts.jsx';
import ProfilePage    from './Components/ProfilePage.jsx';
import Reports        from './Components/Reports.jsx';
import LoginPage      from './Components/LoginPage.jsx';
import './App.css';

/* ── Dummy patient data (replace with Firestore reads later) ── */
const dummyPatient = {
  name: 'Jazzy Smith',
  gender: 'Female',
  age: 22,
  height: "5'8",
  bloodPressure: '110/70 mmHg',
  heartRate: 105,
  glucose: 5.4,
};

/* ══════════════════════════════════════════════════════════════
   App
   ══════════════════════════════════════════════════════════════ */
function App() {
  const [activeTab,    setActiveTab]   = useState('home');
  const [user,         setUser]        = useState(null);
  const [authLoading,  setAuthLoading] = useState(true);

  /* Subscribe to Firebase auth state once on mount */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthLoading(false);
    });
    return unsub;
  }, []);

  /* ── Passed to LoginPage as props so it stays decoupled ── */
  const handleLogin = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
    // onAuthStateChanged above handles the redirect automatically

  const handleRegister = async ({ name, age, gender, role, email, password }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', cred.user.uid), {
      fullName: name,
      email,
      age,
      gender,
      role,
      createdAt: new Date().toISOString(),
    });
    // onAuthStateChanged handles redirect
  };

  const handleSignOut = () => signOut(auth);

  /* ── Loading splash (prevents flash of wrong screen) ───── */
  if (authLoading) {
    return (
      <div className="auth-loading">
        <div className="auth-loading-orb" aria-hidden="true" />
        <p>Loading…</p>
      </div>
    );
  }

  /* ── Not signed in → show login / register ──────────────── */
  if (!user) {
    return (
      <LoginPage
        onLogin={handleLogin}
        onRegister={handleRegister}
      />
    );
  }

  /* ── Signed in → full dashboard ─────────────────────────── */
  return (
    <div className="app-container">
      {/* Left vertical sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onSignOut={handleSignOut}
      />

      {/* Main display area */}
      <main className="dashboard-content">
        {activeTab === 'home'      && <HomeDashboard userName={dummyPatient.name.split(' ')[0]} />}
        {activeTab === 'dashboard' && <PrimaryDashboard patient={dummyPatient} />}
        {activeTab === 'reports'   && <Reports />}
        {activeTab === 'profile'   && <ProfilePage user={user} />}
      </main>

      {/* Right column — always visible */}
      <aside className="alerts-column">
        <DailyAlerts />
      </aside>
    </div>
  );
}

export default App;
