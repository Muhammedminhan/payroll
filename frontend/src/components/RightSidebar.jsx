import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Edit3, User, Mail, Calendar, Hash, ChevronDown, Sun, Moon } from 'lucide-react';

const RightSidebar = () => {
    const { user, isDarkMode, toggleDarkMode } = useAuth();
    const navigate = useNavigate();
    const [isInfoExpanded, setIsInfoExpanded] = useState(true);

    return (
        <aside className="right-sidebar">
            <div className="rs-header">
                <h3>Profile</h3>
                <div className="rs-header-actions">
                    <button
                        className="theme-toggle"
                        onClick={toggleDarkMode}
                    >
                        {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
                        <div className={`toggle-dot ${isDarkMode ? 'dark' : ''}`}></div>
                    </button>
                    <button className="icon-btn-plain" onClick={() => navigate('/profile')}>
                        <Edit3 size={18} />
                    </button>
                </div>
            </div>

            <div className="profile-card">
                <div className="avatar-wrapper">
                    <img
                        src={user?.avatar || "https://i.pravatar.cc/150?u=paul"}
                        alt="Profile"
                        className="main-avatar"
                    />
                </div>
                <h2 className="user-name">{user?.name || "Paul Barber"}</h2>
                <p className="user-role">{user?.role || "Sales Co-ordinator"}</p>
            </div>

            <div className="info-section">
                <div className="section-header" onClick={() => setIsInfoExpanded(!isInfoExpanded)}>
                    <span>Your Info</span>
                    <ChevronDown size={18} className={`chevron ${isInfoExpanded ? 'up' : ''}`} />
                </div>

                {isInfoExpanded && (
                    <div className="info-list-container">
                        <div className="info-list-v2">
                            <div className="info-item-v2">
                                <div className="item-left">
                                    <div className="item-icon-circle"><Hash size={16} /></div>
                                    <span className="item-label-v2">Consultant ID</span>
                                </div>
                                <span className="item-value-v2">{user?.consultantId || 'HRM65'}</span>
                            </div>
                            <div className="info-item-v2">
                                <div className="item-left">
                                    <div className="item-icon-circle"><User size={16} /></div>
                                    <span className="item-label-v2">Gender</span>
                                </div>
                                <span className="item-value-v2">{user?.gender || 'Male'}</span>
                            </div>
                            <div className="info-item-v2">
                                <div className="item-left">
                                    <div className="item-icon-circle"><Calendar size={16} /></div>
                                    <span className="item-label-v2">Date Of Birth</span>
                                </div>
                                <span className="item-value-v2">{user?.dob ? new Date(user.dob).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '10 Mar 1996'}</span>
                            </div>
                            <div className="info-item-v2">
                                <div className="item-left">
                                    <div className="item-icon-circle"><Mail size={16} /></div>
                                </div>
                                <span className="item-value-v2 truncate-end">{user?.email || 'paul.barber@yougotagift.com'}</span>
                            </div>
                            <div className="info-item-v2">
                                <div className="item-left">
                                    <div className="item-icon-circle"><Calendar size={16} /></div>
                                    <span className="item-label-v2">Contract Start</span>
                                </div>
                                <span className="item-value-v2">{user?.contractStart ? new Date(user.contractStart).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '12 April 2021'}</span>
                            </div>
                            <div className="info-item-v2">
                                <div className="item-left">
                                    <div className="item-icon-circle"><Calendar size={16} /></div>
                                    <span className="item-label-v2">Contract End</span>
                                </div>
                                <span className="item-value-v2">{user?.contractEnd ? new Date(user.contractEnd).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : '14 April 2023'}</span>
                            </div>
                            <div className="info-item-v2">
                                <div className="item-left">
                                    <div className="item-icon-circle"><Edit3 size={16} /></div>
                                    <span className="item-label-v2">Consultant Fee</span>
                                </div>
                                <span className="item-value-v2">{user?.consultantFee || '650000'}</span>
                            </div>
                        </div>
                        <div className="expand-indicator-v2">
                            <div className="indicator-dot">
                                <ChevronDown size={12} color="#B800C4" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="reporting-card-v2">
                <div className="reporting-left">
                    <div className="rep-icon-circle">
                        <User size={16} />
                    </div>
                    <span>Reporting to</span>
                </div>
                <span className="reporting-name-v2">{user?.reportingTo?.name ? `${user.reportingTo.name} - ${user.reportingTo.role}` : 'Ashin K N - CTO'}</span>
            </div>

            <div className="bank-section-v2">
                <div className="section-header-v2">
                    <span>Your Bank Details</span>
                    <div className="toggle-indicator-circle">
                        <ChevronDown size={14} className="up" />
                    </div>
                </div>

                <div className="bank-card-v2">
                    <div className="bank-card-main">
                        <div className="card-top-row">
                            <div className="field-group">
                                <span className="f-label">ACCOUNT NO</span>
                                <span className="f-value">{user?.bankDetails?.accountNumber || '73030100178'}</span>
                            </div>
                            <div className="chip-icon">
                                <svg width="36" height="26" viewBox="0 0 40 30" fill="none">
                                    <rect width="40" height="30" rx="6" fill="var(--text-secondary)" opacity="0.2" />
                                    <path d="M8 8H18M8 15H18M8 22H18M26 8H32V22H26V8Z" stroke="var(--text-secondary)" strokeWidth="1.5" opacity="0.4" />
                                </svg>
                            </div>
                        </div>

                        <div className="card-mid-row">
                            <div className="field-group">
                                <span className="f-label">IFSC CODE</span>
                                <span className="f-value-small">{user?.bankDetails?.ifscCode || 'ICIC0007'}</span>
                            </div>
                            <div className="field-group align-right">
                                <span className="f-label">MICR CODE</span>
                                <span className="f-value-small">{user?.bankDetails?.micrCode || '673220'}</span>
                            </div>
                        </div>

                        <div className="card-bottom-row">
                            <span className="owner-name">{(user?.name || "PAUL BARBER").toUpperCase()}</span>
                            <div className="mastercard-logo">
                                <div className="mc-circle mc-red"></div>
                                <div className="mc-circle mc-orange"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="branch-footer-v2">
                    {user?.bankDetails?.branchAddress || 'UCL Cyberpark Branch, Nellikode P.O, Calicut 673016'}
                </div>
            </div>

            <style>{`
            .right-sidebar {
                width: 350px;
                height: 100vh;
                background: var(--sidebar-bg);
                border-left: 1px solid var(--border-color);
                padding: 2.5rem 2rem;
                position: fixed;
                right: 0;
                top: 0;
                overflow-y: auto;
                z-index: 40;
                transition: background 0.3s, border-color 0.3s;
            }

            @media (max-width: 1200px) {
                .right-sidebar {
                    display: none;
                }
            }

            .rs-header {
                display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
                }

            .rs-header h3 {
                font - size: 1.25rem;
            font-weight: 800;
            color: var(--text-primary);
                }

            .rs-header-actions {
                display: flex;
            align-items: center;
            gap: 0.75rem;
                }

            .theme-toggle {
                background: var(--card-bg);
            border: 1px solid var(--border-color);
            padding: 4px 8px;
            border-radius: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            box-shadow: 0 2px 4px var(--shadow-color);
            transition: all 0.2s;
                }

            .toggle-dot {
                width: 12px;
            height: 12px;
            background: #B800C4;
            border-radius: 50%;
            transition: transform 0.2s;
                }

            .toggle-dot.dark {
                transform: translateX(10px);
                }

            .icon-btn-plain {
                background: var(--card-bg);
            border: 1px solid var(--border-color);
            color: #B800C4;
            padding: 8px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 2px 4px var(--shadow-color);
            transition: all 0.2s;
                }
            .profile-card {
                text-align: center;
                padding-bottom: 1.25rem;
            }

            .avatar-wrapper {
                width: 80px;
                height: 80px;
                margin: 0 auto 1rem;
                border-radius: 50%;
                overflow: hidden;
                border: 4px solid var(--card-bg);
                box-shadow: 0 8px 25px var(--shadow-color);
                transition: all 0.3s;
            }

            .main-avatar {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

                .user-name {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: var(--text-primary);
                    margin-bottom: 0.2rem;
                }

                .user-role {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                }

            .info-list-container {
                background: var(--card-bg);
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 4px 20px var(--shadow-color);
            border: 1px solid var(--border-color);
            transition: background-color 0.3s;
                }

            .info-list-v2 {
                padding: 1.25rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
                }

            .info-item-v2 {
                display: flex;
            justify-content: space-between;
            align-items: center;
                }

            .item-left {
                display: flex;
            align-items: center;
            gap: 0.75rem;
                }

            .item-icon-circle {
                width: 28px;
            height: 28px;
            background: var(--bg-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
                }

                .item-label-v2 {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                }

                .item-value-v2 {
                    font-size: 0.9rem;
                    color: var(--text-primary);
                    font-weight: 700;
                    text-align: right;
                }

                .truncate-end {
                    max-width: 200px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    color: var(--text-secondary);
                    font-weight: 500;
                }

            .expand-indicator-v2 {
                display: flex;
            justify-content: center;
            padding-bottom: 0.75rem;
                }

            .indicator-dot {
                width: 20px;
            height: 20px;
            border: 1px solid var(--border-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
                }

            .reporting-card-v2 {
                display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.25rem 1.5rem;
            background: var(--card-bg);
            border-radius: 20px;
            box-shadow: 0 4px 20px var(--shadow-color);
            border: 1px solid var(--border-color);
            transition: background-color 0.3s;
                }

            .reporting-left {
                display: flex;
            align-items: center;
            gap: 0.75rem;
            color: var(--text-secondary);
            font-size: 0.9rem;
            font-weight: 500;
                }

                .reporting-name-v2 {
                    font-size: 0.9rem;
                    font-weight: 700;
                    color: var(--text-primary);
                }

            .bank-section-v2 {
                background: var(--bg-color);
            border-radius: 24px;
            padding: 4px;
            border: 1px solid var(--border-color);
            transition: background-color 0.3s;
                }

            .section-header-v2 {
                padding: 1rem 1.25rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 0.95rem;
            font-weight: 700;
            color: var(--text-primary);
                }

            .bank-card-v2 {
                background: var(--card-bg);
            border-radius: 20px;
            padding: 1.5rem;
            box-shadow: 0 4px 20px var(--shadow-color);
                }

            .bank-card-main {
                display: flex;
            flex-direction: column;
            gap: 1.5rem;
                }

            .card-top-row, .card-mid-row, .card-bottom-row {
                display: flex;
            justify-content: space-between;
            align-items: center;
                }

            .field-group {
                display: flex;
            flex-direction: column;
            gap: 4px;
                }

                .align-right { text-align: right; }

                .f-label {
                    font-size: 0.65rem;
                    color: var(--text-secondary);
                    font-weight: 600;
                    letter-spacing: 0.05em;
                }

                .f-value {
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: var(--text-primary);
                    letter-spacing: 0.5px;
                }

                .owner-name {
                    font-size: 1.1rem;
                    font-weight: 800;
                    color: var(--text-primary);
                }

            .mastercard-logo {
                display: flex;
            margin-left: -10px;
                }

                .rep-icon-circle {
                    width: 28px;
                    height: 28px;
                    background: var(--bg-color);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-secondary);
                }

                .toggle-indicator-circle {
                    width: 24px;
                    height: 24px;
                    border: 1.5px solid var(--border-color);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #B800C4;
                }

                .f-value-small {
                    font-size: 0.95rem;
                    font-weight: 800;
                    color: var(--text-primary);
                }

                .mc-circle {
                    width: 22px;
                    height: 22px;
                    border-radius: 50%;
                }

                .mc-red { background: #eb001b; z-index: 1; }
                .mc-orange { background: #ff5f00; margin-left: -12px; opacity: 0.8; }

                .branch-footer-v2 {
                    margin-top: 1rem;
                    padding: 0 1rem;
                    font-size: 0.75rem;
                    color: var(--text-secondary);
                    text-align: center;
                    line-height: 1.4;
                    font-weight: 500;
                }
            `}</style>
        </aside >
    );
};

export default RightSidebar;
