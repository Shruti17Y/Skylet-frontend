import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyKeyword: 'space-between',
        gap: '0.75rem',
        padding: '1rem 1.25rem',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        border: '1px solid rgba(239, 68, 68, 0.3)',
        borderRadius: 'var(--radius-md)',
        color: '#fca5a5',
        marginBottom: '1.25rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
        <AlertCircle size={20} style={{ flexShrink: 0, color: 'var(--status-danger)' }} />
        <span style={{ fontSize: '0.925rem', fontWeight: 500 }}>{message}</span>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-sm btn-outline" style={{ borderColor: 'rgba(239, 68, 68, 0.5)', color: '#fca5a5' }}>
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
