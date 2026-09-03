import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const order = location.state?.order;

  return (
    <div style={{ minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div className="card" style={{ maxWidth: '580px', width: '100%', padding: '3rem 2rem', textAlign: 'center', backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-glow)' }}>
        
        {/* Success Icon */}
        <div style={{ display: 'inline-flex', padding: '1rem', borderRadius: '50%', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: 'var(--status-completed)', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={56} />
        </div>

        <h1 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
          Order Submitted Successfully
        </h1>

        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '440px', margin: '0 auto 2rem auto' }}>
          Your electrical component order has been submitted and is waiting for approval.
        </p>

        {order && (
          <div style={{ backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-md)', padding: '1.5rem', border: '1px solid var(--border-color)', marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Serial / Order Number:</span>
              <strong style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)', fontSize: '1.1rem' }}>
                {order.serial_number || `#${order.id}`}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Total Amount:</span>
              <strong style={{ color: 'var(--text-main)' }}>
                ₹{parseFloat(order.total_amount).toLocaleString('en-IN')}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.65rem' }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Transport:</span>
              <strong style={{ color: 'var(--accent-cyan)' }}>
                {order.transport_name}
              </strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>Status:</span>
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
          <button onClick={() => navigate('/home')} className="btn btn-secondary btn-lg">
            Continue Shopping <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;
