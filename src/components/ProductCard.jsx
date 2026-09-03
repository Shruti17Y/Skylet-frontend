import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, PackageCheck } from 'lucide-react';

const ProductCard = ({ product }) => {
  const price = parseFloat(product.price);
  const formattedPrice = isNaN(price) ? 'Quote on Request' : `₹${price.toLocaleString('en-IN')}`;

  return (
    <div
      className="card card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
        padding: 0,
        backgroundColor: '#FFFFFF',
        borderColor: 'var(--border-color)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      {/* Product Image Area */}
      <div
        style={{
          height: '200px',
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'var(--bg-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottom: '1px solid var(--border-color)',
        }}
      >
        <img
          src={product.main_image || '/logo.png'}
          alt={product.name}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '1rem' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/logo.png';
          }}
        />
        {/* MOQ Badge */}
        <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
          <span className="badge badge-moq" style={{ backgroundColor: '#FFFFFF', boxShadow: 'var(--shadow-sm)' }}>
            <PackageCheck size={13} style={{ color: 'var(--primary-blue)' }} /> MOQ: {product.minimum_order_quantity || 100}
          </span>
        </div>
        {/* Category Tag */}
        {product.category_name && (
          <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem' }}>
            <span
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: 'var(--text-secondary)',
                fontSize: '0.725rem',
                fontWeight: 600,
                padding: '0.2rem 0.55rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              {product.category_name}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-primary)',
              marginBottom: '0.4rem',
              lineHeight: 1.35,
              fontWeight: 600,
            }}
          >
            {product.name}
          </h3>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              lineHeight: 1.5,
              marginBottom: '1rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </p>
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid var(--border-color)',
            }}
          >
            <div>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', fontWeight: 500 }}>
                Wholesale Price
              </span>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary-blue)', fontFamily: 'var(--font-heading)' }}>
                {formattedPrice}
              </span>
            </div>
            <span style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
              Min {product.minimum_order_quantity || 100} pcs
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
