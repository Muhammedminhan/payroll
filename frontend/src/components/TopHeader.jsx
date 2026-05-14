import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bell, Menu, User, UserCircle, LogOut, Settings, HelpCircle, ChevronRight, MoreVertical, Clock, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../context/NotificationContext';
import logoImg from '../assets/logo.jpg';
import { ROUTES } from '../constants/routes';
import { MEDIA_BASE_URL } from '../api';

const TopHeader = ({ onMenuClick }) => {
    const { user } = useAuth();
    const { notifications, unreadCount, markAsRead } = useNotifications();
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleNotificationClick = (notif) => {
        if (!notif.is_read) markAsRead(notif.id);
        setShowDropdown(false);
        if (notif.notification_type === 'ACTION_REQUIRED') {
            navigate(ROUTES.PROFILE, { state: { triggerAction: true, notificationId: notif.id } });
        }
    };

    return (
        <header className="top-header">
            <div className="mobile-header-logo">
                <img 
                  src={logoImg} 
                  alt="YOU Payroll" 
                  className="header-logo" 
                  onError={(e) => {
                    e.target.src = `${MEDIA_BASE_URL}/media/branding/logo.jpg`;
                  }}
                />
            </div>

            <button className="mobile-menu-btn" onClick={onMenuClick}>
                <Menu size={24} />
            </button>

            <div className="header-actions">
                <div className="notification-wrapper" ref={dropdownRef}>
                    <button
                        className={`notification-btn ${showDropdown ? 'active' : ''}`}
                        onClick={() => setShowDropdown(!showDropdown)}
                    >
                        <Bell size={20} color="#94a3b8" />
                        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
                    </button>

                    {showDropdown && (
                        <div className="notification-dropdown pop-in">
                            <div className="dropdown-header">
                                <h3>Notifications</h3>
                                {unreadCount > 0 && <span className="unread-dot-label">{unreadCount} New</span>}
                            </div>
                            <div className="notification-list">
                                {notifications.filter(n => !n.is_read).length > 0 ? (
                                    notifications.filter(n => !n.is_read).map(notif => (
                                        <div
                                            key={notif.id}
                                            className="notification-item unread"
                                            onClick={() => handleNotificationClick(notif)}
                                        >
                                            <div className="notif-icon-box">
                                                {notif.notification_type === 'ACTION_REQUIRED' ?
                                                    <Clock size={16} color="#B800C4" /> :
                                                    <CheckCircle size={16} color="#10b981" />
                                                }
                                            </div>
                                            <div className="notif-content">
                                                <p className="notif-title">{notif.title}</p>
                                                <p className="notif-msg">{notif.message}</p>
                                                <span className="notif-time">Just now</span>
                                            </div>
                                            <span className="active-dot"></span>
                                        </div>
                                    ))
                                ) : (
                                    <div className="empty-notif">
                                        <Bell size={32} color="#f1f5f9" />
                                        <p>No new notifications</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="user-profile-trigger desktop-only" onClick={() => navigate(ROUTES.PROFILE)}>
                    <div className="avatar-status-wrapper">
                        <img
                            src={user?.avatar || "https://i.pravatar.cc/150?u=paul"}
                            alt="avatar"
                            className="top-avatar"
                        />
                        <span className="status-indicator"></span>
                    </div>
                </div>
            </div>

            <style>{`
                .top-header {
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    padding: 0.5rem 0 2.5rem;
                    position: relative;
                }

                .mobile-header-logo {
                    display: none;
                    overflow: visible;
                }

                .header-logo {
                    width: 85px;
                    max-width: 100%;
                    height: auto;
                    display: block;
                    object-fit: contain;
                }

                body.dark-mode .header-logo {
                    filter: invert(1) hue-rotate(180deg) contrast(1.4) saturate(1.2) brightness(1.1);
                    mix-blend-mode: screen;
                }

                .mobile-menu-btn {
                    display: none;
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-primary);
                    cursor: pointer;
                    box-shadow: 0 2px 4px var(--shadow-color);
                }

                @media (max-width: 1200px) {
                    .top-header {
                        position: fixed;
                        top: 0;
                        left: 0;
                        right: 0;
                        padding: 0.75rem 1.25rem;
                        background: var(--bg-color);
                        z-index: 900;
                        justify-content: space-between;
                        border-bottom: 1px solid var(--border-color);
                        height: 64px;
                        box-sizing: border-box;
                    }
                    .mobile-header-logo {
                        display: flex;
                        align-items: center;
                    }
                    .mobile-menu-btn {
                        display: none!important;
                    }
                    .desktop-only {
                        display: none;
                    }
                }

                .header-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }

                .notification-wrapper {
                    position: relative;
                }

                .notification-btn {
                    width: 44px;
                    height: 44px;
                    background: var(--card-bg);
                    border: 1px solid var(--border-color);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 4px 6px -1px var(--shadow-color);
                }

                .notification-btn:hover, .notification-btn.active {
                    box-shadow: 0 10px 15px -3px var(--shadow-color);
                    transform: translateY(-2px);
                    border-color: #B800C4;
                }

                .badge {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    background: #B800C4;
                    color: white;
                    font-size: 0.7rem;
                    font-weight: 800;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border: 2px solid #f8fafc;
                    box-shadow: 0 2px 4px rgba(184, 0, 196, 0.2);
                }

                .notification-dropdown {
                    position: absolute;
                    top: 55px;
                    right: 0;
                    width: 320px;
                    background: var(--card-bg);
                    border-radius: 20px;
                    box-shadow: 0 20px 25px -5px var(--shadow-color);
                    border: 1px solid var(--border-color);
                    z-index: 1000;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .dropdown-header {
                    padding: 1.25rem 1.5rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid var(--border-color);
                }

                .dropdown-header h3 { font-size: 1rem; font-weight: 800; color: var(--text-primary); margin: 0; }
                .unread-dot-label { font-size: 0.7rem; font-weight: 700; color: #B800C4; background: rgba(184, 0, 196, 0.1); padding: 2px 8px; border-radius: 10px; }

                .notification-list { max-height: 400px; overflow-y: auto; }
                
                .notification-item {
                    padding: 1.25rem;
                    display: flex;
                    gap: 1rem;
                    cursor: pointer;
                    transition: background 0.2s;
                    position: relative;
                }

                .notification-item:hover { background: rgba(0, 0, 0, 0.02); }
                body.dark-mode .notification-item:hover { background: rgba(255, 255, 255, 0.05); }
                .notification-item.unread { background: rgba(184, 0, 196, 0.03); }
                .notification-item.unread:hover { background: rgba(184, 0, 196, 0.06); }

                .notif-icon-box {
                    width: 36px;
                    height: 36px;
                    border-radius: 12px;
                    background: var(--bg-color);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 6px var(--shadow-color);
                    flex-shrink: 0;
                }

                .notif-content { flex: 1; }
                .notif-title { font-size: 0.9rem; font-weight: 700; color: var(--text-primary); margin: 0 0 2px 0; }
                .notif-msg { font-size: 0.8rem; color: var(--text-secondary); margin: 0 0 6px 0; line-height: 1.4; }
                .notif-time { font-size: 0.7rem; color: var(--text-secondary); font-weight: 500; }

                .active-dot {
                    width: 8px;
                    height: 8px;
                    background: #B800C4;
                    border-radius: 50%;
                    position: absolute;
                    top: 1.25rem;
                    right: 1.25rem;
                }

                .empty-notif { padding: 3rem 1.5rem; text-align: center; color: var(--text-secondary); }
                .empty-notif p { font-size: 0.9rem; font-weight: 600; margin-top: 1rem; }

                .user-profile-trigger {
                    cursor: pointer;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .avatar-status-wrapper {
                    position: relative;
                    width: 44px;
                    height: 44px;
                }

                .top-avatar {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 2px solid var(--bg-color);
                    box-shadow: 0 4px 12px var(--shadow-color);
                }

                .status-indicator {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 12px;
                    height: 12px;
                    background: #22c55e;
                    border: 2.5px solid var(--bg-color);
                    border-radius: 50%;
                    box-shadow: 0 2px 4px var(--shadow-color);
                }

                .pop-in { animation: popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1); transform-origin: top right; }
                @keyframes popIn { from { opacity: 0; transform: scale(0.95) translateY(-10px); } to { opacity: 1; transform: scale(1) translateY(0); } }

                @media (max-width: 768px) {
                    .top-header { padding: 1rem 0; }
                }
            `}</style>
        </header>
    );
};

export default TopHeader;
