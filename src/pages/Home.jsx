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
      
      {/* ... Hero Section ... */}
      {/* (Hero section unchanged) */}
      <section style={{ 
        height: '90vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '0 5%',
        background: 'url("https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2000") center/cover no-repeat',
        position: 'relative',
        textAlign: 'center'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.4)', backdropFilter: 'grayscale(0.2)' }}></div>
        
        <div style={{ position: 'relative', maxWidth: '900px', zIndex: 1 }}>
          <span style={{ 
            color: 'var(--text-primary)', 
            fontWeight: '500', 
            letterSpacing: '0.4em', 
            textTransform: 'uppercase', 
            marginBottom: '1.5rem', 
            display: 'block',
            fontSize: '0.9rem'
          }}>
            Curated Fine Art
          </span>
          <h1 style={{ fontSize: '5.5rem', lineHeight: '1', marginBottom: '2rem', fontWeight: '400', fontStyle: 'italic' }}>
            Where Tradition Meets <span style={{ fontWeight: '700', fontStyle: 'normal' }}>Contemporary</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem', letterSpacing: '0.02em' }}>
            ArtConnect is a premier destination for discovering and acquiring original masterpieces from the world's most promising talents.
          </p>
          <Link to="/explore">
            <button className="primary" style={{ padding: '1.2rem 3.5rem' }}>View the Collection</button>
          </Link>
        </div>
      </section>

      {/* --- CURATED COLLECTIONS --- */}
      <section className="container" style={{ padding: '8rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>The Autumn Selection</h2>
          <div style={{ width: '60px', height: '2px', background: 'var(--accent-gold)', margin: '0 auto' }}></div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem' }}><h3>Curating...</h3></div>
        ) : (
          <div className="grid">
            {featuredArt.map(art => (
              <div key={art._id} className="gallery-card" style={{ borderBottom: 'none' }}>
                <div style={{ overflow: 'hidden', height: '450px', background: '#f5f5f5', position: 'relative' }}>
                  <Link to={`/artwork/${art._id}`}>
                    <img 
                      src={art.image} 
                      alt={art.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-smooth)', cursor: 'pointer' }} 
                    />
                  </Link>
                  {/* Subtle overlay for "Add to Cart" */}
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '1rem', 
                    right: '1rem', 
                    opacity: 0.9
                  }}>
                    <button 
                      onClick={() => addToCart(art)}
                      style={{ padding: '0.6rem 1.2rem', fontSize: '0.7rem', background: 'rgba(255,255,255,0.9)', borderColor: 'var(--accent-gold)' }}
                    >
                      Collect
                    </button>
                  </div>
                </div>
                <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>{art.category}</p>
                  <Link to={`/artwork/${art._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{art.name}</h3>
                  </Link>
                  <p style={{ color: 'var(--accent-gold)', fontWeight: '600', fontSize: '1.1rem' }}>₹{art.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- ARTIST SPOTLIGHT --- */}
      <section style={{ background: '#1A1A1A', color: 'white', padding: '10rem 0' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8rem', alignItems: 'center' }}>
          <div style={{ height: '600px', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Artist at work" />
          </div>
          <div>
            <span style={{ color: 'var(--accent-gold)', letterSpacing: '0.3em', textTransform: 'uppercase', fontSize: '0.8rem' }}>Creator Spotlight</span>
            <h2 style={{ fontSize: '4rem', margin: '1.5rem 0 2rem', lineHeight: '1.1' }}>Celebrating Cultural <br/> <span style={{ fontStyle: 'italic', fontWeight: '400' }}>Excellence</span></h2>
            <p style={{ fontSize: '1.1rem', color: '#BBB', marginBottom: '3rem', lineHeight: '1.8' }}>
              We believe that every piece of art carries a story, a heritage, and a vision. Join our community of over 500 verified creators and share your journey with collectors worldwide.
            </p>
            <Link to="/register"><button style={{ color: 'white', borderColor: 'white' }}>Become a Partner</button></Link>
          </div>
        </div>
      </section>

      {/* --- NEWSLETTER --- */}
      <section className="container" style={{ padding: '10rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Exclusive Access</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem' }}>Subscribe to receive early access to new collections and private exhibitions.</p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input type="email" placeholder="Your email address" style={{ flex: 1, borderBottom: '2px solid black', borderTop: 'none', borderLeft: 'none', borderRight: 'none' }} />
            <button className="primary" style={{ padding: '1rem 3rem' }}>Join</button>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer style={{ borderTop: '1px solid var(--border-light)', padding: '5rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="serif" style={{ fontSize: '1.5rem' }}>ArtConnect</h3>
          <div style={{ display: 'flex', gap: '4rem' }}>
            <Link to="/explore" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Collections</Link>
            <Link to="/artists" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Artists</Link>
            <Link to="/about" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>About</Link>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>&copy; 2026 ArtConnect Private Gallery</p>
        </div>
      </footer>

    </div>
  );
}

export default Home;