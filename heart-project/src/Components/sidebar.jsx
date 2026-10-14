import React from 'react';
import { User, Home, LayoutDashboard, FileText, LogOut } from 'lucide-react';

function Sidebar({ activeTab, onSelectTab, onSignOut }) {
    return (
        <aside className="sidebar">
            <nav className="nav-list">
                <button
                    className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => onSelectTab('profile')}
                >
                    <User size={20} />
                </button>

                <button
                    className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                    onClick={() => onSelectTab('home')}
                >
                    <Home size={20} />
                </button>

                <button
                    className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => onSelectTab('dashboard')}
                >
                    <LayoutDashboard size={20} />
                </button>

                <button
                    className={`nav-item ${activeTab === 'reports' ? 'active' : ''}`}
                    onClick={() => onSelectTab('reports')}
                >
                    <FileText size={20} />
                </button>
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item logout-button" onClick={onSignOut}>
                    <LogOut size={20} className="logout-icon" />
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;