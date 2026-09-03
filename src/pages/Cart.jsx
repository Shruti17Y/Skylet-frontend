import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/QuantitySelector';
import LoadingSpinner from '../components/LoadingSpinner';
import EmptyState from '../components/EmptyState';
import ErrorMessage from '../components/ErrorMessage';
import { ShoppingCart, Trash2, ArrowRight, ArrowLeft, ShieldCheck } from 'lucide-react';

const Cart = () => {
  const { cart, loading, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const handleQuantityChange = async (cartItemId, newQty) => {
    try {
      setError('');
      setUpdatingId(cartItemId);
      await updateQuantity(cartItemId, newQty);
    } catch (err) {
      setError(err.message || 'Failed to update quantity.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemove = async (cartItemId) => {
    try {
      setError('');
      await removeFromCart(cartItemId);
    } catch (err) {
      setError(err.message || 'Failed to remove item.');
    }
  };

  if (loading && cart.items.length === 0) {
    return <LoadingSpinner message="Retrieving your SkyLET cart..." />;
  }

  if (cart.items.length === 0) {
    return (
      <EmptyState
        title="Your Cart is Empty"
        message="Browse our electrical categories to select products and add them to your wholesale order."
        actionText="Browse Categories"
        onAction={() => navigate('/categories')}
      />
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-blue)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <ShoppingCart size={16} /> ORDER DRAFT
          </div>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', margin: '0.25rem 0', fontWeight: 800 }}>Shopping Cart</h1>
        </div>
        <button onClick={clearCart} className="btn btn-sm btn-danger-outline">
          Clear Entire Cart
        </button>
      </div>

      <ErrorMessage message={error} />

      <div className="grid-3" style={{ gap: '2rem', alignItems: 'start' }}>
        {/* Left 2 Columns: Items List */}
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {cart.items.map((item) => (
              <div
                key={item.cart_item_id}
                className="card"
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  gap: '1.25rem',
                  alignItems: 'center',
                  backgroundColor: '#FFFFFF',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: 'var(--shadow-sm)',
                }}
              >
                {/* Product Thumbnail */}
                <div
                  style={{
                    width: '90px',
                    height: '90px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-color)',
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <img
                    src={item.main_image || '/logo.png'}
                    alt={item.product_name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: '0.5rem' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/logo.png';
                    }}
                  />
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.725rem', fontWeight: 600, color: 'var(--primary-blue)', textTransform: 'uppercase' }}>
                    {item.category_name}
                  </span>
                  <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: '0.2rem 0 0.4rem 0', fontWeight: 600 }}>
                    {item.product_name}
                  </h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    Unit Price: <strong style={{ color: 'var(--primary-blue)' }}>₹{item.price.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <QuantitySelector
                    quantity={item.quantity}
                    minQuantity={item.minimum_order_quantity || 100}
                    onChange={(newQty) => handleQuantityChange(item.cart_item_id, newQty)}
                    disabled={updatingId === item.cart_item_id}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Item Total: <strong>₹{item.item_total.toLocaleString('en-IN')}</strong>
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => handleRemove(item.cart_item_id)}
                  style={{ background: 'none', border: 'none', color: 'var(--brand-red)', cursor: 'pointer', padding: '0.5rem' }}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/categories" className="btn btn-outline btn-sm">
              <ArrowLeft size={16} /> Add More Products
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="card" style={{ padding: '1.75rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <h3
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-primary)',
              marginBottom: '1.25rem',
              paddingBottom: '0.75rem',
              borderBottom: '1px solid var(--border-color)',
              fontWeight: 700,
            }}
          >
            Order Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Product Line Items:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{cart.items.length}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Total Units Count:</span>
              <strong style={{ color: 'var(--text-primary)' }}>{cart.total_items} pcs</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Subtotal:</span>
              <span style={{ color: 'var(--text-primary)' }}>₹{cart.subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
              <span>Transport Freight:</span>
              <span style={{ color: 'var(--primary-blue)', fontWeight: 500 }}>As Per Selected Transport</span>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border-color)',
                paddingTop: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.2rem',
                fontWeight: 700,
              }}
            >
              <span style={{ color: 'var(--text-primary)' }}>Final Total:</span>
              <span style={{ color: 'var(--primary-blue)' }}>₹{cart.final_total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Proceed to Checkout <ArrowRight size={18} />
          </button>

          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
            <ShieldCheck size={16} style={{ color: 'var(--primary-blue)' }} /> Step-based transport & payment proof in next step.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
