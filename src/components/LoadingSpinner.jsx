import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(245, 158, 11, 0.2)',
          borderTop: '4px solid var(--primary)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 500 }}>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
