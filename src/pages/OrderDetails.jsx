import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ordersService } from '../api/services';
import OrderStatusTimeline from '../components/OrderStatusTimeline';
import DepartmentStatusCard from '../components/DepartmentStatusCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { ArrowLeft, User, Truck, Calendar, Package, FileText, Upload } from 'lucide-react';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [proofFile, setProofFile] = useState(null);
  const [uploadingProof, setUploadingProof] = useState(false);
  const [proofMsg, setProofMsg] = useState('');

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  const fetchOrderDetails = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await ordersService.getOrderById(id);
      if (res.success && res.order) {
        setOrder(res.order);
      }
    } catch (err) {
      setError(err.message || 'Unable to retrieve order details.');
    } finally {
      setLoading(false);
    }
  };

  const handleProofUpload = async (e) => {
    e.preventDefault();
    if (!proofFile) return;

    try {
      setUploadingProof(true);
      setProofMsg('');
      const formData = new FormData();
      formData.append('payment_proof', proofFile);

      const res = await ordersService.uploadPaymentProof(id, formData);
      if (res.success) {
        setProofMsg('Payment proof uploaded successfully.');
        fetchOrderDetails();
      }
    } catch (err) {
      setError(err.message || 'Failed to upload payment proof.');
    } finally {
      setUploadingProof(false);
    }
  };

  if (loading) return <LoadingSpinner message="Retrieving SkyLET order details..." />;
  if (error && !order) return <ErrorMessage message={error} />;
  if (!order) return <ErrorMessage message="Order not found." />;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <Link to="/past-orders" className="btn btn-outline btn-sm" style={{ marginBottom: '1.5rem', width: 'fit-content' }}>
        <ArrowLeft size={16} /> Back to Past Orders
      </Link>

      <ErrorMessage message={error} />

      {/* Header Info Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          padding: '1.75rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-color)',
          marginBottom: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div>
          <span style={{ fontSize: '0.775rem', color: 'var(--primary-blue)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            ORDER SERIAL NUMBER
          </span>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--text-primary)', margin: '0.2rem 0', fontWeight: 800 }}>
            {order.serial_number}
          </h1>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={16} style={{ color: 'var(--primary-blue)' }} /> Order Date: {new Date(order.created_at).toLocaleString('en-IN')}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.775rem', color: 'var(--text-muted)', textTransform: 'uppercase', display: 'block', fontWeight: 600 }}>Total Order Value</span>
          <span style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--primary-blue)', fontFamily: 'var(--font-heading)' }}>
            ₹{order.total_amount.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* 1. Order Lifecycle Progress Timeline */}
      <OrderStatusTimeline currentStatus={order.status} />

      {/* 2. Department Breakdown */}
      <DepartmentStatusCard departmentStatuses={order.department_statuses} />

      {/* Customer & Logistics Grid */}
      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Customer Info Card */}
        <div className="card" style={{ backgroundColor: '#FFFFFF' }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <User size={18} style={{ color: 'var(--primary-blue)' }} /> Customer Account Information
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
            <div><span style={{ color: 'var(--text-muted)' }}>Name:</span> <strong style={{ color: 'var(--text-primary)' }}>{order.customer.name}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Email:</span> <strong style={{ color: 'var(--text-primary)' }}>{order.customer.email}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>WhatsApp:</span> <strong style={{ color: 'var(--text-primary)' }}>{order.customer.whatsapp}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>State:</span> <strong style={{ color: 'var(--text-primary)' }}>{order.customer.state}</strong></div>
          </div>
        </div>

        {/* Transport & Payment Card */}
        <div className="card" style={{ backgroundColor: '#FFFFFF' }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <Truck size={18} style={{ color: 'var(--primary-blue)' }} /> Transport & Payment Info
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.9rem' }}>
            <div><span style={{ color: 'var(--text-muted)' }}>Transport Agency:</span> <strong style={{ color: 'var(--primary-blue)' }}>{order.transport_name}</strong></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Current Status:</span> <span className="badge badge-blue">{order.status}</span></div>
            <div><span style={{ color: 'var(--text-muted)' }}>Payment Proof:</span> <strong style={{ color: order.payment_proof ? 'var(--success)' : 'var(--warning)' }}>{order.payment_status}</strong></div>

            {order.payment_proof ? (
              <div style={{ marginTop: '0.5rem' }}>
                <a href={`http://localhost:5000${order.payment_proof}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                  <FileText size={15} /> View Uploaded Proof
                </a>
              </div>
            ) : (
              <form onSubmit={handleProofUpload} style={{ marginTop: '0.75rem' }}>
                <label className="form-label" style={{ fontSize: '0.8rem' }}>Upload Payment Proof</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setProofFile(e.target.files[0])}
                    className="form-input"
                    style={{ padding: '0.4rem', fontSize: '0.85rem' }}
                  />
                  <button type="submit" className="btn btn-sm btn-primary" disabled={uploadingProof || !proofFile}>
                    <Upload size={14} /> Upload
                  </button>
                </div>
                {proofMsg && <span style={{ color: 'var(--success)', fontSize: '0.8rem', marginTop: '0.35rem', display: 'block' }}>{proofMsg}</span>}
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Ordered Products Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '2rem', backgroundColor: '#FFFFFF' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-surface)' }}>
          <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
            <Package size={18} style={{ color: 'var(--primary-blue)' }} /> Order Products
          </h4>
        </div>

        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th style={{ textAlign: 'right' }}>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.product_name}</td>
                  <td>
                    <span className="badge badge-moq" style={{ fontSize: '0.7rem' }}>{item.category_name}</span>
                  </td>
                  <td>{item.quantity} pcs</td>
                  <td>₹{item.unit_price.toLocaleString('en-IN')}</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: 'var(--primary-blue)' }}>
                    ₹{item.total_price.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
