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
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
          <Grid size={16} /> COMPONENT PORTFOLIO
        </div>
        <h1 style={{ fontSize: '2.25rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Product Categories</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>
          Select an industrial electrical category to view available products and minimum order quantities.
        </p>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading electrical categories..." />
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
