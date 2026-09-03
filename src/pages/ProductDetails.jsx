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
          // Set initial quantity to MOQ
          setQuantity(parseInt(res.product.minimum_order_quantity, 10));
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

    const moq = parseInt(product.minimum_order_quantity, 10);
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

  if (loading) return <LoadingSpinner message="Loading product blueprint & specs..." />;
  if (error && !product) return <ErrorMessage message={error} />;
  if (!product) return <ErrorMessage message="Product not found." />;

  const moq = parseInt(product.minimum_order_quantity, 10);
  const price = parseFloat(product.price);
  const formattedPrice = `₹${price.toLocaleString('en-IN')}`;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Back link */}
      <Link to={`/category/${product.category_id}`} className="btn btn-secondary btn-sm" style={{ marginBottom: '1.5rem', width: 'fit-content' }}>
        <ArrowLeft size={16} /> Back to {product.category_name || 'Category'}
      </Link>

      <ErrorMessage message={error} />

      {successMsg && (
        <div
          style={{
            padding: '1rem 1.25rem',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--status-completed)',
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
        
        {/* Left Column: Product Main Image */}
        <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', overflow: 'hidden', padding: '1rem' }}>
          <div style={{ height: '380px', overflow: 'hidden', borderRadius: 'var(--radius-md)', backgroundColor: '#060a12', position: 'relative' }}>
            <img
              src={product.main_image}
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
            <div style={{ position: 'absolute', top: '1rem', right: '1rem' }}>
              <span className="badge badge-moq" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                <PackageCheck size={14} /> MOQ: {moq} Units
              </span>
            </div>
          </div>

          {/* View More Lightbox CTA Button */}
          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="btn btn-outline"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Eye size={18} /> View More Detailed Image
            </button>
          </div>
        </div>

        {/* Right Column: Specifications & Actions */}
        <div className="card" style={{ backgroundColor: 'var(--bg-card)', padding: '2rem' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {product.category_name}
          </span>
          <h1 style={{ fontSize: '2rem', color: 'var(--text-main)', marginTop: '0.25rem', marginBottom: '1rem', lineHeight: 1.25 }}>
            {product.name}
          </h1>

          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', display: 'block' }}>Unit Price (Excl. Freight)</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                {formattedPrice}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>per piece</span>
            </div>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '1.75rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Technical Specification & Description</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>
              {product.description}
            </p>
          </div>

          {/* MOQ Logic Control */}
          <div style={{ backgroundColor: 'var(--bg-input)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <label className="form-label" style={{ margin: 0 }}>Select Quantity</label>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                Minimum Order: {moq}
              </span>
            </div>

            <QuantitySelector
              quantity={quantity}
              minQuantity={moq}
              onChange={(val) => setQuantity(val)}
            />
          </div>

          {/* Total Calculation Preview */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.1rem', fontWeight: 700 }}>
            <span style={{ color: 'var(--text-muted)' }}>Order Total Estimate:</span>
            <span style={{ color: 'var(--text-main)', fontSize: '1.4rem' }}>
              ₹{(quantity * price).toLocaleString('en-IN')}
            </span>
          </div>

          {/* Action Buttons */}
          <button
            onClick={handleAddToCart}
            className="btn btn-primary btn-lg"
            style={{ width: '100%', justifyContent: 'center' }}
            disabled={adding}
          >
            <ShoppingCart size={20} /> {adding ? 'Adding to Cart...' : 'Add to Cart'}
          </button>

          <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)', fontSize: '0.825rem' }}>
            <ShieldCheck size={16} style={{ color: 'var(--status-completed)' }} /> Tested & verified for industrial power grid stability.
          </div>
        </div>
      </div>

      {/* Lightbox Modal for View Details Image */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        imageUrl={product.view_details_image || product.main_image}
        title={`${product.name} — Technical Details & Circuit Diagram`}
      />
    </div>
  );
};

export default ProductDetails;
