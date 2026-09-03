import React, { useState, useEffect } from 'react';
import { adminService } from '../adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { UserCheck, PlusCircle, Building2, CheckCircle2, UserX, KeyRound, ShieldAlert } from 'lucide-react';

const AdminDeptAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [newAcc, setNewAcc] = useState({
    full_name: '',
    email: '',
    password: '',
    role_id: '3',
    department_id: '1',
  });

  const roleOptions = [
    { role_id: 3, dept_id: 1, label: 'Water Level Department' },
    { role_id: 4, dept_id: 2, label: 'Panel Department' },
    { role_id: 5, dept_id: 3, label: 'Premium Product Department' },
    { role_id: 6, dept_id: 4, label: 'Auto Switch Department' },
    { role_id: 7, dept_id: 5, label: 'R&D Testing Department' },
    { role_id: 8, dept_id: 6, label: 'Dispatch Department' },
    { role_id: 9, dept_id: 7, label: 'Billing Department' },
  ];

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError('');
      const [accRes, deptRes] = await Promise.all([
        adminService.getDepartmentAccounts(),
        adminService.getLiveDepartmentsStatus(),
      ]);

      if (accRes.success) setAccounts(accRes.accounts || []);
      if (deptRes.success) setDepartments(deptRes.departments || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch department accounts.');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    try {
      setError('');
      setSuccessMsg('');
      const newStatus = !currentStatus;
      const res = await adminService.toggleDepartmentAccountStatus(id, newStatus);
      if (res.success) {
        setAccounts((prev) => prev.map((a) => (a.id === id ? { ...a, is_active: newStatus } : a)));
        setSuccessMsg(`Department account status updated to ${newStatus ? 'Active' : 'Deactivated'}.`);
      }
    } catch (err) {
      setError(err.message || 'Failed to toggle account status.');
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!newAcc.full_name || !newAcc.email || !newAcc.password) {
      setError('All fields are required.');
      return;
    }

    try {
      setFormLoading(true);
      const res = await adminService.createDepartmentAccount(newAcc);
      if (res.success) {
        setSuccessMsg(`Department account created for ${newAcc.full_name}.`);
        setCreateModalOpen(false);
        fetchAccounts();
      }
    } catch (err) {
      setError(err.message || 'Failed to create department account.');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>
            Department Accounts Manager
          </h1>
          <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: 0 }}>
            Configure internal credentials for Water Level, Panel, Auto Switch, R&D, Dispatch, and Billing accounts.
          </p>
        </div>

        <button onClick={() => setCreateModalOpen(true)} style={{ padding: '0.65rem 1.25rem', backgroundColor: 'var(--admin-primary)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(30,58,138,0.3)' }}>
          <PlusCircle size={18} /> Create Department Account
        </button>
      </div>

      <ErrorMessage message={error} />

      {successMsg && (
        <div style={{ padding: '1rem', backgroundColor: '#dcfce7', border: '1px solid #86efac', borderRadius: '8px', color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 600 }}>
          <CheckCircle2 size={18} /> {successMsg}
        </div>
      )}

      {loading ? (
        <LoadingSpinner message="Fetching department credentials database..." />
      ) : (
        <div className="erp-table-card">
          <div style={{ overflowX: 'auto' }}>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Department Account Name</th>
                  <th>Department Role</th>
                  <th>Login Email</th>
                  <th>Account Status</th>
                  <th style={{ textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((acc) => (
                  <tr key={acc.id}>
                    <td style={{ fontWeight: 700 }}>{acc.full_name}</td>
                    <td>
                      <strong style={{ color: '#0284c7' }}>
                        <Building2 size={13} style={{ display: 'inline', marginRight: '4px' }} />
                        {acc.department_name || acc.role_name}
                      </strong>
                    </td>
                    <td style={{ color: '#475569' }}>{acc.email}</td>
                    <td>
                      {acc.is_active ? (
                        <span className="admin-badge admin-badge-success">● Active</span>
                      ) : (
                        <span className="admin-badge admin-badge-danger">○ Inactive</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleToggleStatus(acc.id, acc.is_active)}
                        style={{
                          padding: '0.35rem 0.75rem',
                          fontSize: '0.8rem',
                          borderRadius: '4px',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: 600,
                          backgroundColor: acc.is_active ? '#fee2e2' : '#dcfce7',
                          color: acc.is_active ? '#b91c1c' : '#15803d',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                        }}
                      >
                        {acc.is_active ? <UserX size={13} /> : <UserCheck size={13} />}
                        {acc.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Account Modal */}
      {createModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>
          <div style={{ maxWidth: '500px', width: '100%', backgroundColor: '#fff', borderRadius: '10px', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.3)' }}>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--admin-primary)', marginTop: 0, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <KeyRound size={22} /> Create Department Account
            </h3>

            <form onSubmit={handleCreateAccount} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Select Department Role *</label>
                <select
                  value={`${newAcc.role_id}_${newAcc.department_id}`}
                  onChange={(e) => {
                    const [rId, dId] = e.target.value.split('_');
                    const opt = roleOptions.find((o) => o.role_id === parseInt(rId, 10));
                    setNewAcc((prev) => ({
                      ...prev,
                      role_id: rId,
                      department_id: dId,
                      full_name: opt ? opt.label : prev.full_name,
                    }));
                  }}
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                >
                  {roleOptions.map((opt) => (
                    <option key={opt.role_id} value={`${opt.role_id}_${opt.dept_id}`}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Account Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Water Level Department"
                  value={newAcc.full_name}
                  onChange={(e) => setNewAcc({ ...newAcc, full_name: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Login Email *</label>
                <input
                  type="email"
                  placeholder="e.g. waterlevel@voltcraftelectrical.com"
                  value={newAcc.email}
                  onChange={(e) => setNewAcc({ ...newAcc, email: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#334155', display: 'block', marginBottom: '0.35rem' }}>Account Password * (Bcrypt Hashed)</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={newAcc.password}
                  onChange={(e) => setNewAcc({ ...newAcc, password: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.65rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setCreateModalOpen(false)} style={{ padding: '0.6rem 1.25rem', backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '6px', fontWeight: 600, cursor: 'pointer', color: '#334155' }}>
                  Cancel
                </button>
                <button type="submit" disabled={formLoading} style={{ padding: '0.6rem 1.25rem', backgroundColor: 'var(--admin-primary)', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 700, cursor: 'pointer' }}>
                  {formLoading ? 'Creating...' : 'Create Account'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDeptAccounts;
