import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.75rem',
        padding: '1rem 1.25rem',
        backgroundColor: 'var(--brand-red-light)',
        border: '1px solid rgba(229, 9, 20, 0.25)',
        borderRadius: 'var(--radius-sm)',
        color: 'var(--brand-red)',
        marginBottom: '1.25rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
        <AlertCircle size={20} style={{ flexShrink: 0, color: 'var(--brand-red)' }} />
        <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--text-primary)' }}>{message}</span>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-sm btn-danger-outline">
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
