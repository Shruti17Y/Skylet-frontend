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
    if (isNaN(val)) {
      onChange(minQuantity);
    } else if (val < minQuantity) {
      onChange(minQuantity);
    } else {
      onChange(val);
    }
  };

  const isAtMinimum = quantity <= minQuantity;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', width: 'fit-content' }}>
        
        {/* Decrement Button */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={disabled || isAtMinimum}
          style={{
            padding: '0.6rem 0.85rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: isAtMinimum ? 'var(--text-dim)' : 'var(--text-main)',
            cursor: isAtMinimum || disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease',
          }}
          title={isAtMinimum ? `Minimum order quantity is ${minQuantity}` : 'Decrease quantity'}
        >
          <Minus size={16} />
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
            color: 'var(--primary)',
            fontWeight: 800,
            fontSize: '1rem',
            fontFamily: 'var(--font-heading)',
            padding: '0.5rem 0',
            MozAppearance: 'textfield',
          }}
        />

        {/* Increment Button */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={disabled}
          style={{
            padding: '0.6rem 0.85rem',
            backgroundColor: 'transparent',
            border: 'none',
            color: 'var(--text-main)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease',
          }}
          title="Increase quantity"
        >
          <Plus size={16} />
        </button>
      </div>

      {isAtMinimum && (
        <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <AlertCircle size={12} /> Min MOQ reached ({minQuantity})
        </span>
      )}
    </div>
  );
};

export default QuantitySelector;
