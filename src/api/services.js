import apiClient from './axios';

export const authService = {
  register: (data) => apiClient.post('/auth/register', data),
  login: (data) => apiClient.post('/auth/login', data),
  logout: () => apiClient.post('/auth/logout'),
  getCurrentUser: () => apiClient.get('/auth/me'),
};

export const categoriesService = {
  getCategories: () => apiClient.get('/categories'),
  getCategoryById: (id) => apiClient.get(`/categories/${id}`),
};

export const productsService = {
  getProducts: (params) => apiClient.get('/products', { params }),
  getProductsByCategory: (categoryId) => apiClient.get(`/products/category/${categoryId}`),
  getProductById: (id) => apiClient.get(`/products/${id}`),
};

export const cartService = {
  getCart: () => apiClient.get('/cart'),
  addToCart: (productId, quantity) => apiClient.post('/cart/items', { product_id: productId, quantity }),
  updateQuantity: (cartItemId, quantity) => apiClient.patch(`/cart/items/${cartItemId}`, { quantity }),
  removeFromCart: (cartItemId) => apiClient.delete(`/cart/items/${cartItemId}`),
  clearCart: () => apiClient.delete('/cart'),
};

export const ordersService = {
  createOrder: (formData) =>
    apiClient.post('/orders', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  uploadPaymentProof: (orderId, formData) =>
    apiClient.post(`/orders/${orderId}/payment-proof`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  getMyOrders: (params) => apiClient.get('/orders/my-orders', { params }),
  getOrderById: (id) => apiClient.get(`/orders/${id}`),
};

export const notificationsService = {
  getNotifications: () => apiClient.get('/notifications'),
  markAsRead: (id) => apiClient.patch(`/notifications/${id}/read`),
  markAllAsRead: () => apiClient.patch('/notifications/read-all'),
};

export const catalogService = {
  getCatalog: () => apiClient.get('/catalog'),
};

export const profileService = {
  getProfile: () => apiClient.get('/profile'),
  updateProfile: (data) => apiClient.patch('/profile', data),
};

export const companyService = {
  getCompanyDetails: () => apiClient.get('/company'),
};
