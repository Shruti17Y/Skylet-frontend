import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  return (
    <div style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div
        className="card"
        style={{
          maxWidth: '580px',
          width: '100%',
          padding: '3rem 2.5rem',
          textAlign: 'center',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Success Icon */}
        <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', backgroundColor: 'var(--success-light)', color: 'var(--success)', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={56} />
        </div>

        <h1 style={{ fontSize: '1.85rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 800 }}>
          Order Submitted Successfully
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '440px', margin: '0 auto 2rem auto' }}>
          Your electrical component order has been submitted to SkyLET and is awaiting admin review.
        </p>

        {order && (
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-sm)',
              padding: '1.25rem',
              border: '1px solid var(--border-color)',
              marginBottom: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              textAlign: 'left',
              fontSize: '0.9rem',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Order SR Number:</span>
              <strong style={{ color: 'var(--primary-blue)', fontFamily: 'var(--font-heading)', fontSize: '1.05rem' }}>
                {order.serial_number || `#${order.id}`}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Total Amount:</span>
              <strong style={{ color: 'var(--text-primary)' }}>
                ₹{parseFloat(order.total_amount).toLocaleString('en-IN')}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Transport Agency:</span>
              <strong style={{ color: 'var(--text-primary)' }}>
                {order.transport_name}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-muted)' }}>Current Status:</span>
              <span className="badge badge-pending">
                {order.status || 'Pending Admin Approval'}
              </span>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {order?.id && (
            <Link to={`/orders/${order.id}`} className="btn btn-primary btn-lg">
              <Package size={18} /> View Order
            </Link>
          )}
          <button onClick={() => navigate('/home')} className="btn btn-outline btn-lg">
            Continue Shopping <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
