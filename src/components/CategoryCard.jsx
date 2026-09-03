import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';

const CategoryCard = ({ category }) => {
  return (
    <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden', padding: 0 }}>
      <div style={{ height: '180px', overflow: 'hidden', position: 'relative' }}>
        <img
          src={category.image_url}
          alt={category.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
          className="category-img"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)' }} />
        <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem', right: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <h3 style={{ fontSize: '1.35rem', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>{category.name}</h3>
          {category.active_product_count !== undefined && (
            <span className="badge badge-ready" style={{ backgroundColor: 'rgba(6,182,212,0.25)' }}>
              <Layers size={12} /> {category.active_product_count} Products
            </span>
          )}
        </div>
      </div>

      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
          {category.description || 'Explore top-tier electrical products engineered for maximum durability.'}
        </p>

        <Link to={`/category/${category.id}`} className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
          Browse Category <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
