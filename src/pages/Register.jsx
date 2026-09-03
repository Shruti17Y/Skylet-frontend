import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
import { User, Mail, Lock, Calendar, MapPin, Phone, ArrowRight } from 'lucide-react';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: '',
    birth_date: '',
    email: '',
    password: '',
    state: '',
    whatsapp_number: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.full_name.trim()) {
      setError('Full Name cannot be empty.');
      return;
    }

    if (!formData.birth_date) {
      setError('Please enter a valid birth date.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!formData.password || formData.password.length < 8) {
      setError('Password must contain at least 8 characters.');
      return;
    }

    if (!formData.state.trim()) {
      setError('State is required.');
      return;
    }

    if (!formData.whatsapp_number.trim() || formData.whatsapp_number.trim().length < 8) {
      setError('Please enter a valid WhatsApp number.');
      return;
    }

    try {
      setLoading(true);
      const res = await register(formData);
      if (res.success) {
        navigate('/home');
      }
    } catch (err) {
      setError(err.message || 'Registration failed. Please check your input.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2.5rem 1rem' }}>
      <div
        className="card"
        style={{
          maxWidth: '680px',
          width: '100%',
          padding: '2.5rem 2rem',
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <img
              src="/logo.png"
              alt="SkyLET Electrical Solutions"
              style={{ height: '48px', width: 'auto', objectFit: 'contain' }}
            />
          </div>
          <h2 style={{ fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '0.35rem', fontWeight: 700 }}>
            Create Customer Account
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Register your company for wholesale B2B ordering and tracking
          </p>
        </div>

        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit}>
          <div className="grid-2" style={{ gap: '1.25rem' }}>
            {/* Full Name */}
            <div className="form-group">
              <label className="form-label">Full Name *</label>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="full_name"
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                  placeholder="Enter your full name"
                  value={formData.full_name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Birth Date */}
            <div className="form-group">
              <label className="form-label">Birth Date *</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="date"
                  name="birth_date"
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                  value={formData.birth_date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1.25rem' }}>
            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password * (Min 8 chars)</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  name="password"
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1.25rem' }}>
            {/* State */}
            <div className="form-group">
              <label className="form-label">State *</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text"
                  name="state"
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                  placeholder="State name"
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* WhatsApp Number */}
            <div className="form-group">
              <label className="form-label">WhatsApp Number *</label>
              <div style={{ position: 'relative' }}>
                <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="tel"
                  name="whatsapp_number"
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                  placeholder="Enter WhatsApp number"
                  value={formData.whatsapp_number}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', marginTop: '1rem' }} disabled={loading}>
            {loading ? 'Creating Account...' : 'Complete Registration'} <ArrowRight size={18} />
          </button>
        </form>

        <div
          style={{
            marginTop: '2rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border-color)',
          }}
        >
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>
            Login Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
