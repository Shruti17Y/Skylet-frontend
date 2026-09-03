import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ordersService } from '../api/services';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { Package, Search, Filter, Eye } from 'lucide-react';

const PastOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const params = {};
      if (statusFilter !== 'All') params.status = statusFilter;
      if (searchTerm.trim()) params.search = searchTerm.trim();

      const res = await ordersService.getMyOrders(params);
      if (res.success) {
        setOrders(res.orders || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to retrieve past orders.');
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
    if (s.includes('completed')) return <span className="badge badge-completed">{status}</span>;
    if (s.includes('approved')) return <span className="badge badge-blue">{status}</span>;
    if (s.includes('process')) return <span className="badge badge-process">{status}</span>;
    if (s.includes('packing') || s.includes('ready')) return <span className="badge badge-blue">{status}</span>;
    if (s.includes('cancel') || s.includes('reject')) return <span className="badge badge-red">{status}</span>;
    return <span className="badge badge-pending">{status}</span>;
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-blue)', fontWeight: 600, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Package size={16} /> ORDER HISTORY
        </div>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', margin: '0.25rem 0', fontWeight: 800 }}>Past Orders</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>View and track status of all your electrical component purchase orders.</p>
      </div>

      {/* Filter and Search Bar */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.25rem', backgroundColor: '#FFFFFF' }}>
        <form onSubmit={handleSearchSubmit} className="grid-3" style={{ gap: '1rem', alignItems: 'end' }}>
          {/* Search Box */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Search Orders</label>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
                placeholder="SR number or Transport Agency..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Filter by Status</label>
            <div style={{ position: 'relative' }}>
              <Filter size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <select
                className="form-select"
                style={{ paddingLeft: '2.75rem' }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Order Statuses</option>
                <option value="Pending Admin Approval">Pending Admin Approval</option>
                <option value="Approved">Approved</option>
                <option value="Department Processing">Department Processing</option>
                <option value="Ready for Packing">Ready for Packing</option>
                <option value="Dispatched">Dispatched</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Search Action Button */}
          <button type="submit" className="btn btn-primary" style={{ height: '42px' }}>
            Apply Filter
          </button>
        </form>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <LoadingSpinner message="Fetching your SkyLET order history..." />
      ) : orders.length === 0 ? (
        <EmptyState
          title="No Orders Found"
          message="You haven't placed any electrical component orders matching these filters yet."
          actionText="Explore Categories"
          onAction={() => window.location.href = '/categories'}
        />
      ) : (
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>SR No</th>
                <th>Order Date</th>
                <th>Transport Agency</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>
                    <strong style={{ color: 'var(--primary-blue)', fontFamily: 'var(--font-heading)', fontSize: '1rem' }}>
                      {order.serial_number || `SR${1000 + order.id}`}
                    </strong>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>
                    {new Date(order.created_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </td>
                  <td style={{ fontWeight: 500, color: 'var(--text-primary)' }}>
                    {order.transport_name}
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    ₹{parseFloat(order.total_amount).toLocaleString('en-IN')}
                  </td>
                  <td>
                    {getStatusBadge(order.status)}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <Link to={`/orders/${order.id}`} className="btn btn-sm btn-outline">
                      <Eye size={15} /> View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PastOrders;
