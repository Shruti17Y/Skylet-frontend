import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Layers,
  Users,
  Building2,
  Bell,
  FileText,
  Tag,
  CreditCard,
  History,
  LogOut,
  Zap,
  ChevronRight,
  PlusCircle,
  UserCheck,
} from 'lucide-react';

const AdminSidebar = ({ collapsed, mobileOpen, closeMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'All Orders', path: '/admin/orders', icon: ShoppingCart },
    { label: 'Products', path: '/admin/products', icon: Package },
    { label: 'Add Product', path: '/admin/products/new', icon: PlusCircle },
    { label: 'Categories', path: '/admin/categories', icon: Layers },
    { label: 'Customers', path: '/admin/users', icon: Users },
    { label: 'Department Accounts', path: '/admin/department-accounts', icon: UserCheck },
    { label: 'Department Live Status', path: '/admin/departments', icon: Building2 },
    { label: 'Notifications', path: '/admin/notifications', icon: Bell },
    { label: 'Catalog Manager', path: '/admin/catalog', icon: FileText },
    { label: 'Offers & Discounts', path: '/admin/offers', icon: Tag },
    { label: 'Payment Settings', path: '/admin/payment-settings', icon: CreditCard },
    { label: 'Audit Logs', path: '/admin/audit-logs', icon: History },
  ];

  return (
    <aside className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      {/* Brand Header */}
      <div style={{ height: '64px', padding: '0 1.25rem', display: 'flex', alignItems: 'center', gap: '0.65rem', borderBottom: '1px solid #1e293b' }}>
        <div style={{ backgroundColor: 'var(--admin-primary-hover)', color: '#fff', padding: '0.45rem', borderRadius: '6px', display: 'flex' }}>
          <Zap size={20} style={{ fill: '#fff' }} />
        </div>
        {!collapsed && (
          <div>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', display: 'block', lineHeight: 1 }}>
              Skylet ERP
            </span>
            <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Control Center
            </span>
          </div>
        )}
      </div>

      {/* Nav List */}
      <div style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
        {navItems.map((item) => {
          const IconComponent = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={closeMobile}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                borderRadius: '6px',
                color: active ? '#fff' : '#94a3b8',
                backgroundColor: active ? 'var(--admin-primary)' : 'transparent',
                fontWeight: active ? 700 : 500,
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              title={collapsed ? item.label : undefined}
            >
              <IconComponent size={18} style={{ flexShrink: 0, color: active ? '#fff' : '#94a3b8' }} />
              {!collapsed && <span>{item.label}</span>}
              {!collapsed && active && <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.6 }} />}
            </Link>
          );
        })}
      </div>

      {/* Logout Footer */}
      <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid #1e293b' }}>
        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.65rem 0.85rem',
            borderRadius: '6px',
            backgroundColor: 'rgba(220, 38, 38, 0.15)',
            color: '#ef4444',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            fontWeight: 600,
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          <LogOut size={18} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Admin Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
