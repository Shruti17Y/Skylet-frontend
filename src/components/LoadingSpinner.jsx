import React from 'react';

const LoadingSpinner = ({ message = 'Loading SkyLET Portal...' }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem' }}>
      <div
        style={{
          width: '42px',
          height: '42px',
          border: '4px solid var(--primary-blue-light)',
          borderTop: '4px solid var(--primary-blue)',
          borderRadius: '50%',
          animation: 'spin 0.75s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <p style={{ marginTop: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>{message}</p>
    </div>
  );
};

export default LoadingSpinner;
