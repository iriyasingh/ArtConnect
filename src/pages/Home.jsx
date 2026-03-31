import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function Home({ addToCart }) {
  const [featuredArt, setFeaturedArt] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/artworks")
      .then(res => res.json())
      .then(data => {
        setFeaturedArt(data.data.slice(0, 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="animate-reveal">
      
      {/* Hero Section */}
      <section style={{ 
        height: '85vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0',
        background: 'linear-gradient(135deg, var(--bg-secondary) 0%, #F0EEE8 100%)',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        
        <div style={{ position: 'relative', maxWidth: '820px', zIndex: 1, padding: '0 2rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.5rem 1.5rem',
            background: 'var(--accent-light)',
            borderRadius: '4px',
            marginBottom: '2rem'
          }}>
            <span style={{ 
              color: 'var(--accent-primary)', 
              fontWeight: '600', 
              letterSpacing: '0.08em', 
              textTransform: 'uppercase', 
              fontSize: '0.75rem'
            }}>
              Discover Original Art
            </span>
          </div>
          
          <h1 style={{ fontSize: '4.5rem', lineHeight: '1.1', marginBottom: '1.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
            Connect with <span style={{ color: 'var(--accent-primary)' }}>Authentic</span> Art
          </h1>
          
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '620px', margin: '0 auto 3rem', lineHeight: '1.7' }}>
            Explore handpicked collections from talented artists worldwide. Buy original artwork directly from creators and support the art community.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/explore" style={{ textDecoration: 'none' }}>
              <button className="primary" style={{ padding: '1.1rem 3rem', fontSize: '0.85rem' }}>Browse Collections</button>
            </Link>
            <Link to="/artists" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '1.1rem 3rem', fontSize: '0.85rem' }}>Meet Creators</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container" style={{ padding: '6rem 0' }}>
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>Featured Works</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Discover the latest additions to our collection</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}><p style={{ color: 'var(--text-secondary)' }}>Loading artworks...</p></div>
        ) : (
          <div className="grid">
            {featuredArt.map(art => (
              <div key={art._id} className="gallery-card">
                <div style={{ overflow: 'hidden', height: '420px', background: 'var(--bg-secondary)', position: 'relative', borderRadius: '4px' }}>
                  <Link to={`/artwork/${art._id}`}>
                    <img 
                      src={art.image} 
                      alt={art.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-smooth)', cursor: 'pointer' }} 
                    />
                  </Link>
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '1rem', 
                    right: '1rem',
                    opacity: 0
                  }}>
                    <button 
                      onClick={() => addToCart(art)}
                      className="primary"
                      style={{ padding: '0.7rem 1.4rem', fontSize: '0.7rem' }}
                    >
                      Collect
                    </button>
                  </div>
                </div>
                <div style={{ padding: '1.5rem 0' }}>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem', fontWeight: '600' }}>{art.category}</p>
                  <Link to={`/artwork/${art._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', fontWeight: '600' }}>{art.name}</h3>
                  </Link>
                  <p style={{ color: 'var(--accent-primary)', fontWeight: '700', fontSize: '1rem' }}>₹{art.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Creator Spotlight */}
      <section style={{ background: 'var(--bg-tertiary)', color: 'var(--text-inverse)', padding: '8rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          <div style={{ height: '550px', overflow: 'hidden', borderRadius: '4px' }}>
            <img src="https://images.unsplash.com/photo-1561214115-6d3dedf3cfb6?q=80&w=1000" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Artist at work" />
          </div>
          <div>
            <div style={{ display: 'inline-block', padding: '0.5rem 1.2rem', background: 'rgba(201, 160, 99, 0.2)', borderRadius: '4px', marginBottom: '2rem' }}>
              <span style={{ color: 'var(--accent-light)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: '0.7rem', fontWeight: '600' }}>For Artists</span>
            </div>
            <h2 style={{ fontSize: '3rem', margin: '0 0 1.5rem', lineHeight: '1.2', fontWeight: '700' }}>Share Your Creativity</h2>
            <p style={{ fontSize: '1rem', color: '#C0C0C0', marginBottom: '2rem', lineHeight: '1.8' }}>
              Join our thriving community of creators. Showcase your work to a global audience of art collectors and enthusiasts.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '3rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.95rem' }}>
                <span style={{ width: '4px', height: '4px', background: 'var(--accent-primary)', borderRadius: '50%' }}></span>
                Fair commission rates
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.95rem' }}>
                <span style={{ width: '4px', height: '4px', background: 'var(--accent-primary)', borderRadius: '50%' }}></span>
                Direct access to collectors
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.95rem' }}>
                <span style={{ width: '4px', height: '4px', background: 'var(--accent-primary)', borderRadius: '50%' }}></span>
                Complete creative control
              </li>
            </ul>
            <Link to="/register" style={{ textDecoration: 'none' }}><button style={{ color: 'white', borderColor: 'white', background: 'transparent' }}>Become a Creator</button></Link>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="container" style={{ padding: '8rem 0', textAlign: 'center' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem', fontWeight: '700' }}>Stay Updated</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', fontSize: '1rem', lineHeight: '1.6' }}>Receive curated updates on new artworks, artist launches, and exclusive collector benefits.</p>
          <form onSubmit={(e) => { e.preventDefault(); }} style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            <input type="email" placeholder="Enter your email" style={{ flex: 1 }} required />
            <button className="primary" style={{ padding: '1rem 2.5rem', whiteSpace: 'nowrap' }}>Subscribe</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border-light)', background: 'var(--bg-secondary)', padding: '4rem 0 2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1.5rem' }}>ARTCONNECT</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.7' }}>Connecting artists with collectors worldwide through authentic, original artwork.</p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.5rem' }}>Explore</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><Link to="/explore" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', transition: 'var(--transition-smooth)' }}>Collections</Link></li>
                <li><Link to="/artists" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', transition: 'var(--transition-smooth)' }}>Creators</Link></li>
                <li><Link to="/cart" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', transition: 'var(--transition-smooth)' }}>My Collection</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.5rem' }}>Support</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', transition: 'var(--transition-smooth)' }}>Contact</a></li>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', transition: 'var(--transition-smooth)' }}>FAQ</a></li>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', transition: 'var(--transition-smooth)' }}>Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem' }}>&copy; 2026 ArtConnect. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textDecoration: 'none' }}>Terms</a>
              <a href="#" style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textDecoration: 'none' }}>Privacy</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default Home;
