import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { Zap, ShoppingCart, Bell, LogOut, Menu, X, User, Package, FileText, Grid } from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();
  const { unreadCount } = useNotifications();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header style={{ backgroundColor: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', position: 'sticky', top: 0, zIndex: 100 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0.85rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand / Logo */}
        <Link to={isAuthenticated ? '/home' : '/'} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', textDecoration: 'none' }}>
          <div style={{ backgroundColor: 'var(--primary)', color: '#0f172a', padding: '0.45rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={22} style={{ fill: '#0f172a' }} />
          </div>
          <div>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.03em', display: 'block', lineHeight: 1 }}>
              VoltCraft
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Electrical Systems
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        {isAuthenticated && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="desktop-nav">
            <Link to="/home" style={{ color: isActive('/home') ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600, fontSize: '0.925rem' }}>
              Home
            </Link>

            <Link to="/categories" style={{ color: isActive('/categories') ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600, fontSize: '0.925rem' }}>
              Categories
            </Link>

            <Link to="/catalog" style={{ color: isActive('/catalog') ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600, fontSize: '0.925rem' }}>
              Catalog
            </Link>

            {/* Notifications Icon with Badge */}
            <Link to="/notifications" style={{ position: 'relative', color: isActive('/notifications') ? 'var(--primary)' : 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
              <Bell size={20} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-8px',
                    backgroundColor: 'var(--primary)',
                    color: '#0f172a',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    borderRadius: '50%',
                    minWidth: '17px',
                    height: '17px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                  }}
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with Count Badge */}
            <Link to="/cart" style={{ position: 'relative', color: isActive('/cart') ? 'var(--primary)' : 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-10px',
                    backgroundColor: 'var(--accent-cyan)',
                    color: '#0f172a',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    borderRadius: '10px',
                    minWidth: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 4px',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/past-orders" style={{ color: isActive('/past-orders') ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600, fontSize: '0.925rem' }}>
              Past Orders
            </Link>

            <Link to="/profile" style={{ color: isActive('/profile') ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600, fontSize: '0.925rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <User size={18} />
              <span>{user?.full_name?.split(' ')[0] || 'Profile'}</span>
            </Link>

            <button onClick={handleLogout} className="btn btn-sm btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <LogOut size={16} />
              Logout
            </button>
          </nav>
        )}

        {!isAuthenticated && (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Link to="/login" className="btn btn-sm btn-secondary">Login</Link>
            <Link to="/signup" className="btn btn-sm btn-primary">Sign Up</Link>
          </div>
        )}

        {/* Mobile Toggle Button */}
        {isAuthenticated && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer', padding: '0.4rem' }}
            className="mobile-toggle"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      {isAuthenticated && mobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderTop: '1px solid var(--border-color)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
          className="mobile-drawer"
        >
          <Link to="/home" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Zap size={18} style={{ color: 'var(--primary)' }} /> Home
          </Link>

          <Link to="/categories" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Grid size={18} style={{ color: 'var(--primary)' }} /> Categories
          </Link>

          <Link to="/catalog" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileText size={18} style={{ color: 'var(--primary)' }} /> Catalog
          </Link>

          <Link to="/notifications" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Bell size={18} style={{ color: 'var(--primary)' }} /> Notifications ({unreadCount})
          </Link>

          <Link to="/cart" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <ShoppingCart size={18} style={{ color: 'var(--accent-cyan)' }} /> Cart ({cartCount})
          </Link>

          <Link to="/past-orders" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Package size={18} style={{ color: 'var(--primary)' }} /> Past Orders
          </Link>

          <Link to="/profile" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <User size={18} style={{ color: 'var(--primary)' }} /> Profile ({user?.full_name})
          </Link>

          <button onClick={handleLogout} className="btn btn-danger" style={{ marginTop: '0.5rem', width: '100%' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 868px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 869px) {
          .mobile-toggle { display: none !important; }
          .mobile-drawer { display: none !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
