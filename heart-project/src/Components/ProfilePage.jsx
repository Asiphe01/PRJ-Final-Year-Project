import { useState } from 'react';

// Read user details from browser cache (localStorage)
const getCachedUserData = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole') || localStorage.getItem('role');
    const fullName = localStorage.getItem('userName') || localStorage.getItem('fullName');
    const gender = localStorage.getItem('userGender');
    const age = localStorage.getItem('userAge');
    const height = localStorage.getItem('userHeight');

    // If no cache/token exists, there is no user
    if (!token && !fullName) {
        return null;
    }

    return {
        fullName: fullName || 'Not Provided',
        role: role ? role.toUpperCase() : 'USER',
        gender: gender || 'Not Provided',
        age: age || 'Not Provided',
        height: height ? `${height} cm` : 'Not Provided',
        tokenSnippet: token ? `${token.substring(0, 15)}...` : 'No active session token',
    };
};

const ProfilePage = () => {
    const [userData, setUserData] = useState(getCachedUserData);

    const handleLogout = () => {
        // Clear the cache
        localStorage.clear();
        setUserData(null);
    };

    // Show a message or fallback state if no user is logged in
    if (!userData) {
        return (
            <div className="profile-container">
                <div className="profile-card">
                    <h2>No Active Session</h2>
                    <p className="subtitle">You have cleared the cache or are logged out.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>User Profile</h2>
                <p className="subtitle">Manage your account details</p>
                
                <div className="credential-group">
                    <label>Full Name</label>
                    <div className="credential-value">{userData.fullName}</div>
                </div>

                <div className="credential-group">
                    <label>Role</label>
                    <div className={`badge ${userData.role.toLowerCase()}`}>{userData.role}</div>
                </div>

                <div className="info-grid">
                    <div className="credential-group">
                        <label>Gender</label>
                        <div className="credential-value">{userData.gender}</div>
                    </div>
                    <div className="credential-group">
                        <label>Age</label>
                        <div className="credential-value">{userData.age}</div>
                    </div>
                </div>

                <div className="credential-group">
                    <label>Height</label>
                    <div className="credential-value">{userData.height}</div>
                </div>

                <button className="logout-btn" onClick={handleLogout}>
                    Clear Cache & Logout
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;