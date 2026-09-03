import React, { useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';

const LightboxModal = ({ isOpen, onClose, imageUrl, title }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(23, 32, 51, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          maxWidth: '900px',
          maxHeight: '90vh',
          width: '100%',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-blue)' }}>
            <ZoomIn size={20} />
            <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0, fontWeight: 700 }}>
              {title || 'Detailed Technical Preview'}
            </h4>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Image Container */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-surface)' }}>
          <img
            src={imageUrl}
            alt={title || 'Detailed product view'}
            style={{ maxWidth: '100%', maxHeight: '70vh', objectFit: 'contain', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}
          />
        </div>

        {/* Footer */}
        <div style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#FFFFFF' }}>
          <button onClick={onClose} className="btn btn-sm btn-outline">
            Close Preview
          </button>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default LightboxModal;
