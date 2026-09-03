import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ordersService } from '../api/services';
import OrderStatusTimeline from '../components/OrderStatusTimeline';
import DepartmentStatusCard from '../components/DepartmentStatusCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { ArrowLeft, User, Truck, Calendar, Package, FileText, Upload, CheckCircle2, ShieldCheck } from 'lucide-react';

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

  if (loading) return <LoadingSpinner message="Retrieving order details & department tracking..." />;
  if (error && !order) return <ErrorMessage message={error} />;
  if (!order) return <ErrorMessage message="Order not found." />;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      
      <Link to="/past-orders" className="btn btn-secondary btn-sm" style={{ marginBottom: '1.5rem', width: 'fit-content' }}>
        <ArrowLeft size={16} /> Back to Past Orders
      </Link>

      <ErrorMessage message={error} />

      {/* Header Info */}
      <div style={{ backgroundColor: 'var(--bg-card)', padding: '1.75rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            SERIAL NUMBER
          </span>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-main)', margin: '0.2rem 0' }}>
            {order.serial_number}
          </h1>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calendar size={16} /> Order Date: {new Date(order.created_at).toLocaleString('en-IN')}
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', display: 'block' }}>Total Order Value</span>
          <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
            ₹{order.total_amount.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* 1. Order Status Progress Timeline */}
      <OrderStatusTimeline currentStatus={order.status} />

      {/* 2. Department-Wise Order Status Breakdown */}
      <DepartmentStatusCard departmentStatuses={order.department_statuses} />

      {/* Customer & Order Metadata Grid */}
      <div className="grid-2" style={{ gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Customer Information */}
        <div className="card" style={{ backgroundColor: 'var(--bg-card)' }}>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <User size={18} style={{ color: 'var(--primary)' }} /> Customer Account Information
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.95rem' }}>
            <div><span style={{ color: 'var(--text-dim)' }}>Name:</span> <strong>{order.customer.name}</strong></div>
            <div><span style={{ color: 'var(--text-dim)' }}>Email:</span> <strong>{order.customer.email}</strong></div>
            <div><span style={{ color: 'var(--text-dim)' }}>WhatsApp:</span> <strong>{order.customer.whatsapp}</strong></div>
            <div><span style={{ color: 'var(--text-dim)' }}>State:</span> <strong>{order.customer.state}</strong></div>
          </div>
        </div>

        {/* Order Logistics & Payment Information */}
        <div className="card" style={{ backgroundColor: 'var(--bg-card)' }}>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Truck size={18} style={{ color: 'var(--accent-cyan)' }} /> Logistics & Payment Status
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.95rem' }}>
            <div><span style={{ color: 'var(--text-dim)' }}>Transport Name:</span> <strong style={{ color: 'var(--accent-cyan)' }}>{order.transport_name}</strong></div>
            <div><span style={{ color: 'var(--text-dim)' }}>Order Status:</span> <span className="badge badge-pending">{order.status}</span></div>
            <div><span style={{ color: 'var(--text-dim)' }}>Payment Proof Status:</span> <strong style={{ color: order.payment_proof ? 'var(--status-completed)' : 'var(--status-pending)' }}>{order.payment_status}</strong></div>
            
            {order.payment_proof ? (
              <div style={{ marginTop: '0.5rem' }}>
                <a href={`http://localhost:5000${order.payment_proof}`} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-outline">
                  <FileText size={15} /> View Uploaded Payment Proof
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
                {proofMsg && <span style={{ color: 'var(--status-completed)', fontSize: '0.8rem', marginTop: '0.35rem', display: 'block' }}>{proofMsg}</span>}
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Ordered Products Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '2rem' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', backgroundColor: '#0f172a' }}>
          <h4 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Package size={18} style={{ color: 'var(--primary)' }} /> Order Line Items & Frozen Prices
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
                  <td style={{ fontWeight: 700, color: 'var(--text-main)' }}>{item.product_name}</td>
                  <td>
                    <span className="badge badge-moq" style={{ fontSize: '0.7rem' }}>{item.category_name}</span>
                  </td>
                  <td>{item.quantity} pcs</td>
                  <td>₹{item.unit_price.toLocaleString('en-IN')}</td>
                  <td style={{ textAlign: 'right', fontWeight: 800, color: 'var(--primary)' }}>
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
