import React, { useState, useEffect } from 'react';
import { catalogService } from '../api/services';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { FileText, Download, ExternalLink, ShieldCheck } from 'lucide-react';

const Catalog = () => {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        setLoading(true);
        const res = await catalogService.getCatalog();
        if (res.success && res.catalog) {
          setCatalog(res.catalog);
        }
      } catch (err) {
        setError(err.message || 'Unable to load catalog PDF.');
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  if (loading) return <LoadingSpinner message="Retrieving SkyLET technical PDF catalog..." />;

  return (
    <div style={{ maxWidth: '950px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: 'var(--primary-blue-light)', borderRadius: '50%', color: 'var(--primary-blue)', marginBottom: '0.75rem' }}>
          <FileText size={32} />
        </div>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 800 }}>Company Product Catalog</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
          Explore complete technical specifications, dimensional wiring diagrams, and product datasheets for all SkyLET electrical products.
        </p>
      </div>

      <ErrorMessage message={error} />

      {catalog && (
        <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '2.5rem', marginBottom: '2rem', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <span className="badge badge-blue" style={{ marginBottom: '0.5rem', display: 'inline-flex' }}>
                Official Catalog Release {catalog.version || '2026.1'}
              </span>
              <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', margin: '0.2rem 0', fontWeight: 700 }}>{catalog.title}</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                Full Product Catalog & Wiring Diagrams (High Resolution PDF)
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href={catalog.pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Open Catalog <ExternalLink size={16} />
              </a>
              <a
                href={catalog.pdf_url}
                download
                className="btn btn-primary"
              >
                Download Catalog <Download size={16} />
              </a>
            </div>
          </div>

          {/* Embedded PDF Viewer */}
          <div style={{ width: '100%', height: '550px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
            <iframe
              src={catalog.pdf_url}
              title={catalog.title}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
            <ShieldCheck size={16} style={{ color: 'var(--primary-blue)' }} /> Official technical specification generated from SkyLET catalog server.
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
