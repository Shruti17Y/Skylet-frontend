import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productsService } from '../api/services';
import { useCart } from '../context/CartContext';
import QuantitySelector from '../components/QuantitySelector';
import LightboxModal from '../components/LightboxModal';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { ArrowLeft, ShoppingCart, Eye, PackageCheck, ShieldCheck, CheckCircle2 } from 'lucide-react';

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await productsService.getProductById(productId);
        if (res.success && res.product) {
          setProduct(res.product);
          setQuantity(parseInt(res.product.minimum_order_quantity || 100, 10));
        }
      } catch (err) {
        setError(err.message || 'Unable to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    setError('');
    setSuccessMsg('');

    const moq = parseInt(product.minimum_order_quantity || 100, 10);
    if (quantity < moq) {
      setError(`Minimum order quantity is ${moq}.`);
      return;
    }

    try {
      setAdding(true);
      const res = await addToCart(product.id, quantity);
      if (res.success) {
        setSuccessMsg(`Added ${quantity} units of ${product.name} to cart.`);
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      setError(err.message || 'Failed to add product to cart.');
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading SkyLET product details..." />;
  if (error && !product) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found." />;

  const moq = parseInt(product.minimum_order_quantity || 100, 10);
  const price = parseFloat(product.price);
  const formattedPrice = `₹${price.toLocaleString('en-IN')}`;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      {/* Back link */}
      <Link to={`/category/${product.category_id}`} className="btn btn-outline btn-sm" style={{ marginBottom: '1.5rem', width: 'fit-content' }}>
        <ArrowLeft size={16} /> Back to {product.category_name || 'Category'}
      </Link>

      <ErrorMessage message={error} />

      {successMsg && (
        <div
          style={{
            padding: '1rem 1.25rem',
            backgroundColor: 'var(--success-light)',
            border: '1px solid rgba(22, 163, 74, 0.25)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <CheckCircle2 size={20} />
            <span style={{ fontWeight: 600 }}>{successMsg}</span>
          </div>
          <button onClick={() => navigate('/cart')} className="btn btn-sm btn-primary">
            View Cart
          </button>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid-2" style={{ gap: '2.5rem', alignItems: 'start' }}>
        {/* Left Column: Product Image Showcase */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-color)',
            overflow: 'hidden',
            padding: '1.25rem',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div
            style={{
              height: '380px',
              overflow: 'hidden',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-surface)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-color)',
            }}
          >
            <img
              src={product.main_image || '/logo.png'}
              alt={product.name}
              style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: '1rem' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/logo.png';
              }}
            />
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <span className="badge badge-moq" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem', backgroundColor: '#FFFFFF' }}>
                <PackageCheck size={14} style={{ color: 'var(--primary-blue)' }} /> MOQ: {moq} Units
              </span>
            </div>
          </div>

          {/* View More Lightbox CTA Button */}
          <div style={{ marginTop: '1.25rem' }}>
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Eye size={18} /> View Technical Image Preview
            </button>
          </div>
        </div>

        {/* Right Column: Specifications & Actions */}
        <div className="card" style={{ backgroundColor: '#FFFFFF', padding: '2rem' }}>
          <span style={{ fontSize: '0.775rem', fontWeight: 600, color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {product.category_name}
          </span>
          <h1 style={{ fontSize: '1.85rem', color: 'var(--text-primary)', marginTop: '0.25rem', marginBottom: '1rem', lineHeight: 1.25, fontWeight: 700 }}>
            {product.name}
          </h1>

          <div style={{ marginBottom: '1.5rem', paddingTop: '0.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase' }}>Wholesale B2B Rate</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
              <span style={{ fontSize: '2.1rem', fontWeight: 800, color: 'var(--primary-blue)', fontFamily: 'var(--font-heading)' }}>
                {formattedPrice}
              </span>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>per unit</span>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 600 }}>Technical Description</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              {product.description}
            </p>
          </div>

          {/* MOQ Logic Control */}
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              padding: '1.25rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              marginBottom: '1.75rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <label className="form-label" style={{ margin: 0 }}>Select Quantity</label>
              <span style={{ fontSize: '0.8rem', color: 'var(--primary-blue)', fontWeight: 600 }}>
                Minimum Order Quantity: {moq}
              </span>
            </div>

            <QuantitySelector
              quantity={quantity}
              minQuantity={moq}
              onChange={(val) => setQuantity(val)}
            />
          </div>

          {/* Total Calculation Preview */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1rem', fontWeight: 600 }}>
            <span style={{ color: 'var(--text-secondary)' }}>Subtotal Calculation:</span>
            <span style={{ color: 'var(--text-primary)', fontSize: '1.35rem', fontWeight: 700 }}>
              ₹{(quantity * price).toLocaleString('en-IN')}
            </span>
          </div>

          {/* Action Button */}
          <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={adding}
          >
            <ShoppingCart size={20} /> {adding ? 'Adding to Cart...' : 'Add to Cart'}
          </button>

          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.825rem' }}>
            <ShieldCheck size={16} style={{ color: 'var(--primary-blue)' }} /> Direct manufacturer dispatch & quality warranty.
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageUrl={product.view_details_image || product.main_image || '/logo.png'}
        title={`${product.name} — Technical Details`}
      />
    </div>
  );
};

export default ProductDetails;
