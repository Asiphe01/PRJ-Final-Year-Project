import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { auth, db } from '../firebase';

// Tracks the signed-in Firebase user AND their Realtime Database profile
export function useUserProfile() {
  const [authUser, setAuthUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setAuthUser(firebaseUser);
      if (!firebaseUser) {
        setProfile(null);
        setLoading(false);
      }
    });
    return unsubAuth;
  }, []);

  useEffect(() => {
    if (!authUser) return;
    setLoading(true);
    const userRef = ref(db, `users/${authUser.uid}`);
    const unsubDoc = onValue(userRef, (snap) => {
      setProfile(snap.exists() ? { id: authUser.uid, ...snap.val() } : null);
      setLoading(false);
    });
    return unsubDoc;
  }, [authUser]);

  return { authUser, profile, loading };
}