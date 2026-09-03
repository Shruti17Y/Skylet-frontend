import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ordersService, companyService } from '../api/services';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Truck, CreditCard, Upload, CheckCircle2, ArrowLeft, ShieldCheck, QrCode } from 'lucide-react';

const Checkout = () => {
  const { cart, fetchCart } = useCart();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Transport & Review, 2: Payment & Proof Submit
  const [transportName, setTransportName] = useState('');
  const [paymentProofFile, setPaymentProofFile] = useState(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState('');
  
  const [companyDetails, setCompanyDetails] = useState({
    bank_name: 'HDFC Bank Ltd.',
    account_name: 'VoltCraft Industrial Solutions Pvt Ltd',
    account_number: '50200088912345',
    ifsc_code: 'HDFC0001234',
    upi_id: 'voltcraft@hdfcbank',
    support_phone: '9227677800',
    qr_code_image: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=voltcraft@hdfcbank&pn=VoltCraft%20Electrical',
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
      <div style={{ textAlign: 'center', padding: '4rem 1.5rem' }}>
        <h2>No Items in Cart for Checkout</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Please add products to your cart before proceeding.</p>
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
        await fetchCart(); // Refresh cart to empty
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
        <h1 style={{ fontSize: '2.25rem', color: 'var(--text-main)', marginBottom: '0.25rem' }}>Order Checkout</h1>
        <p style={{ color: 'var(--text-muted)' }}>Complete transport details and submit payment proof for order placement.</p>
      </div>

      {/* Checkout Steps Progress */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div
          onClick={() => setStep(1)}
          style={{
            flex: 1,
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: step === 1 ? 'var(--primary-light)' : 'var(--bg-card)',
            border: step === 1 ? '1px solid var(--primary)' : '1px solid var(--border-color)',
            color: step === 1 ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer',
          }}
        >
          <Truck size={20} /> 1. Transport & Order Review
        </div>

        <div
          style={{
            flex: 1,
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: step === 2 ? 'var(--primary-light)' : 'var(--bg-card)',
            border: step === 2 ? '1px solid var(--primary)' : '1px solid var(--border-color)',
            color: step === 2 ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <CreditCard size={20} /> 2. Payment Info & Proof Upload
        </div>
      </div>

      <ErrorMessage message={error} />

      {/* STEP 1: TRANSPORT NAME & ORDER REVIEW */}
      {step === 1 && (
        <form onSubmit={handleTransportSubmit}>
          <div className="grid-2" style={{ gap: '2rem', alignItems: 'start' }}>
            
            {/* Required Transport Name Input */}
            <div className="card" style={{ backgroundColor: 'var(--bg-card)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Truck size={20} style={{ color: 'var(--primary)' }} /> Transport Logistics Details
              </h3>

              <div className="form-group">
                <label className="form-label" style={{ fontSize: '0.95rem', fontWeight: 700 }}>
                  Transport Name * <span style={{ color: 'var(--status-danger)' }}>(REQUIRED)</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. ABC Transport / Speed Logistics / VRL Logistics"
                  value={transportName}
                  onChange={(e) => setTransportName(e.target.value)}
                  required
                  style={{ fontSize: '1rem', padding: '0.85rem' }}
                />
                <small style={{ color: 'var(--text-dim)', marginTop: '0.35rem' }}>
                  Please specify the transport agency name for goods dispatch. You cannot continue without entering transport name.
                </small>
              </div>
            </div>

            {/* Order Items Review Summary Table */}
            <div className="card" style={{ backgroundColor: 'var(--bg-card)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem' }}>
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
                        <td style={{ fontWeight: 700, color: 'var(--primary)' }}>
                          ₹{item.item_total.toLocaleString('en-IN')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                  <span>Subtotal:</span>
                  <strong>₹{cart.subtotal.toLocaleString('en-IN')}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                  <span>Transport:</span>
                  <strong style={{ color: 'var(--accent-cyan)' }}>{transportName || 'Pending Input'}</strong>
                </div>
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800 }}>
                  <span>Total Amount:</span>
                  <span style={{ color: 'var(--primary)' }}>₹{cart.final_total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between' }}>
                <Link to="/cart" className="btn btn-secondary btn-sm">
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
            
            {/* Payment Info */}
            <div className="card" style={{ backgroundColor: 'var(--bg-card)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CreditCard size={20} style={{ color: 'var(--primary)' }} /> Company Bank & UPI Details
              </h3>

              <div style={{ backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-color)', marginBottom: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.95rem' }}>
                <div>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Bank Name</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{companyDetails.bank_name}</div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Account Name</span>
                  <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{companyDetails.account_name}</div>
                </div>

                <div className="grid-2" style={{ gap: '1rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Account Number</span>
                    <div style={{ fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>{companyDetails.account_number}</div>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase' }}>IFSC Code</span>
                    <div style={{ fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>{companyDetails.ifsc_code}</div>
                  </div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', textTransform: 'uppercase' }}>UPI ID</span>
                  <div style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{companyDetails.upi_id}</div>
                </div>
              </div>

              {/* QR Scanner Display */}
              <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#fff', borderRadius: 'var(--radius-md)', width: 'fit-content', margin: '0 auto 1.25rem auto' }}>
                <img src={companyDetails.qr_code_image} alt="Payment QR Code" style={{ width: '180px', height: '180px', objectFit: 'contain' }} />
                <div style={{ color: '#0f172a', fontWeight: 700, fontSize: '0.8rem', marginTop: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.3rem' }}>
                  <QrCode size={14} /> Scan to Pay via Any UPI App
                </div>
              </div>

              <div style={{ padding: '0.85rem 1rem', backgroundColor: 'var(--primary-light)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 'var(--radius-md)', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600, textAlign: 'center' }}>
                After making the payment, send the payment proof to: <strong>{companyDetails.support_phone}</strong>
              </div>
            </div>

            {/* Payment Proof Upload & Place Order */}
            <div className="card" style={{ backgroundColor: 'var(--bg-card)' }}>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Upload size={20} style={{ color: 'var(--primary)' }} /> Upload Payment Proof
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
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', display: 'block', marginBottom: '0.5rem' }}>Proof Preview:</span>
                  <img src={paymentProofPreview} alt="Proof preview" style={{ maxHeight: '140px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                </div>
              )}

              {/* Order Summary Box */}
              <div style={{ padding: '1rem', backgroundColor: 'var(--bg-input)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  <span>Transport:</span>
                  <strong style={{ color: 'var(--text-main)' }}>{transportName}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 800 }}>
                  <span>Total Payable:</span>
                  <span style={{ color: 'var(--primary)' }}>₹{cart.final_total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button type="button" onClick={() => setStep(1)} className="btn btn-secondary btn-sm">
                  <ArrowLeft size={16} /> Back
                </button>
                <button type="submit" className="btn btn-primary btn-lg" style={{ flex: 1, justifyContent: 'center' }} disabled={loading}>
                  <CheckCircle2 size={20} /> {loading ? 'Submitting Order...' : 'Submit Order'}
                </button>
              </div>

              <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                <ShieldCheck size={16} /> Initial Order Status will be set to "Pending Admin Approval".
              </div>
            </div>

          </div>
        </form>
      )}

    </div>
  );
};

export default Checkout;
