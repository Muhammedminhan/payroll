import React, { useState, useEffect } from 'react';
import { Bell, CheckCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';

// --- Simple Notification Modal (Step 1) ---
const NotificationModal = ({ isOpen, notification, onAcknowledge, onClose }) => {
    if (!isOpen || !notification) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-content mobile-modal pop-in">
                <button className="close-corner-btn" onClick={onClose}><X size={20} /></button>
                <h2 className="modal-title">{notification.title}</h2>
                <p className="modal-text">{notification.message}</p>
                <div className="modal-actions-centered">
                    <button onClick={() => onAcknowledge(notification)} className="btn-primary-rect-full">View Profile & Confirm</button>
                </div>
            </div>
        </div>
    );
};

const SuccessBanner = ({ message, onClose }) => (
    <div className="success-banner pop-down">
        <div className="banner-content">
            <CheckCircle size={20} color="white" />
            <span>{message}</span>
        </div>
        <button className="banner-close" onClick={onClose}><X size={16} /></button>
    </div>
);

const Overview = () => {
    const { user } = useAuth();
    const { actionRequiredNotification } = useNotifications();
    const navigate = useNavigate();
    const location = useLocation();

    const [activeNotification, setActiveNotification] = useState(null);
    const [showSuccess, setShowSuccess] = useState(!!location.state?.success);

    useEffect(() => {
        if (actionRequiredNotification && !activeNotification) {
            setActiveNotification(actionRequiredNotification);
        }
    }, [actionRequiredNotification, activeNotification]);

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(() => setShowSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [showSuccess]);

    const handleInitialAcknowledge = (notif) => {
        setActiveNotification(null);
        navigate('/profile', { state: { triggerAction: true, notificationId: notif.id } });
    };

    const userInitialsUrl = `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=B800C4&color=fff&size=128`;

    return (
        <div className="overview-page">
            {showSuccess && <SuccessBanner message={location.state?.message || "Action completed successfully"} onClose={() => setShowSuccess(false)} />}

            <div className="mobile-hero-v4">
                <div className="mobile-avatar-circle" onClick={() => navigate('/profile')}>
                    <img src={user?.avatar || userInitialsUrl} alt="user" />
                </div>
                <h1 className="mobile-welcome">Welcome {user?.name?.split(' ')[0] || 'User'}</h1>
            </div>

            <header className="overview-header desktop-only">
                <div className="header-text">
                    <p className="welcome-tag">👋 Welcome, {user?.name?.split(' ')[0] || 'User'}!</p>
                    <h1 className="page-title">Ready to dive in? What's your first move?</h1>
                    <p className="current-date">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
            </header>

            <div className="dashboard-grid">
                <div className="action-card-small" onClick={() => navigate('/payslips')}>
                    <div className="card-content">
                        <h2>Your Payslips</h2>
                        <p className="card-desc">View and download your monthly salary statements.</p>
                    </div>
                    <div className="card-icon-container">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                            <rect x="25" y="30" width="50" height="40" rx="8" fill="#B800C4" />
                            <circle cx="30" cy="70" r="10" fill="var(--card-bg)" stroke="#B800C4" strokeWidth="2" />
                            <path d="M26 70H34M30 66V74" stroke="#B800C4" strokeWidth="2" strokeLinecap="round" />
                            <rect x="35" y="20" width="30" height="20" rx="4" fill="var(--card-bg)" opacity="0.8" />
                        </svg>
                    </div>
                </div>
                <div className="action-card-small" onClick={() => navigate('/documents')}>
                    <div className="card-content">
                        <h2>Pending Documents</h2>
                        <p className="card-desc">Complete requirements and upload missing files.</p>
                    </div>
                    <div className="card-icon-container">
                        <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                            <path d="M20 75L50 20L80 75H20Z" fill="#B800C4" />
                            <rect x="47" y="45" width="6" height="15" rx="3" fill="var(--card-bg)" />
                            <circle cx="50" cy="65" r="3" fill="var(--card-bg)" />
                        </svg>
                    </div>
                </div>
                <div className="action-card-large" onClick={() => window.open('https://yougotagift.zohodesk.in/portal/en/signin', '_blank')}>
                    <div className="card-content">
                        <h2>HR Ticketing System</h2>
                        <p className="card-desc">Need help? Raise a support ticket directly with the HR team.</p>
                        <button className="btn-request">Request Assistance</button>
                    </div>
                    <div className="card-icon-container">
                        <svg width="120" height="100" viewBox="0 0 120 100" fill="none">
                            <rect x="30" y="34" width="40" height="42" rx="12" fill="var(--border-color)" />
                            <rect x="54" y="30" width="64" height="48" rx="18" fill="#B800C4" />
                            <line x1="106" y1="38" x2="90" y2="54" stroke="var(--card-bg)" strokeWidth="8" strokeLinecap="round" />
                            <circle cx="83" cy="62" r="5.5" fill="var(--card-bg)" />
                        </svg>
                    </div>
                </div>
            </div>

            <NotificationModal
                isOpen={!!activeNotification}
                notification={activeNotification}
                onAcknowledge={handleInitialAcknowledge}
                onClose={() => setActiveNotification(null)}
            />

            <style>{`
                .overview-page { display: flex; flex-direction: column; gap: 3rem; }
                
                .mobile-hero-v4 { display: none; flex-direction: column; align-items: center; text-align: center; margin-bottom: 0.5rem; padding: 1rem 0; }
                .mobile-avatar-circle { width: 64px; height: 64px; border-radius: 50%; overflow: hidden; margin-bottom: 1rem; border: 2.5px solid var(--card-bg); box-shadow: 0 8px 16px var(--shadow-color); cursor: pointer; }
                .mobile-avatar-circle img { width: 100%; height: 100%; object-fit: cover; }
                .mobile-welcome { font-size: 1.25rem; font-weight: 700; color: var(--text-primary); letter-spacing: -0.01em; }

                @media (max-width: 768px) {
                    .mobile-hero-v4 { display: flex; }
                    .desktop-only { display: none !important; }
                    .overview-page { gap: 1.25rem; padding-bottom: 2rem; }
                    .dashboard-grid { gap: 0.85rem; }
                    .action-card-small, .action-card-large { padding: 1.25rem; border-radius: 18px; min-height: 140px; align-items: center; }
                    .card-content h2 { font-size: 1.1rem; max-width: 150px; margin-bottom: 0.25rem; line-height: 1.3; }
                    .card-desc { display: none; }
                    .card-icon-container { flex-shrink: 0; }
                    .card-icon-container svg { width: 70px; height: 70px; }
                    .btn-request { padding: 0.6rem 1.5rem; font-size: 0.85rem; border-radius: 10px; }
                }

                .overview-header { display: flex; justify-content: space-between; align-items: flex-start; }
                .welcome-tag { font-size: 1.1rem; color: var(--text-secondary); font-weight: 600; margin-bottom: 0.5rem; }
                .page-title { font-size: 2.8rem; font-weight: 800; color: var(--text-primary); line-height: 1.1; max-width: 600px; }

                .dashboard-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 2.5rem;
                    margin-top: 2rem;
                    max-width: 900px;
                }

                .action-card-small, .action-card-large { 
                    background: var(--card-bg); 
                    border-radius: 28px; 
                    padding: 2.5rem 3rem; 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    cursor: pointer; 
                    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1); 
                    box-shadow: 0 4px 25px var(--shadow-color);
                    border: 1px solid var(--border-color);
                }
                .action-card-small:hover, .action-card-large:hover {
                    box-shadow: 0 15px 40px var(--shadow-color);
                    transform: translateY(-6px);
                    border-color: rgba(184, 0, 196, 0.2);
                }
                .card-content h2 { font-size: 1.8rem; font-weight: 800; color: var(--text-primary); margin-bottom: 0.5rem; }
                .card-desc { font-size: 0.95rem; color: var(--text-secondary); font-weight: 500; margin-bottom: 1.5rem; max-width: 300px; line-height: 1.5; }
                .btn-request { background: #B800C4; color: white; border: none; padding: 0.8rem 2.5rem; border-radius: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; box-shadow: 0 4px 12px rgba(184, 0, 196, 0.2); }
                .btn-request:hover { background: #a000aa; transform: scale(1.02); }

                /* Notifications */
                .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; z-index: 2000; padding: 1.5rem; }
                .mobile-modal { max-width: 440px; width: 100%; padding: 2.5rem; border-radius: 24px; background: var(--card-bg); position: relative; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); border: 1px solid var(--border-color); }
                .modal-title { font-size: 1.75rem; font-weight: 800; color: var(--text-primary); margin-bottom: 1rem; }
                .modal-text { color: var(--text-secondary); font-size: 1rem; line-height: 1.6; margin-bottom: 2.5rem; }
                .modal-actions-centered { display: flex; justify-content: center; }
                .btn-primary-rect-full { width: 100%; background: #B800C4; color: white; font-weight: 700; font-size: 1rem; padding: 1.1rem; border-radius: 14px; border: none; cursor: pointer; box-shadow: 0 4px 12px rgba(184, 0, 196, 0.3); }
                .close-corner-btn { position: absolute; top: 1.5rem; right: 1.5rem; color: var(--text-secondary); background: none; border: none; cursor: pointer; }

                .success-banner { position: fixed; top: 2rem; left: 50%; transform: translateX(-50%); background: #4ADE80; color: white; padding: 0.75rem 2rem; border-radius: 2rem; display: flex; align-items: center; gap: 1rem; z-index: 3000; box-shadow: 0 10px 15px rgba(0,0,0,0.1); width: max-content; max-width: 90%; }
                .banner-content { display: flex; align-items: center; gap: 0.75rem; font-weight: 600; font-size: 0.9rem; }
                .banner-close { background: none; border: none; color: white; cursor: pointer; }

                @media (max-width: 768px) {
                    .mobile-modal { padding: 2rem 1.5rem; }
                    .success-banner { top: 1rem; padding: 0.75rem 1.5rem; }
                }
                
                .pop-in { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
                @keyframes popIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
                .pop-down { animation: popDown 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
                @keyframes popDown { from { opacity: 0; transform: translate(-50%, -20px); } to { opacity: 1; transform: translate(-50%, 0); } }
            `}</style>
        </div>
    );
};

export default Overview;
