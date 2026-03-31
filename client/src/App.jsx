import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ArtworkDetail from "./pages/ArtworkDetail";
import Cart from "./pages/Cart";
import Artists from "./pages/Artists";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Toast from "./components/Toast";
import ProtectedRoute from "./components/ProtectedRoute";

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

      <Toast message={toast.show ? toast.message : ""} />

      <main className="min-h-[calc(100vh-72px)]">
        <Routes>
          <Route path="/" element={<Home addToCart={addToCart} />} />
          <Route path="/explore" element={<Explore addToCart={addToCart} />} />
          <Route path="/artwork/:id" element={<ArtworkDetail addToCart={addToCart} />} />
          <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/about" element={<About />} />
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
      </main>
    </BrowserRouter>
  );
}

export default App;