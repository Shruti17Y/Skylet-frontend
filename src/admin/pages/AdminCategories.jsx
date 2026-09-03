import React, { useState, useEffect } from 'react';
import { adminService } from '../adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Layers, CheckCircle2 } from 'lucide-react';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminService.getCategories();
      if (res.success) {
        setCategories(res.categories || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch categories.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>
          Product Categories Management
        </h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Manage product categories used across the customer storefront and ERP order distribution.
        </p>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <LoadingSpinner message="Fetching categories..." />
      ) : (
        <div className="erp-table-card">
          <div style={{ overflowX: 'auto' }}>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Slug Identifier</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((cat) => (
                  <tr key={cat.id}>
                    <td style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>{cat.name}</td>
                    <td style={{ color: '#64748b', fontFamily: 'monospace' }}>{cat.slug}</td>
                    <td>{cat.description || 'N/A'}</td>
                    <td>
                      <span className="admin-badge admin-badge-success">
                        <CheckCircle2 size={12} /> Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
