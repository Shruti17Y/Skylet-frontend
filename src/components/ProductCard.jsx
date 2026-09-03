import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PackageCheck } from 'lucide-react';

const ProductCard = ({ product }) => {
  const price = parseFloat(product.price);
  const formattedPrice = isNaN(price) ? 'Quote on Request' : `₹${price.toLocaleString('en-IN')}`;

  return (
    <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', padding: 0 }}>
      {/* Product Image */}
      <div style={{ height: '200px', overflow: 'hidden', position: 'relative', backgroundColor: '#090d16' }}>
        <img
          src={product.main_image}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* MOQ Badge */}
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
          <span className="badge badge-moq">
            <PackageCheck size={13} /> MOQ: {product.minimum_order_quantity} Units
          </span>
        </div>
        {/* Category Tag */}
        {product.category_name && (
          <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem' }}>
            <span style={{ backgroundColor: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(4px)', color: 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 600, padding: '0.25rem 0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
              {product.category_name}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', marginBottom: '0.5rem', lineHeight: 1.3 }}>
            {product.name}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.5, marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.description}
          </p>
        </div>

        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase' }}>Price / Unit</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--primary)', fontFamily: 'var(--font-heading)' }}>
                {formattedPrice}
              </span>
            </div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Min {product.minimum_order_quantity} pcs
            </span>
          </div>

          <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
            View Product <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
