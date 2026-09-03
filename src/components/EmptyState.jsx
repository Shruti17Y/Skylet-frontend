import React from 'react';
import { PackageX } from 'lucide-react';

const EmptyState = ({ title = 'No items found', message = 'There are no items to display at this moment.', actionText, onAction }) => {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 1.5rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', backgroundColor: 'var(--primary-blue-light)', color: 'var(--primary-blue)', marginBottom: '1rem' }}>
        <PackageX size={40} />
      </div>
      <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-primary)', fontWeight: 700 }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', margin: '0 auto 1.5rem auto', fontSize: '0.9rem' }}>{message}</p>
      {actionText && onAction && (
        <button onClick={onAction} className="btn btn-primary">
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
