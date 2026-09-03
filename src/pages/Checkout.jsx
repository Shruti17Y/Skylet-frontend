import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ordersService, companyService } from '../api/services';
import ErrorMessage from '../components/ErrorMessage';
import { Truck, CreditCard, Upload, CheckCircle2, ArrowLeft, ShieldCheck, QrCode } from 'lucide-react';

const Checkout = () => {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Transport & Order Details, 2: Payment & Proof
  const [transportName, setTransportName] = useState('');
  const [paymentProofFile, setPaymentProofFile] = useState(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState('');

  const [companyDetails, setCompanyDetails] = useState({
    bank_name: 'HDFC Bank Ltd.',
    account_name: 'SkyLET Electrical Solutions Pvt Ltd',
    account_number: '50200088912345',
    ifsc_code: 'HDFC0001234',
    upi_id: 'skylet@hdfcbank',
    support_phone: '9227677800',
    qr_code_image: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=skylet@hdfcbank&pn=SkyLET%20Electrical',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      try {
        const res = await companyService.getCompanyDetails();
        if (res.success && res.company) {
          setCompanyDetails(res.company);
        }
      } catch (err) {
        console.error('Failed to fetch company details:', err);
      }
    };

    fetchCompanyInfo();
  }, []);

  if (cart.items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 1.5rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No Items in Cart for Checkout</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Please add products to your cart before proceeding.</p>
        <Link to="/categories" className="btn btn-primary">Return to Categories</Link>
      </div>
    );
  }

  const handleTransportSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!transportName.trim()) {
      setError('Transport Name is REQUIRED to continue with checkout.');
      return;
    }

    setStep(2);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentProofFile(file);
      if (file.type.startsWith('image/')) {
        setPaymentProofPreview(URL.createObjectURL(file));
      } else {
        setPaymentProofPreview('');
      }
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError('');

    if (!transportName.trim()) {
      setError('Transport Name is required.');
      setStep(1);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('transport_name', transportName.trim());
      if (paymentProofFile) {
        formData.append('payment_proof', paymentProofFile);
      }

      const res = await ordersService.createOrder(formData);

      if (res.success && res.order) {
        await fetchCart();
        navigate('/order-success', { state: { order: res.order } });
      }
    } catch (err) {
      setError(err.message || 'Failed to submit order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.25rem', fontWeight: 800 }}>Order Checkout</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Complete transport details and submit payment proof for order placement.</p>
      </div>

      {/* Checkout Steps Progress Bar */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div
          onClick={() => setStep(1)}
          style={{
            flex: 1,
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: step === 1 ? 'var(--primary-blue-light)' : '#FFFFFF',
            border: step === 1 ? '2px solid var(--primary-blue)' : '1px solid var(--border-color)',
            color: step === 1 ? 'var(--primary-blue)' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            cursor: 'pointer',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <Truck size={18} /> 1. Order Details & Transport
        </div>

        <div
          style={{
            flex: 1,
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: step === 2 ? 'var(--primary-blue-light)' : '#FFFFFF',
            border: step === 2 ? '2px solid var(--primary-blue)' : '1px solid var(--border-color)',
            color: step === 2 ? 'var(--primary-blue)' : 'var(--text-secondary)',
            fontWeight: 700,
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <CreditCard size={18} /> 2. Payment Info & Proof
        </div>
      </div>

      <ErrorMessage message={error} />

      {/* STEP 1: TRANSPORT NAME & ORDER REVIEW */}
      {step === 1 && (
        <form onSubmit={handleTransportSubmit}>
          <div className="grid-2" style={{ gap: '2rem', alignItems: 'start' }}>
            {/* Required Transport Name Input */}
            <div className="card" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                <Truck size={20} style={{ color: 'var(--primary-blue)' }} /> Transport Logistics Details
              </h3>

              <div className="form-group">
                <label className="form-label">
                  Transport Name * <span style={{ color: 'var(--brand-red)' }}>(REQUIRED)</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Speed Logistics / VRL Transport / Express Cargo"
                  value={transportName}
                  onChange={(e) => setTransportName(e.target.value)}
                  required
                  style={{ fontSize: '0.95rem', padding: '0.85rem' }}
                />
                <small style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', display: 'block' }}>
                  Please specify your preferred transport agency for order dispatch.
                </small>
              </div>
            </div>

            {/* Order Items Review Summary Table */}
            <div className="card" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1rem', fontWeight: 700 }}>
                Order Summary Review
              </h3>

              <div className="table-responsive" style={{ marginBottom: '1.25rem' }}>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Qty</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.map((item) => (
                      <tr key={item.cart_item_id}>
                        <td style={{ fontWeight: 600 }}>{item.product_name}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price.toLocaleString('en-IN')}</td>
                        <td style={{ fontWeight: 700, color: 'var(--primary-blue)' }}>
                          ₹{item.item_total.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <span>Subtotal:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>₹{cart.subtotal.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <span>Selected Transport:</span>
                  <strong style={{ color: 'var(--primary-blue)' }}>{transportName || 'Pending Input'}</strong>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 700 }}>
                  <span style={{ color: 'var(--text-primary)' }}>Total Amount:</span>
                  <span style={{ color: 'var(--primary-blue)' }}>₹{cart.final_total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <Link to="/cart" className="btn btn-outline btn-sm">
                  <ArrowLeft size={16} /> Back to Cart
                </Link>
                <button type="submit" className="btn btn-primary">
                  Continue to Payment <CreditCard size={18} />
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* STEP 2: PAYMENT INFO & PROOF UPLOAD */}
      {step === 2 && (
        <form onSubmit={handlePlaceOrder}>
          <div className="grid-2" style={{ gap: '2rem', alignItems: 'start' }}>
            {/* Bank Payment Information Card */}
            <div className="card" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                <CreditCard size={20} style={{ color: 'var(--primary-blue)' }} /> Payment Information
              </h3>

              <div
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '1.25rem',
                  border: '1px solid var(--border-color)',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontSize: '0.9rem',
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Bank Name</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{companyDetails.bank_name}</div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Account Name</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{companyDetails.account_name}</div>
                </div>

                <div className="grid-2" style={{ gap: '1rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>Account Number</span>
                    <div style={{ fontWeight: 700, color: 'var(--primary-blue)', fontFamily: 'var(--font-heading)' }}>{companyDetails.account_number}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>IFSC Code</span>
                    <div style={{ fontWeight: 700, color: 'var(--primary-blue)', fontFamily: 'var(--font-heading)' }}>{companyDetails.ifsc_code}</div>
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 600 }}>UPI ID</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{companyDetails.upi_id}</div>
                </div>
              </div>

              {/* QR Code */}
              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#FFFFFF', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', width: 'fit-content', margin: '0 auto 1.25rem auto' }}>
                <img src={companyDetails.qr_code_image} alt="Payment QR Code" style={{ width: '160px', height: '160px', objectFit: 'contain' }} />
                <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.775rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                  <QrCode size={14} style={{ color: 'var(--primary-blue)' }} /> Scan to Pay via Any UPI App
                </div>
              </div>

              <div
                style={{
                  padding: '0.85rem 1rem',
                  backgroundColor: 'var(--primary-blue-light)',
                  border: '1px solid rgba(18, 59, 206, 0.2)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--primary-blue)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                After payment, send proof to: <strong style={{ color: 'var(--text-primary)' }}>{companyDetails.support_phone || '9227677800'}</strong>
              </div>
            </div>

            {/* Payment Proof Upload & Submit Order */}
            <div className="card" style={{ backgroundColor: '#FFFFFF' }}>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
                <Upload size={20} style={{ color: 'var(--primary-blue)' }} /> Upload Payment Proof
              </h3>

              <div className="form-group">
                <label className="form-label">Upload Payment Proof (JPG, PNG, PDF)</label>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handleFileChange}
                  className="form-input"
                  style={{ padding: '0.6rem' }}
                />
              </div>

              {paymentProofPreview && (
                <div style={{ marginBottom: '1.25rem', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.5rem' }}>Proof Preview:</span>
                  <img src={paymentProofPreview} alt="Proof preview" style={{ maxHeight: '140px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }} />
                </div>
              )}

              {/* Summary Box */}
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span>Transport Agency:</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{transportName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800 }}>
                  <span style={{ color: 'var(--text-primary)' }}>Total Payable:</span>
                  <span style={{ color: 'var(--primary-blue)' }}>₹{cart.final_total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep(1)} className="btn btn-outline btn-sm">
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: 'center' }} disabled={loading}>
                  <CheckCircle2 size={20} /> {loading ? 'Submitting Order...' : 'Submit Order'}
                </button>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                <ShieldCheck size={16} style={{ color: 'var(--primary-blue)' }} /> Order status will initialize as "Order Submitted / Pending Approval".
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default Checkout;
