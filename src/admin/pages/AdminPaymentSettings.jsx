import React, { useState, useEffect } from 'react';
import { adminService } from '../adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { CreditCard, Save, CheckCircle2, QrCode } from 'lucide-react';

const AdminPaymentSettings = () => {
  const [settings, setSettings] = useState({
    bank_name: '',
    account_name: '',
    account_number: '',
    ifsc_code: '',
    upi_id: '',
    support_phone: '',
    qr_code_image: '',
  });

  const [qrFile, setQrFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminService.getPaymentSettings();
      if (res.success && res.settings) {
        setSettings(res.settings);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch payment settings.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSettings((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    try {
      setSaving(true);

      const formData = new FormData();
      formData.append('bank_name', settings.bank_name);
      formData.append('account_name', settings.account_name);
      formData.append('account_number', settings.account_number);
      formData.append('ifsc_code', settings.ifsc_code);
      formData.append('upi_id', settings.upi_id);
      formData.append('support_phone', settings.support_phone);
      if (qrFile) formData.append('qr_code_image', qrFile);

      const res = await adminService.updatePaymentSettings(formData);
      if (res.success) {
        setSuccessMsg('Company bank and payment settings updated successfully. Reflected on customer checkout page.');
        fetchSettings();
      }
    } catch (err) {
      setError(err.message || 'Failed to update payment settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner message="Fetching company payment settings..." />;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>
          Payment & Bank Configuration
        </h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Manage company bank details, UPI ID, and QR Scanner image displayed on customer checkout.
        </p>
      </div>

      <ErrorMessage message={error} />
      {successMsg && (
        <div style={{ padding: '1rem', backgroundColor: '#dcfce7', border: '1px solid #86efac', borderRadius: '8px', color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <CheckCircle2 size={18} /> {successMsg}
        </div>
      )}

      <div className="erp-table-card" style={{ padding: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Bank Name *</label>
              <input
                type="text"
                name="bank_name"
                value={settings.bank_name || ''}
                onChange={handleChange}
                required
                style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Account Name *</label>
              <input
                type="text"
                name="account_name"
                value={settings.account_name || ''}
                onChange={handleChange}
                required
                style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Account Number *</label>
              <input
                type="text"
                name="account_number"
                value={settings.account_number || ''}
                onChange={handleChange}
                required
                style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem', fontWeight: 700 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>IFSC Code *</label>
              <input
                type="text"
                name="ifsc_code"
                value={settings.ifsc_code || ''}
                onChange={handleChange}
                required
                style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.95rem', fontWeight: 700 }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>UPI ID *</label>
              <input
                type="text"
                name="upi_id"
                value={settings.upi_id || ''}
                onChange={handleChange}
                required
                style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem', color: '#0284c7', fontWeight: 700 }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Support Contact Phone *</label>
              <input
                type="text"
                name="support_phone"
                value={settings.support_phone || ''}
                onChange={handleChange}
                required
                style={{ padding: '0.7rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#334155' }}>Update Payment QR / Scanner Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setQrFile(e.target.files[0])}
              style={{ padding: '0.5rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
            />
          </div>

          {settings.qr_code_image && (
            <div style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '6px', border: '1px solid var(--admin-border)', width: 'fit-content', margin: '0 auto' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>Current QR Scanner:</span>
              <img src={settings.qr_code_image} alt="QR Scanner" style={{ width: '160px', height: '160px', objectFit: 'contain' }} />
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            style={{
              padding: '0.85rem',
              backgroundColor: 'var(--admin-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: saving ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 12px rgba(30,58,138,0.3)',
            }}
          >
            <Save size={18} /> {saving ? 'Saving Payment Settings...' : 'Save Payment Configuration'}
          </button>

        </form>
      </div>

    </div>
  );
};

export default AdminPaymentSettings;
