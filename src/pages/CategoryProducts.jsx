import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsService, categoriesService } from '../api/services';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import EmptyState from '../components/EmptyState';
import { ArrowLeft, Layers } from 'lucide-react';

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        setLoading(true);
        setError('');

        const [catRes, prodRes] = await Promise.all([
          categoriesService.getCategoryById(categoryId).catch(() => ({ success: false })),
          productsService.getProductsByCategory(categoryId),
        ]);

        if (catRes.success) {
          setCategory(catRes.category);
        }

        if (prodRes.success) {
          setProducts(prodRes.products || []);
        }
      } catch (err) {
        setError(err.message || 'Failed to load products for this category.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndProducts();
  }, [categoryId]);

  return (
    <div>
      <Link to="/categories" className="btn btn-outline btn-sm" style={{ marginBottom: '1.5rem', width: 'fit-content' }}>
        <ArrowLeft size={16} /> Back to Categories
      </Link>

      <div style={{ marginBottom: '2.5rem', backgroundColor: '#FFFFFF', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary-blue)', fontWeight: 600, fontSize: '0.8rem', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Layers size={16} /> CATEGORY PRODUCT RANGE
        </div>
        <h1 style={{ fontSize: '2rem', color: 'var(--text-primary)', marginBottom: '0.5rem', fontWeight: 800 }}>
          {category ? category.name : 'Products'}
        </h1>
        {category && category.description && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '800px', lineHeight: 1.6 }}>
            {category.description}
          </p>
        )}
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching SkyLET category products..." />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : products.length === 0 ? (
        <EmptyState
          title="No Products Live Currently"
          message="Products in this category are undergoing quality checks or live-date scheduling."
        />
      ) : (
        <div className="grid-3">
          {products.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
