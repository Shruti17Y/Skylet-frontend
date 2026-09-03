import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';

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

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner message="Verifying session security..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Root Redirect Helper
const RootRedirect = () => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <LoadingSpinner message="Starting SkyLET Portal..." />;
  return isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Routes>
                  {/* Root */}
                  <Route path="/" element={<RootRedirect />} />

                  {/* Public Auth Routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Register />} />

                  {/* Protected User Routes */}
                  <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                  <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
                  <Route path="/category/:categoryId" element={<ProtectedRoute><CategoryProducts /></ProtectedRoute>} />
                  <Route path="/products/:productId" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
                  <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                  <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                  <Route path="/order-success" element={<ProtectedRoute><OrderSuccess /></ProtectedRoute>} />
                  <Route path="/past-orders" element={<ProtectedRoute><PastOrders /></ProtectedRoute>} />
                  <Route path="/orders/:id" element={<ProtectedRoute><OrderDetails /></ProtectedRoute>} />
                  <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                  <Route path="/catalog" element={<ProtectedRoute><Catalog /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                  {/* Fallback Catch-All */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
