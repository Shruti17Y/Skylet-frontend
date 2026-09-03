import React from 'react';
import { Minus, Plus, AlertCircle } from 'lucide-react';

const QuantitySelector = ({ quantity, minQuantity = 1, onChange, step = 1, disabled = false }) => {
  const handleDecrement = () => {
    if (quantity > minQuantity) {
      onChange(quantity - step);
    }
  };

  const handleIncrement = () => {
    onChange(quantity + step);
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < minQuantity) {
      onChange(minQuantity);
    } else {
      onChange(val);
    }
  };

  const isAtMinimum = quantity <= minQuantity;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          width: 'fit-content',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {/* Decrement Button */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || isAtMinimum}
          style={{
            padding: '0.55rem 0.85rem',
            backgroundColor: isAtMinimum ? 'var(--bg-surface)' : 'transparent',
            border: 'none',
            color: isAtMinimum ? 'var(--text-muted)' : 'var(--text-primary)',
            cursor: isAtMinimum || disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.15s ease',
          }}
          title={isAtMinimum ? `Minimum order quantity is ${minQuantity}` : 'Decrease quantity'}
        >
          <Minus size={15} />
        </button>

        {/* Input Display */}
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={minQuantity}
          disabled={disabled}
          style={{
            width: '70px',
            textAlign: 'center',
            backgroundColor: 'transparent',
            border: 'none',
            borderLeft: '1px solid var(--border-color)',
            borderRight: '1px solid var(--border-color)',
            color: 'var(--primary-blue)',
            fontWeight: 700,
            fontSize: '0.95rem',
            fontFamily: 'var(--font-sans)',
            padding: '0.45rem 0',
            MozAppearance: 'textfield',
          }}
        />

        {/* Increment Button */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled}
          style={{
            padding: '0.55rem 0.85rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.15s ease',
          }}
          title="Increase quantity"
        >
          <Plus size={15} />
        </button>
      </div>

      {isAtMinimum && minQuantity > 1 && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <AlertCircle size={12} style={{ color: 'var(--primary-blue)' }} /> Minimum Order Quantity (MOQ): {minQuantity}
        </span>
      )}
    </div>
  );
};

export default QuantitySelector;
