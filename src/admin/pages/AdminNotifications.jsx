import React, { useState, useEffect } from 'react';
import { adminService } from '../adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Bell, Send, CheckCircle2 } from 'lucide-react';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('/catalog');
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminService.getNotifications();
      if (res.success) setNotifications(res.notifications || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch notifications.');
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) {
      setError('Title and message are required.');
      return;
    }

    try {
      setPublishing(true);
      setError('');
      setSuccessMsg('');
      const res = await adminService.createNotification({ title: title.trim(), message: message.trim(), link: link.trim() });
      if (res.success) {
        setSuccessMsg('Broadcast notification published to all customers.');
        setTitle('');
        setMessage('');
        fetchNotifications();
      }
    } catch (err) {
      setError(err.message || 'Failed to publish notification.');
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>
          Broadcast & System Notifications
        </h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Publish system-wide alerts, catalog announcements, or targeted order notifications.
        </p>
      </div>

      <ErrorMessage message={error} />
      {successMsg && (
        <div style={{ padding: '1rem', backgroundColor: '#dcfce7', border: '1px solid #86efac', borderRadius: '8px', color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
          <CheckCircle2 size={18} /> {successMsg}
        </div>
      )}

      {/* Publish Form */}
      <div className="erp-table-card" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--admin-primary)', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Bell size={20} /> Publish Broadcast Notification (All Customers)
        </h3>

        <form onSubmit={handlePublish} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Notification Title *</label>
            <input
              type="text"
              placeholder="e.g. Technical Datasheet & Price Revision 2026"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Message Body *</label>
            <textarea
              rows="3"
              placeholder="Enter message text to be delivered to customer notification centers..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Target Navigation Link</label>
            <input
              type="text"
              placeholder="/catalog or /categories"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
            />
          </div>

          <button type="submit" disabled={publishing} style={{ width: 'fit-content', padding: '0.65rem 1.5rem', backgroundColor: 'var(--admin-primary)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Send size={16} /> {publishing ? 'Publishing...' : 'Publish Notification'}
          </button>
        </form>
      </div>

      {/* Notifications List */}
      {loading ? (
        <LoadingSpinner message="Fetching notifications log..." />
      ) : (
        <div className="erp-table-card">
          <div style={{ overflowX: 'auto' }}>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Published Date</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((n) => (
                  <tr key={n.id}>
                    <td style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>{n.title}</td>
                    <td>{n.message}</td>
                    <td style={{ color: '#64748b' }}>{new Date(n.created_at).toLocaleString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
