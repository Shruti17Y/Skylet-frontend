import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ShieldCheck, PhoneCall, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#090d16', borderTop: '1px solid var(--border-color)', marginTop: 'auto', paddingTop: '3rem', paddingBottom: '2rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          
          {/* Col 1: Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <div style={{ backgroundColor: 'var(--primary)', color: '#0f172a', padding: '0.4rem', borderRadius: 'var(--radius-md)', display: 'flex' }}>
                <Zap size={20} style={{ fill: '#0f172a' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                VoltCraft Electrical
              </span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Premier B2B manufacturer & supplier of industrial water level controllers, control panels, surge protectors, and automatic transfer switches.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600 }}>
              <ShieldCheck size={18} /> ISO 9001:2026 Certified Quality
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              <li><Link to="/home" style={{ color: 'var(--text-muted)' }}>Home</Link></li>
              <li><Link to="/categories" style={{ color: 'var(--text-muted)' }}>Product Categories</Link></li>
              <li><Link to="/catalog" style={{ color: 'var(--text-muted)' }}>Technical Catalog PDF</Link></li>
              <li><Link to="/past-orders" style={{ color: 'var(--text-muted)' }}>Past Orders</Link></li>
              <li><Link to="/profile" style={{ color: 'var(--text-muted)' }}>User Profile</Link></li>
            </ul>
          </div>

          {/* Col 3: Product Categories */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Categories
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <li>Water Level Controllers</li>
              <li>Industrial Distribution Panels</li>
              <li>Premium Energy Meters & SPDs</li>
              <li>Automatic Transfer Switches</li>
            </ul>
          </div>

          {/* Col 4: Contact & Support */}
          <div>
            <h4 style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Customer Support
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <PhoneCall size={18} style={{ color: 'var(--primary)' }} />
                <span>WhatsApp Helpline: <strong>9227677800</strong></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Mail size={18} style={{ color: 'var(--primary)' }} />
                <span>support@voltcraftelectrical.com</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
          © {new Date().getFullYear()} VoltCraft Electrical Systems. All rights reserved. Customer Portal Phase 1.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
