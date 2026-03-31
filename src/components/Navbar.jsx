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
      background: 'var(--bg-primary)', 
      borderBottom: '1px solid var(--border-light)', 
      padding: '1.25rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: 'var(--shadow-subtle)'
    }}>
      
      <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ 
          width: '32px', 
          height: '32px', 
          background: 'var(--accent-primary)', 
          borderRadius: '2px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          fontWeight: '700',
          color: 'white'
        }}>A</div>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0, letterSpacing: '-0.01em' }}>
          ArtConnect
        </h2>
      </Link>

      <div style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
        <Link to="/explore" style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'var(--transition-smooth)' }}>Collections</Link>
        <Link to="/artists" style={{ color: 'var(--text-primary)', fontWeight: '500', fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'var(--transition-smooth)' }}>Creators</Link>
        
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center', marginLeft: '1.5rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border-light)' }}>
          <Link to="/cart" style={{ position: 'relative', color: 'var(--text-primary)', fontSize: '1.1rem', display: 'flex', alignItems: 'center', transition: 'var(--transition-smooth)' }}>
            <FaShoppingCart />
            {cartCount > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: '-8px', 
                right: '-10px', 
                background: 'var(--accent-primary)', 
                color: 'white', 
                fontSize: '0.6rem', 
                padding: '2px 5px', 
                borderRadius: '2px',
                fontWeight: '600',
                minWidth: '20px',
                textAlign: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--accent-primary)', fontWeight: '600', fontSize: '0.8rem', textDecoration: 'none', transition: 'var(--transition-smooth)' }}>
                <FaUser style={{ fontSize: '0.9rem' }} /> 
                <span>{user.name.split(' ')[0]}</span>
              </Link>
              <FaSignOutAlt onClick={handleLogout} style={{ cursor: 'pointer', color: 'var(--text-tertiary)', fontSize: '0.95rem', transition: 'var(--transition-smooth)' }} title="Logout" />
            </div>
          ) : (
            <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-primary)', fontSize: '1rem', transition: 'var(--transition-smooth)', textDecoration: 'none' }}>
              <FaUser style={{ fontSize: '0.9rem' }} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
