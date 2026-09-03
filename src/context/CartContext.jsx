import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartService } from '../api/services';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [], total_items: 0, subtotal: 0, final_total: 0 });
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart({ items: [], total_items: 0, subtotal: 0, final_total: 0 });
      return;
    }
    try {
      setLoading(true);
      const res = await cartService.getCart();
      if (res.success) {
        setCart({
          items: res.items || [],
          total_items: res.total_items || 0,
          subtotal: res.subtotal || 0,
          final_total: res.final_total || 0,
        });
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (productId, quantity) => {
    const res = await cartService.addToCart(productId, quantity);
    if (res.success) {
      await fetchCart();
    }
    return res;
  };

  const updateQuantity = async (cartItemId, quantity) => {
    const res = await cartService.updateQuantity(cartItemId, quantity);
    if (res.success) {
      await fetchCart();
    }
    return res;
  };

  const removeFromCart = async (cartItemId) => {
    const res = await cartService.removeFromCart(cartItemId);
    if (res.success) {
      await fetchCart();
    }
    return res;
  };

  const clearCart = async () => {
    const res = await cartService.clearCart();
    if (res.success) {
      setCart({ items: [], total_items: 0, subtotal: 0, final_total: 0 });
    }
    return res;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount: cart.total_items,
        loading,
        fetchCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
