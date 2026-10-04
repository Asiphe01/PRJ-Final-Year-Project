import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Read user details from browser cache (localStorage)
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole') || localStorage.getItem('role');
        const fullName = localStorage.getItem('userName') || localStorage.getItem('fullName');
        const gender = localStorage.getItem('userGender');
        const age = localStorage.getItem('userAge');
        const height = localStorage.getItem('userHeight');

        // If no cache/token exists, redirect to login
        if (!token && !fullName) {
            navigate('/login');
            return;
        }

        // Set state with cached information// This will be displayed on the profile pa
        setUserData ({
            fullName: fullName || 'Not Provided',
            role: role ? role.toUpperCase() : 'USER',
            gender: gender || 'Not Provided',
            age: age || 'Not Provided',
            height: height ? `${height} cm` : 'Not Provided',
            tokenSnippet: token ? `${token.substring(0, 15)}...` : 'No active session token'
        });
    }, [navigate]);

    const handleLogout = () => {
        // Clear the entry cache
        localStorage.clear();
        navigate('/login');
    };

    if (!userData) {
        return <div className="loading">Loading profile from cache...</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2>User Profile & Credentials</h2>
                <p className="subtitle">Retrieved from local entry cache</p>

                <div className="credential-group">
                    <label>Full Name</label>
                    <div className="credential-value">{userData.fullName}</div>
                </div>

                <div className="credential-group">
                    <label>Role</label>
                    <div className={`badge ${userData.role.toLowerCase()}`}>
                        {userData.role}
                    </div>
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
                    <div className="credential-group">
                        <label>Height</label>
                        <div className="credential-value">{userData.height}</div>
                    </div>
                </div>

                <div className="credential-group">
                    <label>Active Session Token (Cache)</label>
                    <div className="credential-value token-box">{userData.tokenSnippet}</div>
                </div>

                <div className="action-buttons">
                    <button className="logout-btn" onClick={handleLogout}>
                        Clear Cache & Logout
                    </button>
                    
                    {/* Link back to the login page for already logged-in users */}
                    <Link to="/login" className="login-link-btn">
                        Switch Account / Login Page
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;