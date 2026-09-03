import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminService } from '../adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import {
  ShoppingCart,
  Clock,
  PackageCheck,
  Truck,
  FileCheck,
  CheckCircle2,
  Users,
  Package,
  ArrowRight,
  Eye,
  Building2,
} from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError('');
      const [statsRes, ordersRes, deptsRes] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getOrders({ limit: 5 }),
        adminService.getLiveDepartmentsStatus(),
      ]);

      if (statsRes.success) setStats(statsRes.stats);
      if (ordersRes.success) setRecentOrders(ordersRes.orders.slice(0, 5));
      if (deptsRes.success) setDepartments(deptsRes.departments);
    } catch (err) {
      setError(err.message || 'Failed to load ERP dashboard stats.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading Admin ERP Control Center..." />;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>
          ERP Dashboard Overview
        </h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Central control metrics, pending order approvals, and production pipeline status.
        </p>
      </div>

      <ErrorMessage message={error} />

      {/* Summary KPI Cards */}
      {stats && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          
          <div className="stat-card">
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase' }}>Total Orders</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)' }}>{stats.total_orders}</div>
            </div>
            <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#eff6ff', color: '#1d4ed8' }}>
              <ShoppingCart size={24} />
            </div>
          </div>

          <div className="stat-card" style={{ borderLeft: '4px solid #d97706' }}>
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase' }}>Pending Approval</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#b45309' }}>{stats.pending_approval}</div>
            </div>
            <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#fef3c7', color: '#b45309' }}>
              <Clock size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase' }}>In Process</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)' }}>{stats.in_process}</div>
            </div>
            <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#f3e8ff', color: '#6b21a8' }}>
              <Package size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase' }}>Ready Packing</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)' }}>{stats.ready_packing}</div>
            </div>
            <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#e0f2fe', color: '#0369a1' }}>
              <PackageCheck size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase' }}>Ready Dispatch</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)' }}>{stats.ready_dispatch}</div>
            </div>
            <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#e0e7ff', color: '#4338ca' }}>
              <Truck size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase' }}>Ready Billing</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)' }}>{stats.ready_billing}</div>
            </div>
            <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#fae8ff', color: '#a21caf' }}>
              <FileCheck size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase' }}>Completed</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#15803d' }}>{stats.completed}</div>
            </div>
            <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#dcfce7', color: '#15803d' }}>
              <CheckCircle2 size={24} />
            </div>
          </div>

          <div className="stat-card">
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--admin-text-muted)', textTransform: 'uppercase' }}>Active Customers</span>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)' }}>{stats.total_users}</div>
            </div>
            <div style={{ padding: '0.75rem', borderRadius: '8px', backgroundColor: '#f1f5f9', color: '#334155' }}>
              <Users size={24} />
            </div>
          </div>

        </div>
      )}

      {/* Main Grid: Recent Orders + Live Department Status */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.75rem' }}>
        
        {/* Recent Orders Table */}
        <div className="erp-table-card">
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--admin-text-main)', margin: 0, fontWeight: 700 }}>
              Recent Orders Queue
            </h3>
            <Link to="/admin/orders" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-accent-blue)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              View All Orders <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>SR / Order</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((ord) => (
                  <tr key={ord.id}>
                    <td style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>
                      {ord.serial_number || `#${ord.id}`}
                    </td>
                    <td>{ord.customer_name}</td>
                    <td style={{ fontWeight: 700 }}>₹{parseFloat(ord.total_amount).toLocaleString('en-IN')}</td>
                    <td>
                      <span className="admin-badge admin-badge-pending" style={{ fontSize: '0.7rem' }}>
                        {ord.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <Link to={`/admin/orders/${ord.id}`} style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', backgroundColor: '#f1f5f9', borderRadius: '4px', textDecoration: 'none', color: '#1e293b', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Eye size={13} /> View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Department Overview Table */}
        <div className="erp-table-card">
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--admin-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--admin-text-main)', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={18} style={{ color: 'var(--admin-primary)' }} /> Live Department Progress
            </h3>
            <Link to="/admin/departments" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--admin-accent-blue)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              Details <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Active Work Items</th>
                  <th>Ready for Packing</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept.id}>
                    <td style={{ fontWeight: 700 }}>{dept.department_name}</td>
                    <td>
                      <span className="admin-badge admin-badge-process">{dept.active_orders_count} Items</span>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-ready">{dept.ready_count} Ready</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
