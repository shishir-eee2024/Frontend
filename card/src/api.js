// api.js
import axios from 'axios';

const API_BASE_URL = 'http://13.204.83.174:5000/api'; // Change this to your backend URL

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  // User registration
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  // User login
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  // Get current user
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user data' };
    }
  },

  // Logout
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Logout failed' };
    }
  },
};

// Products API
export const productsAPI = {
  // Get all products
  getAllProducts: async (params = {}) => {
    try {
      const response = await api.get('/products', { params });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch products' };
    }
  },

  // Get single product
  getProduct: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch product' };
    }
  },

  // Create product (admin only)
  createProduct: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create product' };
    }
  },

  // Update product (admin only)
  updateProduct: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update product' };
    }
  },

  // Delete product (admin only)
  deleteProduct: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete product' };
    }
  },

  // Search products
  searchProducts: async (query) => {
    try {
      const response = await api.get('/products', { params: { search: query } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Search failed' };
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await api.get('/products', { params: { category } });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch category products' };
    }
  },
};

// Cart API
export const cartAPI = {
  // Get user cart
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response.data;
    } catch (error) {
      // Return empty cart if 404 (user might not have a cart yet)
      if (error.response?.status === 404) {
        return { success: true, cart: { items: [], totalItems: 0, totalPrice: 0 } };
      }
      throw error.response?.data || { message: 'Failed to fetch cart' };
    }
  },

  // Add item to cart
  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await api.post('/cart/add', { productId, quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to add to cart' };
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId, quantity) => {
    try {
      const response = await api.put(`/cart/update/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update cart item' };
    }
  },

  // Remove item from cart
  removeFromCart: async (itemId) => {
    try {
      const response = await api.delete(`/cart/remove/${itemId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to remove from cart' };
    }
  },

  // Clear cart
  clearCart: async () => {
    try {
      const response = await api.delete('/cart/clear');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to clear cart' };
    }
  },
};

// Orders API
export const ordersAPI = {
  // Create order
  createOrder: async (orderData) => {
    try {
      const response = await api.post('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to create order' };
    }
  },

  // Get user orders
  getUserOrders: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch orders' };
    }
  },

  // Get single order
  getOrder: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch order' };
    }
  },

  // Cancel order
  cancelOrder: async (id) => {
    try {
      const response = await api.put(`/orders/${id}/cancel`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to cancel order' };
    }
  },
};

