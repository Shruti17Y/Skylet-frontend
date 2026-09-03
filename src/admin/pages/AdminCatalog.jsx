import React, { useState, useEffect } from 'react';
import { adminService } from '../adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { FileText, ExternalLink, ShieldCheck } from 'lucide-react';

const AdminCatalog = () => {
  const [catalog, setCatalog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCatalog();
  }, []);

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminService.getCatalog();
      if (res.success && res.catalog) {
        setCatalog(res.catalog);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch catalog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>
          Technical PDF Catalog Manager
        </h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Manage official electrical component datasheets and PDF catalogs served to customer portal.
        </p>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <LoadingSpinner message="Fetching technical PDF catalog..." />
      ) : (
        catalog && (
          <div className="erp-table-card" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="admin-badge admin-badge-ready" style={{ marginBottom: '0.5rem' }}>
                  {catalog.version || 'v2026.1'}
                </span>
                <h3 style={{ fontSize: '1.35rem', color: 'var(--admin-text-main)', margin: '0.2rem 0' }}>{catalog.title}</h3>
              </div>

              <a href={catalog.pdf_url} target="_blank" rel="noopener noreferrer" style={{ padding: '0.65rem 1.25rem', backgroundColor: 'var(--admin-primary)', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 700, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                Open Catalog PDF <ExternalLink size={16} />
              </a>
            </div>

            <div style={{ padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid var(--admin-border)', fontSize: '0.875rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} style={{ color: 'var(--admin-primary)' }} /> Live active technical PDF served automatically to customer `/catalog` route.
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default AdminCatalog;
