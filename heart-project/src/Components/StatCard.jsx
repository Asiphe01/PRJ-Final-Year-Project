function StatCard({ title, value, subtitle, children }){
    return (
        <div className="stat-card">
            <p className="stat-title">{title}</p>
            {chidren}
            <p className="stat-value">{value}</p>
            {subtitle && <p classNmame="stat-subtitle">{subtitle}</p>}
        </div>
    );
}

export default StatCard;