// Users API (Admin only)
export const usersAPI = {
  // Get all users
  getAllUsers: async () => {
    try {
      const response = await api.get('/admin/users');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch users' };
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await api.get(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch user' };
    }
  },

  // Update user
  updateUser: async (id, userData) => {
    try {
      const response = await api.put(`/admin/users/${id}`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update user' };
    }
  },

  // Delete user
  deleteUser: async (id) => {
    try {
      const response = await api.delete(`/admin/users/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete user' };
    }
  },
};

// Contact API
export const contactAPI = {
  // Submit contact form
  submitContact: async (contactData) => {
    try {
      const response = await api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to submit contact form' };
    }
  },
};

// Health Check API
export const healthAPI = {
  // Check server health
  checkHealth: async () => {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Server is not responding' };
    }
  },
};

// Seed Data API (Development only)
export const seedAPI = {
  // Seed sample data
  seedData: async () => {
    try {
      const response = await api.post('/seed');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to seed data' };
    }
  },
};

// Mock API for development/fallback
export const mockAPI = {
  // Mock login for demo
  mockLogin: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'demo@example.com' && password === 'password') {
          const userData = {
            success: true,
            token: 'demo-token-123',
            user: {
              id: 1,
              name: 'Demo User',
              email: 'demo@example.com',
              role: 'user'
            }
          };
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  // Mock cart for demo
  mockCart: {
    items: [
      {
        id: 1,
        productId: 1,
        name: 'MacBook Pro',
        price: 104999,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop'
      },
      {
        id: 2,
        productId: 2,
        name: 'Wireless Headphones',
        price: 15999,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop'
      }
    ],
    totalItems: 3,
    totalPrice: 136997
  },

  // Mock products for demo
  mockProducts: [
    {
      id: 1,
      name: 'MacBook Pro',
      description: 'Apple MacBook Pro with M2 chip, 16GB RAM, 512GB SSD',
      price: 104999,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop',
      stock: 10,
      rating: 4.8
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      description: 'Noise cancelling wireless headphones with 30hr battery',
      price: 15999,
      category: 'Electronics',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop',
      stock: 25,
      rating: 4.5
    },
    {
      id: 3,
      name: 'Cotton T-Shirt',
      description: 'Premium cotton t-shirt with comfortable fit',
      price: 899,
      category: 'Fashion',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
      stock: 100,
      rating: 4.2
    }
  ]
};

// Check if backend is available
export const checkBackendAvailability = async () => {
  try {
    await healthAPI.checkHealth();
    return true;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    return false;
  }
};

// Smart API that falls back to mock data if backend is unavailable
export const smartAPI = {
  auth: {
    login: async (email, password) => {
      const isBackendAvailable = await checkBackendAvailability();
      if (isBackendAvailable) {
        return authAPI.login(email, password);
      } else {
        return mockAPI.mockLogin(email, password);
      }
    },
    register: async (userData) => {
      const isBackendAvailable = await checkBackendAvailability();
      if (isBackendAvailable) {
        return authAPI.register(userData);
      } else {
        // Mock registration
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              success: true,
              token: 'new-token-' + Date.now(),
              user: {
                id: Date.now(),
                name: userData.name,
                email: userData.email,
                role: 'user'
              }
            });
          }, 1000);
        });
      }
    }
  },

  cart: {
    getCart: async () => {
      const isBackendAvailable = await checkBackendAvailability();
      if (isBackendAvailable) {
        return cartAPI.getCart();
      } else {
        // Get from localStorage or return mock
        const savedCart = localStorage.getItem('localCart');
        if (savedCart) {
          return { success: true, cart: JSON.parse(savedCart) };
        }
        return { success: true, cart: mockAPI.mockCart };
      }
    },

    addToCart: async (productId, quantity = 1) => {
      const isBackendAvailable = await checkBackendAvailability();
      
      if (isBackendAvailable) {
        return cartAPI.addToCart(productId, quantity);
      } else {
        // Mock implementation for offline/local storage
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            try {
              // Get current cart from localStorage
              const savedCart = localStorage.getItem('localCart');
              let cart = savedCart ? JSON.parse(savedCart) : { items: [], totalItems: 0, totalPrice: 0 };
              
              // Find product in mock products
              const product = mockAPI.mockProducts.find(p => p.id === productId);
              if (!product) {
                reject(new Error('Product not found'));
                return;
              }
              
              // Check if already in cart
              const existingItem = cart.items.find(item => item.productId === productId);
              
              if (existingItem) {
                // Update quantity
                existingItem.quantity += quantity;
              } else {
                // Add new item
                cart.items.push({
                  id: Date.now(),
                  productId: product.id,
                  name: product.name,
                  price: product.price,
                  quantity: quantity,
                  image: product.image
                });
              }
              
              // Update totals
              cart.totalItems += quantity;
              cart.totalPrice += product.price * quantity;
              
              // Save to localStorage
              localStorage.setItem('localCart', JSON.stringify(cart));
              
              resolve({
                success: true,
                message: 'Item added to cart'
              });
            } catch (error) {
              reject(error);
            }
          }, 500);
        });
      }
    }
  },

  products: {
    getAllProducts: async (params = {}) => {
      const isBackendAvailable = await checkBackendAvailability();
      if (isBackendAvailable) {
        return productsAPI.getAllProducts(params);
      } else {
        // Return mock products
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              success: true,
              products: mockAPI.mockProducts,
              total: mockAPI.mockProducts.length,
              page: 1,
              totalPages: 1
            });
          }, 500);
        });
      }
    }
  }
};

// Export all APIs
export default {
  api,
  auth: authAPI,
  products: productsAPI,
  cart: cartAPI,
  orders: ordersAPI,
  users: usersAPI,
  contact: contactAPI,
  health: healthAPI,
  seed: seedAPI,
  mock: mockAPI,
  smart: smartAPI
};