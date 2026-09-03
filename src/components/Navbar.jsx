import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { ShoppingCart, Bell, LogOut, Menu, X, User, Package, FileText, Grid, Home } from 'lucide-react';

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
    <header
      style={{
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--max-width)',
          margin: '0 auto',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Company Official Logo */}
        <Link
          to={isAuthenticated ? '/home' : '/'}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
        >
          <img
            src="/logo.png"
            alt="SkyLET Electrical Products"
            className="navbar-logo"
            style={{
              height: '44px',
              width: 'auto',
              maxHeight: '48px',
              objectFit: 'contain',
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        {isAuthenticated && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }} className="desktop-nav">
            <Link
              to="/home"
              style={{
                color: isActive('/home') ? 'var(--primary-blue)' : 'var(--text-secondary)',
                fontWeight: isActive('/home') ? 700 : 500,
                fontSize: '0.925rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.25rem',
                borderBottom: isActive('/home') ? '2px solid var(--primary-blue)' : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              Home
            </Link>

            <Link
              to="/categories"
              style={{
                color: isActive('/categories') ? 'var(--primary-blue)' : 'var(--text-secondary)',
                fontWeight: isActive('/categories') ? 700 : 500,
                fontSize: '0.925rem',
                padding: '0.4rem 0.25rem',
                borderBottom: isActive('/categories') ? '2px solid var(--primary-blue)' : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              Categories
            </Link>

            <Link
              to="/catalog"
              style={{
                color: isActive('/catalog') ? 'var(--primary-blue)' : 'var(--text-secondary)',
                fontWeight: isActive('/catalog') ? 700 : 500,
                fontSize: '0.925rem',
                padding: '0.4rem 0.25rem',
                borderBottom: isActive('/catalog') ? '2px solid var(--primary-blue)' : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              Catalog
            </Link>

            {/* Notification Bell Icon with Red Badge */}
            <Link
              to="/notifications"
              title="Notifications"
              style={{
                position: 'relative',
                color: isActive('/notifications') ? 'var(--primary-blue)' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                padding: '0.4rem 0.25rem',
              }}
            >
              <Bell size={21} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '0px',
                    right: '-6px',
                    backgroundColor: 'var(--brand-red)',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    borderRadius: '9999px',
                    minWidth: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                    boxShadow: '0 2px 4px rgba(229, 9, 20, 0.3)',
                  }}
                >
                  {unreadCount > 99 ? '99+' : unreadCount}
                </span>
              )}
            </Link>

            {/* Cart Icon with Counter Badge */}
            <Link
              to="/cart"
              title="Shopping Cart"
              style={{
                position: 'relative',
                color: isActive('/cart') ? 'var(--primary-blue)' : 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center',
                padding: '0.4rem 0.25rem',
              }}
            >
              <ShoppingCart size={21} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '0px',
                    right: '-8px',
                    backgroundColor: 'var(--primary-blue)',
                    color: '#FFFFFF',
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    borderRadius: '9999px',
                    minWidth: '17px',
                    height: '17px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 3px',
                  }}
                >
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/past-orders"
              style={{
                color: isActive('/past-orders') ? 'var(--primary-blue)' : 'var(--text-secondary)',
                fontWeight: isActive('/past-orders') ? 700 : 500,
                fontSize: '0.925rem',
                padding: '0.4rem 0.25rem',
                borderBottom: isActive('/past-orders') ? '2px solid var(--primary-blue)' : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              Orders
            </Link>

            <Link
              to="/profile"
              style={{
                color: isActive('/profile') ? 'var(--primary-blue)' : 'var(--text-secondary)',
                fontWeight: isActive('/profile') ? 700 : 500,
                fontSize: '0.925rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.4rem 0.25rem',
                borderBottom: isActive('/profile') ? '2px solid var(--primary-blue)' : '2px solid transparent',
                transition: 'all 0.15s ease',
              }}
            >
              <User size={18} />
              <span>{user?.full_name?.split(' ')[0] || 'Profile'}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="btn btn-sm btn-outline"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', marginLeft: '0.5rem' }}
            >
              <LogOut size={15} />
              Logout
            </button>
          </nav>
        )}

        {!isAuthenticated && (
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <Link to="/login" className="btn btn-sm btn-outline">
              Login
            </Link>
            <Link to="/signup" className="btn btn-sm btn-primary">
              Register Company
            </Link>
          </div>
        )}

        {/* Mobile Toggle Button */}
        {isAuthenticated && (
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '0.4rem',
            }}
            className="mobile-toggle"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        )}
      </div>

      {/* Mobile Drawer */}
      {isAuthenticated && mobileMenuOpen && (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderTop: '1px solid var(--border-color)',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-md)',
          }}
          className="mobile-drawer"
        >
          <Link
            to="/home"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isActive('/home') ? 'var(--primary-blue)' : 'var(--text-primary)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Home size={18} style={{ color: 'var(--primary-blue)' }} /> Home
          </Link>

          <Link
            to="/categories"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isActive('/categories') ? 'var(--primary-blue)' : 'var(--text-primary)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Grid size={18} style={{ color: 'var(--primary-blue)' }} /> Categories
          </Link>

          <Link
            to="/catalog"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isActive('/catalog') ? 'var(--primary-blue)' : 'var(--text-primary)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <FileText size={18} style={{ color: 'var(--primary-blue)' }} /> Catalog
          </Link>

          <Link
            to="/notifications"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isActive('/notifications') ? 'var(--primary-blue)' : 'var(--text-primary)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Bell size={18} style={{ color: 'var(--brand-red)' }} /> Notifications ({unreadCount})
          </Link>

          <Link
            to="/cart"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isActive('/cart') ? 'var(--primary-blue)' : 'var(--text-primary)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <ShoppingCart size={18} style={{ color: 'var(--primary-blue)' }} /> Cart ({cartCount})
          </Link>

          <Link
            to="/past-orders"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isActive('/past-orders') ? 'var(--primary-blue)' : 'var(--text-primary)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Package size={18} style={{ color: 'var(--primary-blue)' }} /> Past Orders
          </Link>

          <Link
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: isActive('/profile') ? 'var(--primary-blue)' : 'var(--text-primary)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <User size={18} style={{ color: 'var(--primary-blue)' }} /> Profile ({user?.full_name})
          </Link>

          <button onClick={handleLogout} className="btn btn-danger-outline" style={{ marginTop: '0.5rem', width: '100%' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 868px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
          .navbar-logo { height: 36px !important; }
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
