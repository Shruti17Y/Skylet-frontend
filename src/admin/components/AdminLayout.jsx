import React, { useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminNavbar from './AdminNavbar';
import LoadingSpinner from '../../components/LoadingSpinner';
import '../admin.css';

const AdminLayout = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return <LoadingSpinner message="Verifying administrative access credentials..." />;
  }

  // RBAC Guard: Require Admin Role
  if (!isAuthenticated || !user || user.role_name !== 'admin') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return (
    <div className="admin-body">
      <div className="admin-layout">
        <AdminSidebar
          collapsed={sidebarCollapsed}
          mobileOpen={mobileOpen}
          closeMobile={() => setMobileOpen(false)}
        />
        <div className={`admin-main ${sidebarCollapsed ? 'expanded' : ''}`}>
          <AdminNavbar
            onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
            onMobileToggle={() => setMobileOpen(!mobileOpen)}
          />
          <main className="admin-content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
