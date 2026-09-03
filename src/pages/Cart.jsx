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
    return <LoadingSpinner message="Retrieving your cart items..." />;
  }

  if (cart.items.length === 0) {
    return (
      <EmptyState
        title="Your Cart is Empty"
        message="Browse our electrical categories to select products and add them to your order."
        actionText="Browse Categories"
        onAction={() => navigate('/categories')}
      />
    );
  }

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem' }}>
            <ShoppingCart size={18} /> ORDER DRAFT
          </div>
          <h1 style={{ fontSize: '2.25rem', color: 'var(--text-main)', margin: '0.25rem 0' }}>Shopping Cart</h1>
        </div>
        <button onClick={clearCart} className="btn btn-sm btn-danger">
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
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                }}
              >
                {/* Image */}
                <div style={{ width: '90px', height: '90px', borderRadius: 'var(--radius-md)', overflow: 'hidden', backgroundColor: '#060a12', flexShrink: 0 }}>
                  <img src={item.main_image} alt={item.product_name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-cyan)', textTransform: 'uppercase' }}>
                    {item.category_name}
                  </span>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: '0.2rem 0 0.4rem 0' }}>
                    {item.product_name}
                  </h4>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    Unit Price: <strong style={{ color: 'var(--primary)' }}>₹{item.price.toLocaleString('en-IN')}</strong>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                  <QuantitySelector
                    quantity={item.quantity}
                    minQuantity={item.minimum_order_quantity}
                    onChange={(newQty) => handleQuantityChange(item.cart_item_id, newQty)}
                    disabled={updatingId === item.cart_item_id}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                    Item Total: <strong>₹{item.item_total.toLocaleString('en-IN')}</strong>
                  </span>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => handleRemove(item.cart_item_id)}
                  style={{ background: 'none', border: 'none', color: 'var(--status-danger)', cursor: 'pointer', padding: '0.5rem' }}
                  title="Remove item"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/categories" className="btn btn-secondary btn-sm">
              <ArrowLeft size={16} /> Add More Products
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="card" style={{ padding: '1.75rem', backgroundColor: 'var(--bg-card)' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
            Cart Summary
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Total Line Products:</span>
              <strong style={{ color: 'var(--text-main)' }}>{cart.items.length}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Total Units Count:</span>
              <strong style={{ color: 'var(--text-main)' }}>{cart.total_items} pcs</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Subtotal:</span>
              <span style={{ color: 'var(--text-main)' }}>₹{cart.subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <span>Estimated Transport:</span>
              <span style={{ color: 'var(--accent-cyan)', fontStyle: 'italic' }}>As Per Choice</span>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800 }}>
              <span style={{ color: 'var(--text-main)' }}>Final Total:</span>
              <span style={{ color: 'var(--primary)' }}>₹{cart.final_total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Proceed to Checkout <ArrowRight size={20} />
          </button>

          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
            <ShieldCheck size={16} /> Transport details will be requested in the next step.
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;
