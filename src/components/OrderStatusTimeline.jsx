import React from 'react';
import { CheckCircle2, Clock, PackageCheck, Truck, FileCheck, CheckCheck, FileText } from 'lucide-react';

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
  if (s.includes('completed')) return 6;
  if (s.includes('billing')) return 5;
  if (s.includes('dispatch')) return 4;
  if (s.includes('packing') || s.includes('ready')) return 3;
  if (s.includes('process') || s.includes('dept')) return 2;
  if (s.includes('approved') || s.includes('approval')) return 1;
  return 0; // default submitted / pending approval
};

const OrderStatusTimeline = ({ currentStatus }) => {
  const activeIndex = getStepIndex(currentStatus);

  return (
    <div style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', marginBottom: '1.5rem' }}>
      <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        Order Lifecycle Progress
      </h4>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {steps.map((step, idx) => {
          const IconComponent = step.icon;
          const isPassed = idx <= activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '110px', position: 'relative', zIndex: 2 }}>
              
              {/* Step Circle Icon */}
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isPassed ? 'var(--primary)' : 'var(--bg-input)',
                  color: isPassed ? '#0f172a' : 'var(--text-dim)',
                  border: isCurrent ? '3px solid var(--accent-cyan)' : '2px solid var(--border-color)',
                  boxShadow: isCurrent ? '0 0 15px rgba(6,182,212,0.5)' : 'none',
                  transition: 'all 0.3s ease',
                  marginBottom: '0.65rem',
                }}
              >
                <IconComponent size={20} />
              </div>

              {/* Step Label */}
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: isCurrent ? 800 : isPassed ? 600 : 400,
                  color: isCurrent ? 'var(--accent-cyan)' : isPassed ? 'var(--text-main)' : 'var(--text-dim)',
                  textAlign: 'center',
                  lineHeight: 1.2,
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
