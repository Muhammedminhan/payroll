import React from 'react';
import { X } from 'lucide-react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Logout!</h2>
                </div>
                <p className="modal-body">Are you sure, you want to log out from YOUPayroll?</p>

                <div className="modal-actions">
                    <button onClick={onClose} className="cancel-btn">Cancel</button>
                    <button onClick={onConfirm} className="logout-btn">Logout</button>
                </div>
            </div>

            <style>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        
        .modal-content {
          background: white;
          padding: 2rem;
          border-radius: var(--radius-lg);
          width: 90%;
          max-width: 400px;
          text-align: center;
          box-shadow: var(--shadow-lg);
        }
        
        .modal-header h2 {
           font-size: 1.5rem;
           font-weight: 800;
           color: #000;
           margin-bottom: 0.5rem;
        }
        
        .modal-body {
           color: var(--text-secondary);
           margin-bottom: 2rem;
        }
        
        .modal-actions {
           display: flex;
           gap: 1rem;
           justify-content: center;
        }
        
        .cancel-btn {
           padding: 0.75rem 1.5rem;
           border: 1px solid var(--border-color);
           background: white;
           color: var(--text-primary);
           border-radius: var(--radius-md);
           font-weight: 600;
           cursor: pointer;
           flex: 1;
        }
        
        .logout-btn {
           padding: 0.75rem 1.5rem;
           background: #ef4444; /* Red-500 */
           color: white;
           border-radius: var(--radius-md);
           font-weight: 600;
           cursor: pointer;
           flex: 1;
        }
        
        .logout-btn:hover { background: #dc2626; }
      `}</style>
        </div>
    );
};

export default LogoutModal;
