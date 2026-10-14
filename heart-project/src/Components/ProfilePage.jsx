import { useState } from 'react';

// Read user details from browser cache (localStorage)
const ProfilePage = ({ profile, authUser, onSignOut }) => {
    if (!profile) {
        return (
            <div className="profile-container">
                <div className="profile-card">
                    <h2>No Active Session</h2>
                    <p className="subtitle">You are not signed in.</p>
                </div>
            </div>
        );
    }

    return {
        fullName: fullName || 'Not Provided',
        role: role ? role.toUpperCase() : 'USER',
        gender: gender || 'Not Provided',
        age: age || 'Not Provided',
        height: height ? `${height} cm` : 'Not Provided',
        tokenSnippet: token ? `${token.substring(0, 15)}...` : 'No active session token',
    };


 const role = (profile.role || 'user').toUpperCase();
    

   

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>User Profile</h2>
                <p className="subtitle">Manage your account details</p>

                <div className="credential-group">
                    <label>Full Name</label>
                    <div className="credential-value">{profile.fullName}</div>
                </div>

                <div className="credential-group">
                    <label>Email</label>
                    <div className="credential-value">{authUser?.email}</div>
                </div>

                <div className="credential-group">
                    <label>Role</label>
                    <div className={`badge ${role.toLowerCase()}`}>{role}</div>
                </div>

                <div className="info-grid">
                    <div className="credential-group">
                        <label>Gender</label>
                        <div className="credential-value">{profile.gender || 'Not Provided'}</div>
                    </div>
                    <div className="credential-group">
                        <label>Age</label>
                        <div className="credential-value">{profile.age ?? 'Not Provided'}</div>
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