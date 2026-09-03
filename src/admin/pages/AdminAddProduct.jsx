import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminService } from '../adminService';
import ErrorMessage from '../../components/ErrorMessage';
import { ArrowLeft, Package, Upload, Calendar, Building2, Layers, CheckCircle2, Save } from 'lucide-react';

const AdminAddProduct = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category_id: '1',
    department_id: '1',
    minimum_order_quantity: 100,
    price: '',
    live_from_date: new Date().toISOString().split('T')[0],
    status: 'active',
  });

  const [mainImageFile, setMainImageFile] = useState(null);
  const [detailImageFile, setDetailImageFile] = useState(null);

  useEffect(() => {
    fetchFormOptions();
  }, []);

  const fetchFormOptions = async () => {
    try {
      const [catRes, deptRes] = await Promise.all([
        adminService.getCategories(),
        adminService.getLiveDepartmentsStatus(),
      ]);
      if (catRes.success) setCategories(catRes.categories || []);
      if (deptRes.success) setDepartments(deptRes.departments || []);
    } catch (err) {
      console.error('Failed to fetch options:', err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!formData.name.trim() || !formData.price || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid product name and positive price.');
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append('name', formData.name.trim());
      data.append('description', formData.description.trim());
      data.append('category_id', formData.category_id);
      data.append('department_id', formData.department_id);
      data.append('minimum_order_quantity', formData.minimum_order_quantity);
      data.append('price', formData.price);
      data.append('live_from_date', formData.live_from_date);
      data.append('status', formData.status);

      if (mainImageFile) data.append('main_image', mainImageFile);
      if (detailImageFile) data.append('view_details_image', detailImageFile);

      const res = await adminService.createProduct(data);
      if (res.success) {
        setSuccessMsg(`Product "${formData.name}" created successfully.`);
        setTimeout(() => navigate('/admin/products'), 1500);
      }
    } catch (err) {
      setError(err.message || 'Failed to create product.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <Link to="/admin/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: '#475569', fontWeight: 600, textDecoration: 'none' }}>
        <ArrowLeft size={16} /> Back to Products List
      </Link>

      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>
          Add New Industrial Product
        </h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Create a product specification, assign minimum order quantities (MOQ), department, and scheduled live date.
        </p>
      </div>

      <ErrorMessage message={error} />

      {successMsg && (
        <div style={{ padding: '1.25rem', backgroundColor: '#dcfce7', border: '1px solid #86efac', borderRadius: '8px', color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
          <CheckCircle2 size={20} /> {successMsg}
        </div>
      )}

      <div className="erp-table-card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Product Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Product Name *</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. 3-Phase APFC Control Panel 50kVAr"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem', outline: 'none' }}
            />
          </div>

          {/* Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Technical Specification & Description</label>
            <textarea
              rows="4"
              name="description"
              placeholder="Microprocessor-based control panel featuring automatic capacitor bank switching..."
              value={formData.description}
              onChange={handleChange}
              style={{ padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', outline: 'none' }}
            />
          </div>

          {/* Category & Department Selection */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Category *</label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Production Department *</label>
              <select
                name="department_id"
                value={formData.department_id}
                onChange={handleChange}
                style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.department_name}</option>
                ))}
              </select>
            </div>

          </div>

          {/* MOQ & Price */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Minimum Order Quantity (MOQ) *</label>
              <input
                type="number"
                name="minimum_order_quantity"
                min="1"
                value={formData.minimum_order_quantity}
                onChange={handleChange}
                required
                style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Unit Price (₹) *</label>
              <input
                type="number"
                step="0.01"
                name="price"
                placeholder="e.g. 14500.00"
                value={formData.price}
                onChange={handleChange}
                required
                style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem' }}
              />
            </div>

          </div>

          {/* Live From Date & Status */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Live From Date *</label>
              <input
                type="date"
                name="live_from_date"
                value={formData.live_from_date}
                onChange={handleChange}
                required
                style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
              <small style={{ color: '#64748b' }}>If date is in future, customer portal automatically treats status as Scheduled.</small>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Initial Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              >
                <option value="active">Active / Live</option>
                <option value="scheduled">Scheduled</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

          </div>

          {/* Images Upload */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Main Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setMainImageFile(e.target.files[0])}
                style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>View Details Detailed Blueprint Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setDetailImageFile(e.target.files[0])}
                style={{ padding: '0.4rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
              />
            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '1rem',
              padding: '0.85rem',
              backgroundColor: 'var(--admin-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(30,58,138,0.3)',
            }}
          >
            <Save size={18} /> {loading ? 'Creating Product Specification...' : 'Create & Publish Product'}
          </button>

        </form>
      </div>

    </div>
  );
};

export default AdminAddProduct;
