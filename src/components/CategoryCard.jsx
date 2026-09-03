import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Sliders, ShieldCheck, Cpu, Droplet } from 'lucide-react';

const getCategoryIcon = (name = '') => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('water')) return <Droplet size={24} style={{ color: 'var(--primary-blue)' }} />;
  if (lowerName.includes('panel')) return <Sliders size={24} style={{ color: 'var(--primary-blue)' }} />;
  if (lowerName.includes('premium')) return <ShieldCheck size={24} style={{ color: 'var(--primary-blue)' }} />;
  if (lowerName.includes('switch') || lowerName.includes('auto')) return <Cpu size={24} style={{ color: 'var(--primary-blue)' }} />;
  return <Layers size={24} style={{ color: 'var(--primary-blue)' }} />;
};

const CategoryCard = ({ category }) => {
  return (
    <div
      className="card card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderColor: 'var(--border-color)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        padding: '1.5rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {getCategoryIcon(category.name)}
        </div>
        {category.active_product_count !== undefined && (
          <span className="badge badge-blue">
            {category.active_product_count} Products
          </span>
        )}
      </div>

      <h3
        style={{
          fontSize: '1.2rem',
          color: 'var(--text-primary)',
          marginBottom: '0.5rem',
          fontWeight: 700,
        }}
      >
        {category.name}
      </h3>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '0.875rem',
          lineHeight: 1.5,
          marginBottom: '1.5rem',
          flex: 1,
        }}
      >
        {category.description || 'Explore top-tier B2B electrical equipment engineered for reliable industrial performance.'}
      </p>

      <Link
        to={`/category/${category.id}`}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'var(--primary-blue)',
          fontWeight: 600,
          fontSize: '0.9rem',
          textDecoration: 'none',
          marginTop: 'auto',
        }}
      >
        View Products <ArrowRight size={16} />
      </Link>
    </div>
  );
};

export default CategoryCard;
