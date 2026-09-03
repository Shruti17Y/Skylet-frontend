import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Menu, Search, ShieldCheck, User } from 'lucide-react';

const AdminNavbar = ({ onToggleSidebar, onMobileToggle }) => {
  const { user } = useAuth();

  return (
    <header className="admin-topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleSidebar}
          style={{ background: 'none', border: 'none', color: 'var(--admin-text-main)', cursor: 'pointer', padding: '0.4rem', display: 'flex' }}
          title="Toggle Sidebar"
        >
          <Menu size={22} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--admin-primary)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <ShieldCheck size={18} /> Central Admin Control Panel
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {/* Quick Search */}
        <div style={{ position: 'relative', width: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--admin-text-muted)' }} />
          <input
            type="text"
            placeholder="Search orders, products..."
            style={{
              width: '100%',
              padding: '0.45rem 0.75rem 0.45rem 2.25rem',
              borderRadius: '6px',
              border: '1px solid var(--admin-border)',
              fontSize: '0.85rem',
              backgroundColor: '#f8fafc',
              outline: 'none',
            }}
          />
        </div>

        {/* Admin User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', borderLeft: '1px solid var(--admin-border)', paddingLeft: '1.25rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--admin-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
            <User size={18} />
          </div>
          <div>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--admin-text-main)', display: 'block', lineHeight: 1.1 }}>
              {user?.full_name || 'System Admin'}
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--admin-accent-blue)', fontWeight: 600 }}>
              Master Administrator
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
