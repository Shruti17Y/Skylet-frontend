import React from 'react';
import { CheckCircle, Clock, AlertTriangle, Layers } from 'lucide-react';

const DepartmentStatusCard = ({ departmentStatuses = [] }) => {
  const getBadge = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('ready') || s.includes('completed')) {
      return (
        <span className="badge badge-completed" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
          <CheckCircle size={14} /> Ready for Packing
        </span>
      );
    }
    if (s.includes('process') || s.includes('working')) {
      return (
        <span className="badge badge-process" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
          <Clock size={14} /> In Process
        </span>
      );
    }
    return (
      <span className="badge badge-pending" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
        <AlertTriangle size={14} /> Pending
      </span>
    );
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <Layers size={20} style={{ color: 'var(--primary)' }} />
        <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Department-Wise Production Progress
        </h4>
      </div>

      {departmentStatuses.length === 0 ? (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
          Department breakdown status pending initial admin review.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {departmentStatuses.map((dept, index) => (
            <div
              key={index}
              style={{
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {dept.department_name}
              </span>
              <div>{getBadge(dept.status)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DepartmentStatusCard;
