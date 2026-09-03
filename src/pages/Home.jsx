import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoriesService, companyService } from '../api/services';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Zap, ShieldCheck, ArrowRight, Truck, Award, Cpu } from 'lucide-react';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [company, setCompany] = useState({
    company_name: 'VoltCraft Electrical Systems',
    tagline: 'Reliable Electrical Products Built for Performance & Quality',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, compRes] = await Promise.all([
          categoriesService.getCategories(),
          companyService.getCompanyDetails().catch(() => ({ success: false })),
        ]);

        if (catRes.success) {
          setCategories(catRes.categories || []);
        }

        if (compRes.success && compRes.company) {
          setCompany(compRes.company);
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
      
      {/* Hero Section */}
      <section
        style={{
          backgroundColor: 'var(--bg-card)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-color)',
          padding: '4rem 2.5rem',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-glow)',
        }}
      >
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '750px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.9rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
            <Zap size={16} /> INDUSTRIAL ELECTRICAL SOLUTIONS
          </div>

          <h1 style={{ fontSize: '3rem', lineHeight: 1.15, color: 'var(--text-main)', marginBottom: '1.25rem', textTransform: 'capitalize' }}>
            {company.company_name}
          </h1>

          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '2rem' }}>
            {company.tagline}
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/categories" className="btn btn-primary btn-lg">
              Explore Products <ArrowRight size={20} />
            </Link>
            <Link to="/catalog" className="btn btn-secondary btn-lg">
              Download Technical Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="grid-3">
        <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ padding: '0.85rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary)', borderRadius: 'var(--radius-md)' }}>
            <Award size={26} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', color: 'var(--text-main)' }}>ISO Certified Standard</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Strict quality assurance and testing across all electrical switchgears and panels.</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ padding: '0.85rem', backgroundColor: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', borderRadius: 'var(--radius-md)' }}>
            <Cpu size={26} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', color: 'var(--text-main)' }}>Microprocessor Control</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Precision digital sensors, phase protection, and automated transfer switching.</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <div style={{ padding: '0.85rem', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: 'var(--accent-blue)', borderRadius: 'var(--radius-md)' }}>
            <Truck size={26} />
          </div>
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '0.35rem', color: 'var(--text-main)' }}>Flexible Logistics</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Specify your preferred Transport Name at checkout for seamless dispatch.</p>
          </div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              OUR PRODUCT LINEUP
            </span>
            <h2 style={{ fontSize: '2.1rem', color: 'var(--text-main)' }}>Browse Categories</h2>
          </div>
          <Link to="/categories" className="btn btn-outline btn-sm">
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner message="Fetching live product categories..." />
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
