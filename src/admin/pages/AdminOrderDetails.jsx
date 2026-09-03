import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminService } from '../adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import {
  ArrowLeft,
  User,
  Truck,
  Calendar,
  Package,
  CheckCircle2,
  XCircle,
  Edit2,
  Save,
  FileText,
  Building2,
  ShieldCheck,
} from 'lucide-react';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Editing Unit Price state
  const [editingItemId, setEditingItemId] = useState(null);
  const [editPriceVal, setEditPriceVal] = useState('');

  // Rejection Modal State
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminService.getOrderById(id);
      if (res.success && res.order) {
        setOrder(res.order);
      }
    } catch (err) {
      setError(err.message || 'Unable to load order details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePrice = async (itemId) => {
    try {
      setError('');
      setSuccessMsg('');
      const res = await adminService.updateOrderItemPrice(id, itemId, editPriceVal);
      if (res.success) {
        setSuccessMsg(`Unit price updated to ₹${editPriceVal}. Order Total recalculated.`);
        setEditingItemId(null);
        fetchOrderDetails();
      }
    } catch (err) {
      setError(err.message || 'Failed to update unit price.');
    }
  };

  const handleApproveOrder = async () => {
    try {
      setActionLoading(true);
      setError('');
      setSuccessMsg('');
      const res = await adminService.approveOrder(id);
      if (res.success) {
        setSuccessMsg(res.message || 'Order approved and distributed to production departments.');
        fetchOrderDetails();
      }
    } catch (err) {
      setError(err.message || 'Failed to approve order.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectOrder = async (e) => {
    e.preventDefault();
    if (!rejectReason.trim()) {
      setError('Rejection reason is required.');
      return;
    }

    try {
      setActionLoading(true);
      setError('');
      setSuccessMsg('');
      const res = await adminService.rejectOrder(id, rejectReason);
      if (res.success) {
        setSuccessMsg('Order has been rejected. Notification sent to customer.');
        setRejectModalOpen(false);
        fetchOrderDetails();
      }
    } catch (err) {
      setError(err.message || 'Failed to reject order.');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="Retrieving order review & specs..." />;
  if (error && !order) return <ErrorMessage message={error} />;
  if (!order) return <ErrorMessage message="Order not found." />;

  const isPendingApproval = order.status === 'Pending Admin Approval';

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <Link to="/admin/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#475569', fontWeight: 600, textDecoration: 'none' }}>
        <ArrowLeft size={16} /> Back to Customer Orders
      </Link>

      <ErrorMessage message={error} />

      {successMsg && (
        <div style={{ padding: '1.25rem', backgroundColor: '#dcfce7', border: '1px solid #86efac', borderRadius: '8px', color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
          <CheckCircle2 size={20} /> {successMsg}
        </div>
      )}

      {/* Header Banner */}
      <div style={{ backgroundColor: 'var(--admin-bg-surface)', border: '1px solid var(--admin-border)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--admin-primary)', textTransform: 'uppercase' }}>
            SERIAL NUMBER / ORDER ID
          </span>
          <h1 style={{ fontSize: '2rem', color: 'var(--admin-text-main)', margin: '0.2rem 0', fontFamily: 'Poppins, sans-serif' }}>
            {order.serial_number || `Temporary ID: #${order.id}`}
          </h1>
          <div style={{ color: '#64748b', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={15} /> Order Date: {new Date(order.created_at).toLocaleString('en-IN')}
          </div>
        </div>

        {/* Approval Actions CTA */}
        {isPendingApproval ? (
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setRejectModalOpen(true)}
              disabled={actionLoading}
              style={{ padding: '0.75rem 1.25rem', backgroundColor: '#fee2e2', color: '#b91c1c', border: '1px solid #fca5a5', borderRadius: '6px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <XCircle size={18} /> Reject Order
            </button>
            <button
              onClick={handleApproveOrder}
              disabled={actionLoading}
              style={{ padding: '0.75rem 1.5rem', backgroundColor: '#15803d', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', boxShadow: '0 4px 12px rgba(21,128,61,0.3)' }}
            >
              <CheckCircle2 size={18} /> Approve Order & Distribute
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', display: 'block' }}>Approval Status</span>
            <span className={`admin-badge ${order.status === 'Rejected' ? 'admin-badge-danger' : 'admin-badge-success'}`} style={{ fontSize: '0.9rem', padding: '0.4rem 0.85rem' }}>
              {order.status}
            </span>
          </div>
        )}
      </div>

      {/* Customer Info & Payment Specs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Customer Info */}
        <div className="erp-table-card" style={{ padding: '1.25rem' }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--admin-text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} style={{ color: 'var(--admin-primary)' }} /> Customer Information
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <div><span style={{ color: '#64748b' }}>Customer Name:</span> <strong>{order.customer_name}</strong></div>
            <div><span style={{ color: '#64748b' }}>Email Address:</span> <strong>{order.customer_email}</strong></div>
            <div><span style={{ color: '#64748b' }}>WhatsApp Number:</span> <strong>{order.customer_whatsapp || 'N/A'}</strong></div>
            <div><span style={{ color: '#64748b' }}>State / Region:</span> <strong>{order.customer_state || 'N/A'}</strong></div>
          </div>
        </div>

        {/* Transport & Payment Specs */}
        <div className="erp-table-card" style={{ padding: '1.25rem' }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--admin-text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Truck size={18} style={{ color: '#0284c7' }} /> Logistics & Payment Verification
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
            <div><span style={{ color: '#64748b' }}>Transport Name:</span> <strong style={{ color: '#0284c7' }}>{order.transport_name}</strong></div>
            <div><span style={{ color: '#64748b' }}>Total Order Value:</span> <strong style={{ fontSize: '1.1rem', color: 'var(--admin-primary)' }}>₹{order.total_amount.toLocaleString('en-IN')}</strong></div>
            <div><span style={{ color: '#64748b' }}>Payment Proof:</span> <span className="admin-badge admin-badge-success">{order.payment_status}</span></div>
            {order.payment_proof && (
              <div style={{ marginTop: '0.5rem' }}>
                <a href={`http://localhost:5000${order.payment_proof}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--admin-primary)', fontWeight: 600, fontSize: '0.85rem' }}>
                  <FileText size={15} /> View Payment Proof Document
                </a>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Admin Price Review & Items Table */}
      <div className="erp-table-card">
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--admin-border)', backgroundColor: '#f8fafc', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.05rem', color: 'var(--admin-text-main)', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Package size={18} style={{ color: 'var(--admin-primary)' }} /> Order Line Items & Admin Price Review
          </h3>
          {isPendingApproval && (
            <span style={{ fontSize: '0.8rem', color: '#b45309', fontWeight: 600 }}>
              * You may review or modify unit prices before approving order.
            </span>
          )}
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="erp-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Assigned Department</th>
                <th>Quantity</th>
                <th>Unit Price (₹)</th>
                <th>Total Price</th>
                {isPendingApproval && <th style={{ textAlign: 'right' }}>Price Review Action</th>}
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 700 }}>{item.product_name}</td>
                  <td><span className="admin-badge admin-badge-ready" style={{ fontSize: '0.7rem' }}>{item.category_name}</span></td>
                  <td><strong style={{ color: '#0284c7' }}>{item.department_name || 'General Production'}</strong></td>
                  <td>{item.quantity} pcs</td>
                  <td>
                    {editingItemId === item.id ? (
                      <input
                        type="number"
                        step="0.01"
                        value={editPriceVal}
                        onChange={(e) => setEditPriceVal(e.target.value)}
                        style={{ width: '100px', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--admin-primary)' }}
                      />
                    ) : (
                      <strong>₹{item.unit_price.toLocaleString('en-IN')}</strong>
                    )}
                  </td>
                  <td style={{ fontWeight: 800, color: 'var(--admin-primary)' }}>
                    ₹{item.total_price.toLocaleString('en-IN')}
                  </td>
                  {isPendingApproval && (
                    <td style={{ textAlign: 'right' }}>
                      {editingItemId === item.id ? (
                        <button onClick={() => handleSavePrice(item.id)} style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', backgroundColor: '#15803d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                          <Save size={13} /> Save Price
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingItemId(item.id);
                            setEditPriceVal(item.unit_price.toString());
                          }}
                          style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: '#334155' }}
                        >
                          <Edit2 size={13} /> Edit Price
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Distributed Department Items Breakdown */}
      {order.department_items && order.department_items.length > 0 && (
        <div className="erp-table-card">
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--admin-border)', backgroundColor: '#f8fafc' }}>
            <h3 style={{ fontSize: '1.05rem', color: 'var(--admin-text-main)', margin: 0, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Building2 size={18} style={{ color: 'var(--admin-primary)' }} /> Automated Department Production Work Items
            </h3>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Department</th>
                  <th>Ordered Qty</th>
                  <th>Completed Qty</th>
                  <th>Remaining Qty</th>
                  <th>Department Status</th>
                </tr>
              </thead>
              <tbody>
                {order.department_items.map((deptItem) => (
                  <tr key={deptItem.id}>
                    <td style={{ fontWeight: 700 }}>{deptItem.department_name}</td>
                    <td>{deptItem.ordered_quantity} pcs</td>
                    <td>{deptItem.completed_quantity} pcs</td>
                    <td><strong style={{ color: '#b45309' }}>{deptItem.remaining_quantity} pcs</strong></td>
                    <td>
                      <span className="admin-badge admin-badge-process">{deptItem.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {rejectModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ maxWidth: '500px', width: '100%', backgroundColor: '#fff', borderRadius: '10px', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#b91c1c', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <XCircle size={22} /> Reject Customer Order
            </h3>

            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Please provide a clear rejection reason. The customer will receive this explanation in their notification center.
            </p>

            <form onSubmit={handleRejectOrder}>
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Rejection Reason *</label>
                <textarea
                  rows="4"
                  placeholder="e.g. Requested component model is currently out of stock or payment proof unverified."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  required
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setRejectModalOpen(false)} style={{ padding: '0.6rem 1.25rem', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', color: '#334155' }}>
                  Cancel
                </button>
                <button type="submit" disabled={actionLoading} style={{ padding: '0.6rem 1.25rem', backgroundColor: '#dc2626', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>
                  Confirm Rejection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminOrderDetails;
