import React, { useState, useEffect } from 'react';
import { profileService } from '../api/services';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { User, Mail, Calendar, MapPin, Phone, Save, CheckCircle2 } from 'lucide-react';

const Profile = () => {
  const { updateUserProfile } = useAuth();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    birth_date: '',
    state: '',
    whatsapp_number: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await profileService.getProfile();
      if (res.success && res.user) {
        const u = res.user;
        setFormData({
          full_name: u.full_name || '',
          email: u.email || '',
          birth_date: u.birth_date ? u.birth_date.split('T')[0] : '',
          state: u.state || '',
          whatsapp_number: u.whatsapp_number || '',
        });
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch user profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!formData.full_name.trim()) {
      setError('Full Name cannot be empty.');
      return;
    }

    if (!formData.birth_date) {
      setError('Valid birth date required.');
      return;
    }

    if (!formData.state.trim()) {
      setError('State is required.');
      return;
    }

    if (!formData.whatsapp_number.trim() || formData.whatsapp_number.trim().length < 8) {
      setError('Valid WhatsApp number required.');
      return;
    }

    try {
      setSaving(true);
      const res = await profileService.updateProfile({
        full_name: formData.full_name,
        birth_date: formData.birth_date,
        state: formData.state,
        whatsapp_number: formData.whatsapp_number,
      });

      if (res.success && res.user) {
        updateUserProfile(res.user);
        setSuccessMsg('Profile updated successfully.');
        setTimeout(() => setSuccessMsg(''), 4000);
      }
    } catch (err) {
      setError(err.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading your customer profile..." />;

  return (
    <div style={{ maxWidth: '680px', margin: '0 auto' }}>
      
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem' }}>
          <User size={18} /> ACCOUNT SETTINGS
        </div>
        <h1 style={{ fontSize: '2.25rem', color: 'var(--text-main)', margin: '0.25rem 0' }}>User Profile</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your personal details, contact number, and state location.</p>
      </div>

      <ErrorMessage message={error} />

      {successMsg && (
        <div
          style={{
            padding: '1rem 1.25rem',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--status-completed)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            fontWeight: 600,
          }}
        >
          <CheckCircle2 size={20} />
          {successMsg}
        </div>
      )}

      <div className="card" style={{ backgroundColor: 'var(--bg-card)', padding: '2rem' }}>
        <form onSubmit={handleSubmit}>
          
          {/* Full Name */}
          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="text"
                name="full_name"
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Email (Disabled / Readonly) */}
          <div className="form-group">
            <label className="form-label">Email Address (Readonly Account Identity)</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="email"
                className="form-input"
                style={{ paddingLeft: '2.75rem', opacity: 0.7, cursor: 'not-allowed', backgroundColor: 'var(--bg-card)' }}
                value={formData.email}
                disabled
              />
            </div>
          </div>

          <div className="grid-2" style={{ gap: '1rem' }}>
            {/* Birth Date */}
            <div className="form-group">
              <label className="form-label">Birth Date *</label>
              <div style={{ position: 'relative' }}>
                <Calendar size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
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

            {/* State */}
            <div className="form-group">
              <label className="form-label">State *</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                <input
                  type="text"
                  name="state"
                  className="form-input"
                  style={{ paddingLeft: '2.75rem' }}
                  value={formData.state}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* WhatsApp Number */}
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">WhatsApp Number *</label>
            <div style={{ position: 'relative' }}>
              <Phone size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
              <input
                type="tel"
                name="whatsapp_number"
                className="form-input"
                style={{ paddingLeft: '2.75rem' }}
                value={formData.whatsapp_number}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Save Button */}
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} disabled={saving}>
            <Save size={18} /> {saving ? 'Saving Profile...' : 'Save Profile Changes'}
          </button>
        </form>
      </div>

    </div>
  );
};

export default Profile;
