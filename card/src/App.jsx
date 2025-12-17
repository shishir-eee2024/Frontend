import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './CartContext.jsx'; 
import Navigation from './Navigation.jsx';
import HomePage from './HomePage.jsx';
import Products from './Products.jsx';
import Cart from './Cart.jsx';
import Contact from './Contact.jsx';
import ProductDetails from './ProductDetails.jsx';
import "tailwindcss";
import Login from './Login.jsx';
import Register from './Register.jsx';

function App() {
  return (
    <CartProvider> 
      <BrowserRouter>
        <div className="App">
          <Navigation />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;