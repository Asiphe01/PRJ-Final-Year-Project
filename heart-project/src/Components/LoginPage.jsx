import { useState } from 'react';
import { auth, db } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { ref, set } from 'firebase/database';

function LoginPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // register is 2-step

  // Shared
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Register-only
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState(''); // 'athlete' | 'coach'

  const reset = () => {
    setError('');
    setStep(1);
    setEmail(''); setPassword(''); setConfirmPassword('');
    setFullName(''); setGender(''); setAge(''); setRole('');
  };

  const switchMode = (m) => { reset(); setMode(m); };

  // ── Login ────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  // ── Register step 1 → step 2 ─────────────────────────────────────────
  const handleStep1 = (e) => {
    e.preventDefault();
    setError('');
    if (!fullName.trim()) return setError('Please enter your full name.');
    if (!gender) return setError('Please select your gender.');
    if (!age || isNaN(age) || age < 12 || age > 100)
      return setError('Please enter a valid age (12–100).');
    if (!role) return setError('Please select whether you are an athlete or coach.');
    setStep(2);
  };

  // ── Register step 2 → submit ─────────────────────────────────────────
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) return setError('Password must be at least 6 characters.');
    if (password !== confirmPassword) return setError('Passwords do not match.');
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await set(ref(db, `users/${cred.user.uid}`), {
        fullName: fullName.trim(),
        email,
        gender,
        age: parseInt(age),
        role,
        createdAt: new Date().toISOString(),
      });
    } 
    catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lp-root">
      {/* ── Left panel – branding ── */}
      <div className="lp-brand">
        <div className="lp-brand-inner">
          <div className="lp-pulse-ring" aria-hidden="true">
            <div className="lp-pulse-core" />
          </div>
          <h1 className="lp-brand-title">BC Heart<br />Monitor</h1>
          <p className="lp-brand-sub">
            AI-driven performance analytics<br />for university athletes and coaches.
          </p>
          <div className="lp-stats">
            <div className="lp-stat"><span className="lp-stat-num">6</span><span className="lp-stat-lbl">Athletes tracked</span></div>
            <div className="lp-stat-div" />
            <div className="lp-stat"><span className="lp-stat-num">Live</span><span className="lp-stat-lbl">Heart rate feed</span></div>
            <div className="lp-stat-div" />
            <div className="lp-stat"><span className="lp-stat-num">HRV</span><span className="lp-stat-lbl">ML analysis</span></div>
          </div>
        </div>
        {/* ECG decorative line */}
        <svg className="lp-ecg" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
          <polyline
            fill="none"
            stroke="#7c3aed"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.35"
            points="0,30 60,30 80,30 90,8 100,52 110,12 120,30 200,30 220,30 230,8 240,52 250,12 260,30 340,30 360,30 370,8 380,52 390,12 400,30 600,30"
          />
        </svg>
      </div>

      {/* ── Right panel – form ── */}
      <div className="lp-form-panel">
        {/* Tab switcher */}
        <div className="lp-tabs">
          <button
            className={`lp-tab${mode === 'login' ? ' active' : ''}`}
            onClick={() => switchMode('login')}
          >Sign in</button>
          <button
            className={`lp-tab${mode === 'register' ? ' active' : ''}`}
            onClick={() => switchMode('register')}
          >Create account</button>
        </div>

        {/* ── LOGIN FORM ── */}
        {mode === 'login' && (
          <form className="lp-form" onSubmit={handleLogin} noValidate>
            <div className="lp-form-head">
              <h2>Welcome back</h2>
              <p>Sign in to view your dashboard</p>
            </div>

            <Field label="Email address">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@university.ac.za" required autoComplete="email" />
            </Field>

            <Field label="Password">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required autoComplete="current-password" />
            </Field>

            {error && <p className="lp-error">{error}</p>}

            <button className="lp-submit" type="submit" disabled={loading}>
              {loading ? <span className="lp-spinner" /> : 'Sign in'}
            </button>

            <p className="lp-hint">
              No account yet?{' '}
              <button type="button" className="lp-link" onClick={() => switchMode('register')}>
                Register here
              </button>
            </p>
          </form>
        )}

        {/* ── REGISTER FORM personal details ── */}
        {mode === 'register' && step === 1 && (
          <form className="lp-form" onSubmit={handleStep1} noValidate>
            <div className="lp-form-head">
              <h2>Tell us about yourself</h2>
              <p>Step 1 of 2 — personal details</p>
            </div>

            <Field label="Full name">
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                placeholder="Jazzy Smith" required autoComplete="name" />
            </Field>

            <div className="lp-row">
              <Field label="Gender">
                <select value={gender} onChange={e => setGender(e.target.value)} required>
                  <option value="">Select…</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not-to-say">Prefer not to say</option>
                </select>
              </Field>

              <Field label="Age">
                <input type="number" value={age} onChange={e => setAge(e.target.value)}
                  placeholder="22" min="12" max="100" required />
              </Field>
            </div>

            <Field label="I am a…">
              <div className="lp-role-group">
                <RoleCard
                  value="athlete"
                  selected={role === 'athlete'}
                  onSelect={() => setRole('athlete')}
                  icon="🏃"
                  title="Athlete"
                  desc="Track my own heart rate and performance"
                />
                <RoleCard
                  value="coach"
                  selected={role === 'coach'}
                  onSelect={() => setRole('coach')}
                  icon="📋"
                  title="Coach"
                  desc="Monitor my team's health and analytics"
                />
              </div>
            </Field>

            {error && <p className="lp-error">{error}</p>}

            <button className="lp-submit" type="submit">
              Continue →
            </button>

            <p className="lp-hint">
              Already registered?{' '}
              <button type="button" className="lp-link" onClick={() => switchMode('login')}>
                Sign in
              </button>
            </p>
          </form>
        )}

        {/* ── REGISTER FORM – STEP 2: credentials ── */}
        {mode === 'register' && step === 2 && (
          <form className="lp-form" onSubmit={handleRegister} noValidate>
            <div className="lp-form-head">
              <h2>Set your credentials</h2>
              <p>Step 2 of 2 — account security</p>
            </div>

            {/* Summary chip */}
            <div className="lp-summary-chip">
              <span className="lp-summary-role">{role === 'athlete' ? '🏃 Athlete' : '📋 Coach'}</span>
              <span>{fullName}</span>
              <span className="lp-summary-dot">·</span>
              <span>{gender}</span>
              <span className="lp-summary-dot">·</span>
              <span>Age {age}</span>
              <button type="button" className="lp-edit-btn" onClick={() => { setError(''); setStep(1); }}>
                Edit
              </button>
            </div>

            <Field label="Email address">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@university.ac.za" required autoComplete="email" />
            </Field>

            <Field label="Password">
              <input type="password" value={password} onChange={e => setPassword(e.target.value)}
                placeholder="At least 6 characters" required autoComplete="new-password" />
            </Field>

            <Field label="Confirm password">
              <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repeat your password" required autoComplete="new-password" />
            </Field>

            {error && <p className="lp-error">{error}</p>}

            <button className="lp-submit" type="submit" disabled={loading}>
              {loading ? <span className="lp-spinner" /> : 'Create account'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function Field({ label, children }) {
  return (
    <div className="lp-field">
      <label className="lp-label">{label}</label>
      {children}
    </div>
  );
}

function RoleCard({ selected, onSelect, icon, title, desc }) {
  return (
    <button
      type="button"
      className={`lp-role-card${selected ? ' selected' : ''}`}
      onClick={onSelect}
      aria-pressed={selected}
    >
      <span className="lp-role-icon" aria-hidden="true">{icon}</span>
      <span className="lp-role-title">{title}</span>
      <span className="lp-role-desc">{desc}</span>
      {selected && <span className="lp-role-check" aria-hidden="true">✓</span>}
    </button>
  );
}

// ── Error helper ──────────────────────────────────────────────────────────────
function friendlyError(code) {
  const map = {
    'auth/user-not-found': 'No account found with that email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Please enter a valid email address.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/invalid-credential': 'Incorrect email or password.',
  };
  return map[code] || 'Something went wrong. Please try again.';
}

export default LoginPage;
