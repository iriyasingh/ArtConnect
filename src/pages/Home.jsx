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
        height: '92vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0',
        background: 'linear-gradient(135deg, #FEFDF9 0%, #F5F1EA 50%, #E8D4C0 100%)',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.3 }}>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(217, 165, 116, 0.15)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '-50px', left: '10%', width: '250px', height: '250px', background: 'rgba(217, 165, 116, 0.1)', borderRadius: '50%' }}></div>
        </div>
        
        <div style={{ position: 'relative', maxWidth: '900px', zIndex: 1, padding: '0 2rem' }}>
          <div style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: 'rgba(217, 165, 116, 0.15)',
            borderRadius: '50px',
            marginBottom: '2.5rem',
            border: '1px solid rgba(217, 165, 116, 0.3)'
          }}>
            <span style={{ 
              color: 'var(--accent-primary)', 
              fontWeight: '700', 
              letterSpacing: '0.1em', 
              textTransform: 'uppercase', 
              fontSize: '0.7rem'
            }}>
              ✨ Discover Premium Artwork
            </span>
          </div>
          
          <h1 style={{ fontSize: '5.5rem', lineHeight: '1.15', marginBottom: '1.5rem', fontWeight: '800', color: 'var(--text-primary)', letterSpacing: '-0.03em' }}>
            Art For Everyone<span style={{ color: 'var(--accent-primary)' }}>.</span>
          </h1>
          
          <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', marginBottom: '3.5rem', maxWidth: '700px', margin: '0 auto 3.5rem', lineHeight: '1.8', fontWeight: '500' }}>
            Discover unique artworks from talented creators worldwide. Own original pieces that inspire, move, and transform your space.
          </p>
          
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/explore" style={{ textDecoration: 'none' }}>
              <button className="primary" style={{ padding: '1.2rem 3.5rem', fontSize: '0.9rem' }}>Explore Gallery</button>
            </Link>
            <Link to="/artists" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '1.2rem 3.5rem', fontSize: '0.9rem', borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}>Meet Artists</button>
            </Link>
          </div>
          
          <p style={{ marginTop: '3.5rem', fontSize: '0.9rem', color: 'var(--text-tertiary)', fontWeight: '600' }}>💳 Secure checkout • 🌍 Worldwide shipping • 🎨 100% authentic</p>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container" style={{ padding: '8rem 0' }}>
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.5rem', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '3.2rem', fontWeight: '800', color: 'var(--text-primary)' }}>Featured Works</h2>
            <span style={{ fontSize: '1rem', color: 'var(--accent-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em' }}>New Arrivals</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px' }}>Curated selection of exceptional artworks from emerging and established artists</p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}><p style={{ color: 'var(--text-secondary)' }}>Loading artworks...</p></div>
        ) : (
          <div className="grid">
            {featuredArt.map((art, idx) => (
              <div key={art._id} className="gallery-card" style={{ 
                animation: `reveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
                animationDelay: `${idx * 0.1}s`,
                opacity: 0
              }}>
                <div style={{ overflow: 'hidden', height: '450px', background: 'var(--bg-secondary)', position: 'relative', borderRadius: '8px' }}>
                  <Link to={`/artwork/${art._id}`}>
                    <img 
                      src={art.image} 
                      alt={art.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-smooth)', cursor: 'pointer' }} 
                    />
                  </Link>
                  <div style={{ 
                    position: 'absolute', 
                    inset: 0,
                    background: 'rgba(0,0,0,0)',
                    opacity: 0,
                    transition: 'var(--transition-smooth)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '2rem'
                  }} className="image-overlay">
                    <button 
                      onClick={() => addToCart(art)}
                      className="primary"
                      style={{ padding: '1rem', fontSize: '0.8rem', width: '100%' }}
                    >
                      Add to Collection
                    </button>
                  </div>
                </div>
                <div style={{ padding: '2rem 0' }}>
                  <p style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem', fontWeight: '700' }}>{art.category}</p>
                  <Link to={`/artwork/${art._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{ fontSize: '1.35rem', marginBottom: '0.5rem', fontWeight: '700' }}>{art.name}</h3>
                  </Link>
                  <p style={{ color: 'var(--accent-primary)', fontWeight: '800', fontSize: '1.1rem' }}>₹{art.price.toLocaleString()}</p>
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
