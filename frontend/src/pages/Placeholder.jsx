import React from 'react';
import { Construction } from 'lucide-react';

const Placeholder = ({ title }) => {
    return (
        <div className="placeholder-page">
            <Construction size={64} className="icon" />
            <h1>{title}</h1>
            <p>This feature is coming soon in Phase 2.</p>

            <style>{`
        .placeholder-page {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          text-align: center;
        }
        .icon {
          color: var(--primary-color);
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        h1 {
          color: var(--text-primary);
          margin-bottom: 0.5rem;
        }
      `}</style>
        </div>
    );
};

export default Placeholder;
