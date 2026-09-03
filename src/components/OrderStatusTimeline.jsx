import React from 'react';
import { CheckCircle2, Clock, PackageCheck, Truck, FileCheck, CheckCheck, FileText, XCircle } from 'lucide-react';

const steps = [
  { id: 'submitted', label: 'Order Submitted', icon: FileText },
  { id: 'admin_approval', label: 'Admin Approval', icon: CheckCircle2 },
  { id: 'dept_processing', label: 'Department Processing', icon: Clock },
  { id: 'ready_packing', label: 'Ready for Packing', icon: PackageCheck },
  { id: 'dispatch', label: 'Dispatch', icon: Truck },
  { id: 'billing', label: 'Billing', icon: FileCheck },
  { id: 'completed', label: 'Completed', icon: CheckCheck },
];

const getStepIndex = (status) => {
  const s = (status || '').toLowerCase();
  if (s.includes('cancel') || s.includes('reject')) return -1;
  if (s.includes('completed')) return 6;
  if (s.includes('billing')) return 5;
  if (s.includes('dispatch')) return 4;
  if (s.includes('packing') || s.includes('ready')) return 3;
  if (s.includes('process') || s.includes('dept')) return 2;
  if (s.includes('approved') || s.includes('approval')) return 1;
  return 0; // default submitted
};

const OrderStatusTimeline = ({ currentStatus }) => {
  const activeIndex = getStepIndex(currentStatus);
  const isCancelled = activeIndex === -1;

  if (isCancelled) {
    return (
      <div
        style={{
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--brand-red)' }}>
          <XCircle size={24} />
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--brand-red)' }}>Order Cancelled / Rejected</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>This order was cancelled. Please contact customer support for further assistance.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <h4
        style={{
          fontSize: '0.85rem',
          color: 'var(--text-secondary)',
          marginBottom: '1.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontWeight: 600,
        }}
      >
        Order Lifecycle Progress
      </h4>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          position: 'relative',
          overflowX: 'auto',
          paddingBottom: '0.5rem',
          gap: '1rem',
        }}
      >
        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          const isPassed = idx <= activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <div
              key={step.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                minWidth: '100px',
                position: 'relative',
                zIndex: 2,
              }}
            >
              {/* Step Circle Icon */}
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isPassed ? 'var(--primary-blue)' : 'var(--bg-surface)',
                  color: isPassed ? '#FFFFFF' : 'var(--text-muted)',
                  border: isCurrent ? '3px solid var(--primary-blue-dark)' : isPassed ? 'none' : '1px solid var(--border-color)',
                  boxShadow: isCurrent ? '0 0 12px var(--primary-blue-glow)' : 'none',
                  transition: 'all 0.2s ease',
                  marginBottom: '0.65rem',
                }}
              >
                <IconComponent size={18} />
              </div>

              {/* Step Label */}
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: isCurrent ? 700 : isPassed ? 600 : 400,
                  color: isCurrent ? 'var(--primary-blue)' : isPassed ? 'var(--text-primary)' : 'var(--text-muted)',
                  textAlign: 'center',
                  lineHeight: 1.3,
                }}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusTimeline;
