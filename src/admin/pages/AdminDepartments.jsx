import React, { useState, useEffect } from 'react';
import { adminService } from '../adminService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Building2, Layers, CheckCircle2, Clock } from 'lucide-react';

const AdminDepartments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await adminService.getLiveDepartmentsStatus();
      if (res.success) {
        setDepartments(res.departments || []);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch department live monitoring.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--admin-text-main)', margin: '0 0 0.25rem 0' }}>
          Department Status Monitoring
        </h1>
        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Real-time tracking of active production items and items ready for packing across all 7 departments.
        </p>
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <LoadingSpinner message="Tracking live department work items..." />
      ) : (
        <div className="erp-table-card">
          <div style={{ overflowX: 'auto' }}>
            <table className="erp-table">
              <thead>
                <tr>
                  <th>Department Name</th>
                  <th>Active Production Items</th>
                  <th>Ready for Packing</th>
                  <th>Operational Status</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((dept) => (
                  <tr key={dept.id}>
                    <td style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--admin-primary)' }}>
                      <Building2 size={16} style={{ display: 'inline', marginRight: '6px' }} />
                      {dept.department_name}
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-process" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                        <Clock size={13} /> {dept.active_orders_count} Active Work Items
                      </span>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-ready" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
                        <CheckCircle2 size={13} /> {dept.ready_count} Ready
                      </span>
                    </td>
                    <td>
                      <span className="admin-badge admin-badge-success">● Active</span>
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

export default AdminDepartments;
