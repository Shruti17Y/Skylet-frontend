import React, { useState, useEffect } from 'react';
import { adminService } from '../adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Users, CheckCircle2, XCircle, Search, UserX, UserCheck } from 'lucide-react';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminService.getUsers();
      if (res.success) {
        setUsers(res.users || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch customer accounts.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      setError('');
      const newStatus = !currentStatus;
      const res = await adminService.toggleUserStatus(id, newStatus);
      if (res.success) {
        setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, is_active: newStatus } : u)));
      }
    } catch (err) {
      setError(err.message || 'Failed to update user active status.');
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.state && u.state.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>
            Registered Customer Accounts
          </h1>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Monitor B2B customer profiles, WhatsApp numbers, state locations, and toggle active/deactive status.
          </p>
        </div>

        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            type="text"
            placeholder="Search name, email, state..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 0.75rem 0.5rem 2.25rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
          />
        </div>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <LoadingSpinner message="Fetching customer accounts database..." />
      ) : (
        <div className="erp-table-card">
          <div style={{ overflowX: 'auto' }}>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Email Address</th>
                  <th>WhatsApp Number</th>
                  <th>State</th>
                  <th>Registration Date</th>
                  <th>Account Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td style={{ fontWeight: 700 }}>{u.full_name}</td>
                    <td style={{ color: '#475569' }}>{u.email}</td>
                    <td style={{ fontWeight: 600, color: '#0284c7' }}>{u.whatsapp_number || 'N/A'}</td>
                    <td>{u.state || 'N/A'}</td>
                    <td style={{ color: '#64748b' }}>{new Date(u.created_at).toLocaleDateString('en-IN')}</td>
                    <td>
                      {u.is_active ? (
                        <span className="admin-badge admin-badge-success">● Active</span>
                      ) : (
                        <span className="admin-badge admin-badge-danger">○ Deactivated</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleToggleStatus(u.id, u.is_active)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.8rem',
                          borderRadius: '4px',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: 600,
                          backgroundColor: u.is_active ? '#fee2e2' : '#dcfce7',
                          color: u.is_active ? '#b91c1c' : '#15803d',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        {u.is_active ? <UserX size={13} /> : <UserCheck size={13} />}
                        {u.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
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

export default AdminUsers;
