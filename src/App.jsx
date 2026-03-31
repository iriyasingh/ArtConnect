import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ArtworkDetail from "./pages/ArtworkDetail";
import Cart from "./pages/Cart";
import Artists from "./pages/Artists";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 4000);
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    showToast(`${item.name} added to your collection.`);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => (item._id || item.id) !== id));
  };

  return (
    <BrowserRouter>
      <Navbar cartCount={cart.length} />

      {/* --- Toast Notification --- */}
      {toast.show && (
        <div style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          background: 'white',
          color: 'var(--text-primary)',
          padding: '1.2rem 2.5rem',
          border: '1px solid var(--accent-gold)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          zIndex: 10000,
          boxShadow: 'var(--shadow-hover)',
          animation: 'reveal 0.4s ease-out forwards'
        }}>
          <FaCheckCircle style={{ color: '#10b981' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{toast.message}</span>
        </div>
      )}

      <div style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/explore" element={<Explore addToCart={addToCart} />} />
          <Route path="/artwork/:id" element={<ArtworkDetail addToCart={addToCart} showToast={showToast} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;