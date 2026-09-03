import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';
import { Mail, Lock, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/home';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email address and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await login(email, password);
      if (res.success) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 160px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem' }}>
      <div
        className="card"
        style={{
          maxWidth: '920px',
          width: '100%',
          padding: 0,
          backgroundColor: '#FFFFFF',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        {/* Left Column: Brand Message */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            borderRight: '1px solid var(--border-color)',
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ marginBottom: '2.5rem' }}>
              <img
                src="/logo.png"
                alt="SkyLET Official Logo"
                style={{ height: '52px', width: 'auto', objectFit: 'contain' }}
              />
            </div>
            <span className="badge badge-red" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              Official B2B Customer Portal
            </span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem', lineHeight: 1.25 }}>
              Reliable Electrical Solutions
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '2rem' }}>
              Built for performance and uncompromised quality. Access live B2B wholesale pricing, direct order tracking, and official PDF catalogs.
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#FFFFFF',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--primary-blue)', fontSize: '0.875rem', fontWeight: 600 }}>
              <ShieldCheck size={18} /> ISO Certified Industrial Standards
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
              <Zap size={16} style={{ color: 'var(--brand-red)' }} /> Bulk Water Level, Panel & Auto Switch Orders
            </div>
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.35rem', fontWeight: 700 }}>
              Welcome Back
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Sign in to manage your electrical product orders
            </p>
          </div>

          <ErrorMessage message={error} />

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }} disabled={loading}>
              {loading ? 'Authenticating...' : 'Login to Account'} <ArrowRight size={18} />
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
            Don't have an account?{' '}
            <Link to="/signup" style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>
              Register Company
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
