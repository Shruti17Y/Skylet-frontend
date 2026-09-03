import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Package, PlusCircle, Calendar, Layers, Building2, CheckCircle2, Clock, XCircle } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminService.getProducts();
      if (res.success) {
        setProducts(res.products || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch product catalog.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status, liveDate) => {
    const isScheduled = new Date(liveDate) > new Date();
    if (isScheduled || status === 'scheduled') {
      return (
        <span className="admin-badge admin-badge-pending" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <Clock size={12} /> Scheduled ({new Date(liveDate).toLocaleDateString('en-IN')})
        </span>
      );
    }
    if (status === 'active') {
      return (
        <span className="admin-badge admin-badge-success" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
          <CheckCircle2 size={12} /> Active / Live
        </span>
      );
    }
    return (
      <span className="admin-badge admin-badge-danger" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
        <XCircle size={12} /> Inactive
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>
            Product Catalog Management
          </h1>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Manage industrial electrical components, minimum order quantities, prices, departments, and scheduled live dates.
          </p>
        </div>

        <Link to="/admin/products/new" style={{ padding: '0.65rem 1.25rem', backgroundColor: 'var(--admin-primary)', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 700, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(30,58,138,0.3)' }}>
          <PlusCircle size={18} /> Add New Product
        </Link>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <LoadingSpinner message="Fetching product catalog specifications..." />
      ) : (
        <div className="erp-table-card">
          <div style={{ overflowX: 'auto' }}>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Department</th>
                  <th>Min Order Qty (MOQ)</th>
                  <th>Unit Price</th>
                  <th>Live From Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod) => (
                  <tr key={prod.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img src={prod.main_image} alt={prod.name} style={{ width: '42px', height: '42px', borderRadius: '6px', objectFit: 'cover', backgroundColor: '#f1f5f9' }} />
                        <span style={{ fontWeight: 700, color: 'var(--admin-text-main)' }}>{prod.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-ready" style={{ fontSize: '0.7rem' }}>
                        <Layers size={11} /> {prod.category_name || 'N/A'}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: '#0284c7' }}>
                        <Building2 size={13} style={{ display: 'inline', marginRight: '3px' }} />
                        {prod.department_name || 'General'}
                      </strong>
                    </td>
                    <td><strong style={{ color: 'var(--admin-accent-amber)' }}>{prod.minimum_order_quantity} pcs</strong></td>
                    <td style={{ fontWeight: 800, color: 'var(--admin-primary)' }}>₹{parseFloat(prod.price).toLocaleString('en-IN')}</td>
                    <td style={{ color: '#64748b' }}>
                      <Calendar size={13} style={{ display: 'inline', marginRight: '3px' }} />
                      {new Date(prod.live_from_date).toLocaleDateString('en-IN')}
                    </td>
                    <td>{getStatusBadge(prod.status, prod.live_from_date)}</td>
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

export default AdminProducts;
