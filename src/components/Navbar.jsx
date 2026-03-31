import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

function Navbar({ cartCount }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) setUser(JSON.parse(savedUser));
      else setUser(null);
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav style={{ 
      background: 'white', 
      borderBottom: '1px solid var(--border-light)', 
      padding: '1.5rem 4rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: 'var(--shadow-subtle)'
    }}>
      
      <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-primary)' }}>
        <h2 className="serif" style={{ fontSize: '2rem', letterSpacing: '0.05em', margin: 0 }}>
          ArtConnect
        </h2>
      </Link>

      <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
        <Link to="/explore" style={{ color: 'var(--text-primary)', fontWeight: '500', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.15em' }}>Collections</Link>
        <Link to="/artists" style={{ color: 'var(--text-primary)', fontWeight: '500', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.15em' }}>Creators</Link>
        
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', marginLeft: '1rem' }}>
          <Link to="/cart" style={{ position: 'relative', color: 'var(--text-primary)' }}>
            <FaShoppingCart style={{ fontSize: '1.2rem' }} />
            {cartCount > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: '-10px', 
                right: '-10px', 
                background: 'var(--accent-gold)', 
                color: 'white', 
                fontSize: '0.65rem', 
                padding: '2px 6px', 
                borderRadius: '50%',
                fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-gold)', fontWeight: '600' }}>
                <FaUser /> {user.name.split(' ')[0]}
              </Link>
              <FaSignOutAlt onClick={handleLogout} style={{ cursor: 'pointer', color: 'var(--text-muted)' }} title="Logout" />
            </div>
          ) : (
            <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)' }}>
              <FaUser style={{ fontSize: '1.1rem' }} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;