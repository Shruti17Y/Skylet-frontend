import React, { useState, useEffect } from 'react';
import { categoriesService } from '../api/services';
import CategoryCard from '../components/CategoryCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { Grid } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const res = await categoriesService.getCategories();
        if (res.success) {
          setCategories(res.categories || []);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch categories.');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-blue)', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Grid size={16} /> ELECTRICAL PRODUCT LINEUP
        </div>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 800 }}>Product Categories</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Select an industrial electrical category to view available B2B products and minimum order quantities.
        </p>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading SkyLET categories..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <div className="grid-4">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
