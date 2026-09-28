import {User, Home, Bell, LayoutDashboard, FileText, LogOut} from 'lucide-react';
function Sidebar() {
    return (
        <div className="sidebar">
            <User size={20}/>
            <Home size={20}/>
            <Bell size={20}/>
            <LayoutDashboard size={20}/>
            <FileText size={20}/>
            <LogOut size={20}  className="logout-icon"/>
        </div>
    );
}

export default Sidebar;
