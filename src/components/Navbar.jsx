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
      padding: '1.1rem 2rem', 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
    }}>
      
      <Link to="/" style={{ textDecoration: 'none', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
        <div style={{ 
          width: '36px', 
          height: '36px', 
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-hover) 100%)', 
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.3rem',
          fontWeight: '800',
          color: 'white'
        }}>A</div>
        <h2 style={{ fontSize: '1.35rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em', background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent-primary) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          ArtConnect
        </h2>
      </Link>

      <div style={{ display: 'flex', gap: '5rem', alignItems: 'center' }}>
        <Link to="/explore" style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'var(--transition-smooth)', position: 'relative' }}>
          Collections
          <span style={{ position: 'absolute', bottom: '-4px', left: 0, width: 0, height: '2px', background: 'var(--accent-primary)', transition: 'var(--transition-smooth)' }} className="nav-underline"></span>
        </Link>
        <Link to="/artists" style={{ color: 'var(--text-primary)', fontWeight: '600', fontSize: '0.85rem', letterSpacing: '0.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'var(--transition-smooth)', position: 'relative' }}>
          Creators
          <span style={{ position: 'absolute', bottom: '-4px', left: 0, width: 0, height: '2px', background: 'var(--accent-primary)', transition: 'var(--transition-smooth)' }} className="nav-underline"></span>
        </Link>
        
        <div style={{ display: 'flex', gap: '2.8rem', alignItems: 'center', marginLeft: '2rem', paddingLeft: '2rem', borderLeft: '1px solid var(--border-light)' }}>
          <Link to="/cart" style={{ position: 'relative', color: 'var(--text-primary)', fontSize: '1.15rem', display: 'flex', alignItems: 'center', transition: 'var(--transition-smooth)', padding: '0.5rem' }}>
            <FaShoppingCart />
            {cartCount > 0 && (
              <span style={{ 
                position: 'absolute', 
                top: '-6px', 
                right: '-8px', 
                background: 'var(--accent-primary)', 
                color: 'white', 
                fontSize: '0.65rem', 
                padding: '3px 6px', 
                borderRadius: '3px',
                fontWeight: '700',
                minWidth: '22px',
                textAlign: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.8rem' }}>
              <Link to="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--accent-primary)', fontWeight: '700', fontSize: '0.85rem', textDecoration: 'none', transition: 'var(--transition-smooth)', padding: '0.5rem' }}>
                <FaUser style={{ fontSize: '0.95rem' }} /> 
                <span>{user.name.split(' ')[0]}</span>
              </Link>
              <FaSignOutAlt onClick={handleLogout} style={{ cursor: 'pointer', color: 'var(--text-tertiary)', fontSize: '1rem', transition: 'var(--transition-smooth)', padding: '0.5rem' }} title="Logout" />
            </div>
          ) : (
            <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', fontSize: '1rem', transition: 'var(--transition-smooth)', textDecoration: 'none', fontWeight: '600', padding: '0.5rem' }}>
              <FaUser style={{ fontSize: '0.95rem' }} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
