import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { ShoppingCart, Search, Filter, Eye, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, [statusFilter, paymentFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      if (paymentFilter !== 'All') params.payment_status = paymentFilter;
      if (searchTerm.trim()) params.search = searchTerm.trim();

      const res = await adminService.getOrders(params);
      if (res.success) {
        setOrders(res.orders || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch customer orders.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchOrders();
  };

  const getStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('completed')) return <span className="admin-badge admin-badge-success">{status}</span>;
    if (s.includes('approved')) return <span className="admin-badge admin-badge-approved">{status}</span>;
    if (s.includes('process')) return <span className="admin-badge admin-badge-process">{status}</span>;
    if (s.includes('packing') || s.includes('ready')) return <span className="admin-badge admin-badge-ready">{status}</span>;
    if (s.includes('reject')) return <span className="admin-badge admin-badge-danger">{status}</span>;
    return <span className="admin-badge admin-badge-pending">{status}</span>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>
          Customer Order Management
        </h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Review pending customer orders, edit unit prices, approve for department distribution, or reject.
        </p>
      </div>

      {/* Filter Bar */}
      <div style={{ backgroundColor: 'var(--admin-bg-surface)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1.25rem' }}>
        <form onSubmit={handleSearchSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'end' }}>
          
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>Search SR / Customer / Transport</label>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text"
                placeholder="SR1001 or Customer name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.75rem 0.5rem 2.25rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>Order Status Filter</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
            >
              <option value="All">All Statuses</option>
              <option value="Pending Admin Approval">Pending Admin Approval</option>
              <option value="Department Processing">Department Processing</option>
              <option value="Ready for Packing">Ready for Packing</option>
              <option value="Ready for Dispatch">Ready for Dispatch</option>
              <option value="Ready for Billing">Ready for Billing</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>Payment Proof Filter</label>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.875rem' }}
            >
              <option value="All">All Payment Proof Statuses</option>
              <option value="Proof Uploaded">Proof Uploaded</option>
              <option value="Pending Payment Proof">Pending Payment Proof</option>
              <option value="Verified">Verified</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button type="submit" style={{ padding: '0.55rem 1.25rem', backgroundColor: 'var(--admin-primary)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', height: '38px' }}>
            Filter Orders
          </button>
        </form>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <LoadingSpinner message="Fetching customer orders list..." />
      ) : (
        <div className="erp-table-card">
          <div style={{ overflowX: 'auto' }}>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>SR No / Order ID</th>
                  <th>Customer Name</th>
                  <th>Order Date</th>
                  <th>Transport Name</th>
                  <th>Total Amount</th>
                  <th>Payment Proof</th>
                  <th>Order Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((ord) => (
                  <tr key={ord.id}>
                    <td style={{ fontWeight: 800, color: 'var(--admin-primary)', fontFamily: 'Poppins, sans-serif' }}>
                      {ord.serial_number || `SR${1000 + ord.id}`}
                    </td>
                    <td style={{ fontWeight: 600 }}>{ord.customer_name}</td>
                    <td style={{ color: '#64748b' }}>{new Date(ord.created_at).toLocaleDateString('en-IN')}</td>
                    <td style={{ color: '#0284c7', fontWeight: 600 }}>{ord.transport_name}</td>
                    <td style={{ fontWeight: 800 }}>₹{parseFloat(ord.total_amount).toLocaleString('en-IN')}</td>
                    <td>
                      <span className={`admin-badge ${ord.payment_status === 'Proof Uploaded' ? 'admin-badge-success' : 'admin-badge-pending'}`}>
                        {ord.payment_status || 'Pending Proof'}
                      </span>
                    </td>
                    <td>{getStatusBadge(ord.status)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <Link to={`/admin/orders/${ord.id}`} style={{ padding: '0.4rem 0.85rem', fontSize: '0.85rem', backgroundColor: 'var(--admin-primary)', color: '#fff', borderRadius: '4px', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                        <Eye size={14} /> Review & Manage
                      </Link>
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

export default AdminOrders;
