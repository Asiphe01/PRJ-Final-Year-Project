import React from 'react';
import {User, Home, Bell, LayoutDashboard, FileText, LogOut} from 'lucide-react';
function Sidebar({ activeTab, onSelectTab }) {
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
                        <button className="nav-item logout-button">
                            <LogOut size={20} className="logout-icon" />
                        </button>
                    </div>
        </aside>
    );
}

export default Sidebar;
