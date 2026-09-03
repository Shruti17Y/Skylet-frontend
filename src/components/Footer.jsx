import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, PhoneCall, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)',
        marginTop: 'auto',
        paddingTop: '3.5rem',
        paddingBottom: '2rem',
      }}
    >
      <div style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '2.5rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Col 1: Brand Info & Logo */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <img
                src="/logo.png"
                alt="SkyLET Electrical Solutions"
                style={{ height: '44px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Electrical Products & Solutions. Premier B2B manufacturer & supplier of industrial water level controllers, control panels, surge protectors, and automatic transfer switches.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary-blue)', fontSize: '0.85rem', fontWeight: 600 }}>
              <ShieldCheck size={18} /> ISO 9001:2026 Certified Quality & Performance
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
              <li>
                <Link to="/home" style={{ color: 'var(--text-secondary)' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/categories" style={{ color: 'var(--text-secondary)' }}>
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/catalog" style={{ color: 'var(--text-secondary)' }}>
                  Company Catalog
                </Link>
              </li>
              <li>
                <Link to="/past-orders" style={{ color: 'var(--text-secondary)' }}>
                  Past Orders
                </Link>
              </li>
              <li>
                <Link to="/profile" style={{ color: 'var(--text-secondary)' }}>
                  Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div>
            <h4
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Core Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <li>Water Level Controllers</li>
              <li>Distribution & Control Panels</li>
              <li>Premium Electrical Products</li>
              <li>Auto Switch Equipment</li>
            </ul>
          </div>

          {/* Col 4: Contact Support */}
          <div>
            <h4
              style={{
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              Contact Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <PhoneCall size={18} style={{ color: 'var(--primary-blue)' }} />
                <span>
                  WhatsApp: <strong style={{ color: 'var(--text-primary)' }}>9227677800</strong>
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={18} style={{ color: 'var(--primary-blue)' }} />
                <span>support@skyletelectrical.com</span>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.5rem',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.85rem',
          }}
        >
          © {new Date().getFullYear()} SkyLET Electrical Solutions. All rights reserved. B2B Order & Management Platform.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
