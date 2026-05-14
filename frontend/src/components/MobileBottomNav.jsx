import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Files, User } from 'lucide-react';

const MobileBottomNav = () => {
    return (
        <nav className="mobile-bottom-nav">
            <NavLink to="/" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                <LayoutDashboard size={22} />
                <span>Overview</span>
            </NavLink>
            <NavLink to="/payslips" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                <FileText size={22} />
                <span>Payslips</span>
            </NavLink>
            <NavLink to="/documents" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                <Files size={22} />
                <span>Documents</span>
            </NavLink>
            <NavLink to="/profile" className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}>
                <User size={22} />
                <span>Profile</span>
            </NavLink>

            <style>{`
                .mobile-bottom-nav {
                    display: none;
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    height: 64px;
                    background: var(--card-bg);
                    border-top: 1px solid var(--border-color);
                    padding: 0 0.5rem;
                    justify-content: space-around;
                    align-items: center;
                    z-index: 1000;
                    box-shadow: 0 -10px 20px -10px var(--shadow-color);
                    backdrop-filter: blur(12px);
                }

                @media (max-width: 768px) {
                    .mobile-bottom-nav {
                        display: flex;
                    }
                }

                .bottom-nav-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 3px;
                    color: var(--text-secondary);
                    text-decoration: none;
                    padding: 0.4rem;
                    min-width: 60px;
                    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 12px;
                }

                .bottom-nav-item span {
                    font-size: 0.6rem;
                    font-weight: 700;
                    letter-spacing: 0.01em;
                }

                .bottom-nav-item svg {
                    width: 20px;
                    height: 20px;
                }

                .bottom-nav-item.active {
                    color: #B800C4;
                }

                .bottom-nav-item.active svg {
                    transform: scale(1.1);
                }
            `}</style>
        </nav>
    );
};

export default MobileBottomNav;
