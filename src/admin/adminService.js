import apiClient from '../api/axios';

export const adminService = {
  // Dashboard & Stats
  getDashboardStats: () => apiClient.get('/admin/dashboard/stats'),

  // Orders & Price Review & Approval
  getOrders: (params) => apiClient.get('/admin/orders', { params }),
  getOrderById: (id) => apiClient.get(`/admin/orders/${id}`),
  approveOrder: (id) => apiClient.patch(`/admin/orders/${id}/approve`),
  rejectOrder: (id, reason) => apiClient.patch(`/admin/orders/${id}/reject`, { reason }),
  updateOrderItemPrice: (id, itemId, unitPrice) =>
    apiClient.patch(`/admin/orders/${id}/price`, { item_id: itemId, unit_price: unitPrice }),

  // Product Management
  getProducts: () => apiClient.get('/admin/products'),
  createProduct: (formData) =>
    apiClient.post('/admin/products', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  updateProduct: (id, formData) =>
    apiClient.patch(`/admin/products/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  deleteProduct: (id) => apiClient.delete(`/admin/products/${id}`),

  // Categories
  getCategories: () => apiClient.get('/categories'),

  // Users & Customer Accounts
  getUsers: () => apiClient.get('/admin/users'),
  toggleUserStatus: (id, isActive) => apiClient.patch(`/admin/users/${id}/status`, { is_active: isActive }),

  // Department Accounts
  getDepartmentAccounts: () => apiClient.get('/admin/department-accounts'),
  createDepartmentAccount: (data) => apiClient.post('/admin/department-accounts', data),
  toggleDepartmentAccountStatus: (id, isActive) =>
    apiClient.patch(`/admin/department-accounts/${id}/status`, { is_active: isActive }),

  // Live Departments Monitoring
  getLiveDepartmentsStatus: () => apiClient.get('/admin/departments/live-status'),

  // Payment Settings
  getPaymentSettings: () => apiClient.get('/admin/payment-settings'),
  updatePaymentSettings: (formData) =>
    apiClient.patch('/admin/payment-settings', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  // Audit Logs
  getAuditLogs: () => apiClient.get('/admin/audit-logs'),

  // Notifications
  getNotifications: () => apiClient.get('/notifications'),
  createNotification: (data) => apiClient.post('/notifications', data),

  // Catalog
  getCatalog: () => apiClient.get('/catalog'),

  // Offers
  getOffers: () => apiClient.get('/offers'),
};
