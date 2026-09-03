import React, { useState, useEffect } from 'react';
import { adminService } from '../adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { History, ShieldCheck } from 'lucide-react';

const AdminAuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminService.getAuditLogs();
      if (res.success) {
        setLogs(res.audit_logs || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch audit logs.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>
          Administrative Audit Logs
        </h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Immutable log of all price revisions, order approvals, user status changes, and system settings updates.
        </p>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <LoadingSpinner message="Fetching administrative audit trail..." />
      ) : (
        <div className="erp-table-card">
          <div style={{ overflowX: 'auto' }}>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Performed By</th>
                  <th>Action Type</th>
                  <th>Entity</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id}>
                    <td style={{ color: '#64748b', fontSize: '0.85rem' }}>
                      {new Date(log.created_at).toLocaleString('en-IN')}
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--admin-primary)' }}>
                      {log.user_name || 'System Admin'}
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-approved" style={{ fontSize: '0.7rem' }}>
                        {log.action}
                      </span>
                    </td>
                    <td><strong style={{ color: '#475569' }}>{log.entity_type} #{log.entity_id || 'N/A'}</strong></td>
                    <td style={{ fontSize: '0.9rem' }}>{log.description}</td>
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

export default AdminAuditLogs;
