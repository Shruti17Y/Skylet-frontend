import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ErrorMessage from '../../components/ErrorMessage';
import { ShieldCheck, Lock, Mail, ArrowRight } from 'lucide-react';
import '../admin.css';

const AdminLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('admin@skylet.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both admin email address and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await login(email, password);

      if (res.success && res.user) {
        if (res.user.role_name !== 'admin') {
          setError('Access denied. Only Master Admin accounts can access this panel.');
          return;
        }
        navigate('/admin/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Admin authentication failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
      <div style={{ maxWidth: '440px', width: '100%', backgroundColor: '#ffffff', borderRadius: '12px', padding: '2.5rem 2rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '0.85rem', backgroundColor: '#eff6ff', borderRadius: '10px', color: '#1e3a8a', marginBottom: '1rem' }}>
            <ShieldCheck size={36} />
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.35rem 0', fontFamily: 'Poppins, sans-serif' }}>
            Skylet Control Center
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>
            Master Administrator Portal Access
          </p>
        </div>

        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.25rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Admin Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="email"
                placeholder="admin@skylet.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.6rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1.75rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Admin Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.6rem',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.85rem',
              backgroundColor: '#1e3a8a',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(30, 58, 138, 0.3)',
            }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Control Center'} <ArrowRight size={18} />
          </button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;
