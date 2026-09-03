import React, { useState, useEffect } from 'react';
import { catalogService } from '../api/services';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { FileText, Download, ExternalLink, ShieldCheck, Zap } from 'lucide-react';

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

  if (loading) return <LoadingSpinner message="Retrieving latest technical PDF catalog..." />;

  return (
    <div style={{ maxWidth: '950px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', padding: '0.75rem', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-md)', color: 'var(--primary)', marginBottom: '0.75rem' }}>
          <FileText size={36} />
        </div>
        <h1 style={{ fontSize: '2.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Technical Product Catalog</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
          Explore complete technical specifications, dimensional wiring diagrams, and product datasheets for all industrial electrical components.
        </p>
      </div>

      <ErrorMessage message={error} />

      {catalog && (
        <div className="card" style={{ backgroundColor: 'var(--bg-card)', padding: '2.5rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
            <div>
              <span className="badge badge-ready" style={{ marginBottom: '0.5rem' }}>
                <Zap size={13} /> Official Release {catalog.version || '2026.1'}
              </span>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--text-main)', margin: '0.2rem 0' }}>{catalog.title}</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
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
                Open PDF Reader <ExternalLink size={18} />
              </a>
              <a
                href={catalog.pdf_url}
                download
                className="btn btn-primary"
              >
                Download PDF <Download size={18} />
              </a>
            </div>
          </div>

          {/* Embedded PDF Viewer */}
          <div style={{ width: '100%', height: '550px', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border-color)', backgroundColor: '#090d16' }}>
            <iframe
              src={catalog.pdf_url}
              title={catalog.title}
              width="100%"
              height="100%"
              style={{ border: 'none' }}
            />
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
            <ShieldCheck size={16} style={{ color: 'var(--status-completed)' }} /> Authenticated PDF technical specification generated directly from Express backend catalog API.
          </div>
        </div>
      )}

    </div>
  );
};

export default Catalog;
