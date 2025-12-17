// src/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { cartAPI, mockAPI } from './api'; // This should now work
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isBackendActive, setIsBackendActive] = useState(true);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    setLoading(true);
    try {
      const data = await cartAPI.getCart();
      setCart(data);
    } catch (error) {
      console.error('Failed to load cart:', error);
      // Fallback to mock data
      setCart(mockAPI.mockCart);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product, quantity = 1) => {
    try {
      const data = await cartAPI.addToCart(product.id, quantity);
      setCart(data);
      toast.success(`Added ${product.name} to cart!`);
      return { success: true };
    } catch (error) {
      toast.error(error.message || 'Failed to add to cart');
      return { success: false, error: error.message };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      // Find the item in cart
      const item = cart.items.find(item => item.productId === productId);
      if (item) {
        const data = await cartAPI.removeFromCart(item.id);
        setCart(data);
        toast.success('Item removed from cart');
      }
      return { success: true };
    } catch (error) {
      toast.error(error.message || 'Failed to remove item');
      return { success: false, error: error.message };
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const item = cart.items.find(item => item.productId === productId);
      if (item) {
        const data = await cartAPI.updateCartItem(item.id, quantity);
        setCart(data);
      }
      return { success: true };
    } catch (error) {
      toast.error(error.message || 'Failed to update quantity');
      return { success: false, error: error.message };
    }
  };

  const clearCart = async () => {
    try {
      const data = await cartAPI.clearCart();
      setCart(data);
      toast.success('Cart cleared');
      return { success: true };
    } catch (error) {
      toast.error(error.message || 'Failed to clear cart');
      return { success: false, error: error.message };
    }
  };

  const value = {
    cartItems: cart.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems: () => cart.totalItems,
    getTotalPrice: () => cart.totalPrice,
    loading,
    cart,
  };

  return (
    <CartContext.Provider value={value}>
      {!loading && children}
    </CartContext.Provider>
  );
};