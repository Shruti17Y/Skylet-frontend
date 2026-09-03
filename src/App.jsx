import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

// Customer Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import PastOrders from './pages/PastOrders';
import OrderDetails from './pages/OrderDetails';
import Notifications from './pages/Notifications';
import Catalog from './pages/Catalog';
import Profile from './pages/Profile';

// Admin Imports
import AdminLayout from './admin/components/AdminLayout';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminOrders from './admin/pages/AdminOrders';
import AdminOrderDetails from './admin/pages/AdminOrderDetails';
import AdminProducts from './admin/pages/AdminProducts';
import AdminAddProduct from './admin/pages/AdminAddProduct';
import AdminCategories from './admin/pages/AdminCategories';
import AdminUsers from './admin/pages/AdminUsers';
import AdminDeptAccounts from './admin/pages/AdminDeptAccounts';
import AdminDepartments from './admin/pages/AdminDepartments';
import AdminNotifications from './admin/pages/AdminNotifications';
import AdminCatalog from './admin/pages/AdminCatalog';
import AdminOffers from './admin/pages/AdminOffers';
import AdminPaymentSettings from './admin/pages/AdminPaymentSettings';
import AdminAuditLogs from './admin/pages/AdminAuditLogs';

// Protected Customer Route
const ProtectedCustomerRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner message="Verifying session security..." />;
  if (!isAuthenticated) return <Navigate to="/login" state={{ from: location }} replace />;
  if (user && user.role_name === 'admin') return <Navigate to="/admin/dashboard" replace />;

  return children;
};

// Root Redirect Helper
const RootRedirect = () => {
  const { isAuthenticated, loading, user } = useAuth();
  if (loading) return <LoadingSpinner message="Starting VoltCraft Portal..." />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user && user.role_name === 'admin') return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/home" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <Routes>
              {/* ADMIN ROUTES */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="orders" element={<AdminOrders />} />
                <Route path="orders/:id" element={<AdminOrderDetails />} />
                <Route path="products" element={<AdminProducts />} />
                <Route path="products/new" element={<AdminAddProduct />} />
                <Route path="categories" element={<AdminCategories />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="department-accounts" element={<AdminDeptAccounts />} />
                <Route path="departments" element={<AdminDepartments />} />
                <Route path="notifications" element={<AdminNotifications />} />
                <Route path="catalog" element={<AdminCatalog />} />
                <Route path="offers" element={<AdminOffers />} />
                <Route path="payment-settings" element={<AdminPaymentSettings />} />
                <Route path="audit-logs" element={<AdminAuditLogs />} />
              </Route>

              {/* CUSTOMER STOREFRONT ROUTES */}
              <Route
                path="*"
                element={
                  <div className="app-container">
                    <Navbar />
                    <main className="main-content">
                      <Routes>
                        <Route path="/" element={<RootRedirect />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Register />} />

                        <Route path="/home" element={<ProtectedCustomerRoute><Home /></ProtectedCustomerRoute>} />
                        <Route path="/categories" element={<ProtectedCustomerRoute><Categories /></ProtectedCustomerRoute>} />
                        <Route path="/category/:categoryId" element={<ProtectedCustomerRoute><CategoryProducts /></ProtectedCustomerRoute>} />
                        <Route path="/products/:productId" element={<ProtectedCustomerRoute><ProductDetails /></ProtectedCustomerRoute>} />
                        <Route path="/cart" element={<ProtectedCustomerRoute><Cart /></ProtectedCustomerRoute>} />
                        <Route path="/checkout" element={<ProtectedCustomerRoute><Checkout /></ProtectedCustomerRoute>} />
                        <Route path="/order-success" element={<ProtectedCustomerRoute><OrderSuccess /></ProtectedCustomerRoute>} />
                        <Route path="/past-orders" element={<ProtectedCustomerRoute><PastOrders /></ProtectedCustomerRoute>} />
                        <Route path="/orders/:id" element={<ProtectedCustomerRoute><OrderDetails /></ProtectedCustomerRoute>} />
                        <Route path="/notifications" element={<ProtectedCustomerRoute><Notifications /></ProtectedCustomerRoute>} />
                        <Route path="/catalog" element={<ProtectedCustomerRoute><Catalog /></ProtectedCustomerRoute>} />
                        <Route path="/profile" element={<ProtectedCustomerRoute><Profile /></ProtectedCustomerRoute>} />

                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </main>
                    <Footer />
                  </div>
                }
              />
            </Routes>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
