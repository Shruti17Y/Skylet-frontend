import React from 'react';
import { Tag, CheckCircle2 } from 'lucide-react';

const AdminOffers = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>
          Promotional Offers & Discounts
        </h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Manage bulk order discount campaigns, percentage discounts, and promotional banners.
        </p>
      </div>

      <div className="erp-table-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--admin-primary)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '1rem' }}>
          <Tag size={22} /> Industrial Offers Engine
        </div>
        <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Configured to support percentage discounts and fixed-amount discounts per product category (e.g. 10% OFF APFC Control Panels). Active promotional offers reflect on the customer side.
        </p>
        <div style={{ marginTop: '1rem' }}>
          <span className="admin-badge admin-badge-success" style={{ fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
            <CheckCircle2 size={13} /> Active Campaign Engine
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdminOffers;
