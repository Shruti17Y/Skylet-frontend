import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoriesService, companyService } from '../api/services';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { ShieldCheck, ArrowRight, Truck, Award, Cpu, FileText } from 'lucide-react';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const catRes = await categoriesService.getCategories();
        if (catRes.success) {
          setCategories(catRes.categories || []);
        }
      } catch (err) {
        setError(err.message || 'Failed to load home page data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      {/* Corporate Hero Section */}
      <section
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-color)',
          padding: '4rem 3rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Subtle Decorative Accent Background Lines */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(18,59,206,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '30%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229,9,20,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.85rem',
                backgroundColor: 'var(--primary-blue-light)',
                color: 'var(--primary-blue)',
                borderRadius: 'var(--radius-badge)',
                fontWeight: 600,
                fontSize: '0.8rem',
                marginBottom: '1.25rem',
                letterSpacing: '0.04em',
              }}
            >
              <ShieldCheck size={16} /> OFFICIAL B2B ELECTRICAL PORTAL
            </div>

            <h1
              style={{
                fontSize: '2.75rem',
                lineHeight: 1.2,
                color: 'var(--text-primary)',
                marginBottom: '1rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
              }}
            >
              Reliable Electrical Solutions
            </h1>

            <p style={{ fontSize: '1.15rem', color: 'var(--primary-blue)', fontWeight: 600, marginBottom: '0.5rem' }}>
              Built for Performance & Quality
            </p>

            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.25rem', maxWidth: '560px' }}>
              Explore our range of industrial electrical products designed for reliable and efficient applications across water level management, control panels, premium switchgears, and auto switch systems.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/categories" className="btn btn-primary btn-lg">
                Explore Products <ArrowRight size={18} />
              </Link>
              <Link to="/catalog" className="btn btn-secondary btn-lg">
                <FileText size={18} /> Download Catalog
              </Link>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '2rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <img
              src="/logo.png"
              alt="SkyLET Electrical Equipment"
              style={{ maxHeight: '120px', maxWidth: '100%', objectFit: 'contain', marginBottom: '1.5rem' }}
            />
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-sm)',
                padding: '1rem',
                border: '1px solid var(--border-color)',
                textAlign: 'left',
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--brand-red)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Featured B2B Category
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Water Level Controllers & Control Panels
              </div>
              <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                Microprocessor-based automatic switching with phase protection & bulk pricing options.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid-3">
        <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ padding: '0.85rem', backgroundColor: 'var(--primary-blue-light)', color: 'var(--primary-blue)', borderRadius: 'var(--radius-sm)' }}>
            <Award size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem', color: 'var(--text-primary)', fontWeight: 700 }}>
              ISO 9001 Certified Quality
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
              Strict industrial quality control and testing across all switchgears and panels.
            </p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ padding: '0.85rem', backgroundColor: 'var(--bg-surface-secondary)', color: 'var(--primary-blue)', borderRadius: 'var(--radius-sm)' }}>
            <Cpu size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem', color: 'var(--text-primary)', fontWeight: 700 }}>
              Microprocessor Automation
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
              Precision digital sensors, automated transfer switching, and phase protection.
            </p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1.25rem', backgroundColor: '#FFFFFF' }}>
          <div style={{ padding: '0.85rem', backgroundColor: 'var(--brand-red-light)', color: 'var(--brand-red)', borderRadius: 'var(--radius-sm)' }}>
            <Truck size={24} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', marginBottom: '0.35rem', color: 'var(--text-primary)', fontWeight: 700 }}>
              Custom Transport Logistics
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 }}>
              Specify your preferred Transport Name at checkout for fast wholesale dispatch.
            </p>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              ELECTRICAL PRODUCT CATEGORIES
            </span>
            <h2 style={{ fontSize: '1.85rem', color: 'var(--text-primary)', fontWeight: 700 }}>Category Catalog</h2>
          </div>
          <Link to="/categories" className="btn btn-outline btn-sm">
            View All Categories <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching SkyLET product categories..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          <div className="grid-4">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
