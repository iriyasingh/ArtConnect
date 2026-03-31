import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaStar, FaCheckCircle } from "react-icons/fa";

function Home({ addToCart }) {
  // Mock Data
  const mockArtworks = [
    {
      _id: "1",
      name: "Sunset Dreams",
      artist: { name: "Elena Rodriguez" },
      category: "Painting",
      price: 45000,
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop"
    },
    {
      _id: "2",
      name: "Urban Pulse",
      artist: { name: "Marcus Chen" },
      category: "Digital Art",
      price: 32000,
      image: "https://images.unsplash.com/photo-1578401494619-246883941f1d?w=500&h=500&fit=crop"
    },
    {
      _id: "3",
      name: "Nature's Whisper",
      artist: { name: "Sophie Laurent" },
      category: "Photography",
      price: 28000,
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop"
    },
    {
      _id: "4",
      name: "Abstract Harmony",
      artist: { name: "James Mitchell" },
      category: "Sculpture",
      price: 55000,
      image: "https://images.unsplash.com/photo-1561214115-6d3dedf3cfb6?w=500&h=500&fit=crop"
    },
    {
      _id: "5",
      name: "Ocean Serenity",
      artist: { name: "Amara Okonkwo" },
      category: "Painting",
      price: 38000,
      image: "https://images.unsplash.com/photo-1475066847556-880ae5922d6f?w=500&h=500&fit=crop"
    },
    {
      _id: "6",
      name: "Modern Reflections",
      artist: { name: "David Park" },
      category: "Digital Art",
      price: 41000,
      image: "https://images.unsplash.com/photo-1538527527ff-6b5a6f81a87c?w=500&h=500&fit=crop"
    },
    {
      _id: "7",
      name: "Golden Hour",
      artist: { name: "Isabella Santos" },
      category: "Photography",
      price: 35000,
      image: "https://images.unsplash.com/photo-1501888691938-d2a5ad0c3fe7?w=500&h=500&fit=crop"
    },
    {
      _id: "8",
      name: "Timeless Forms",
      artist: { name: "Johannes Berg" },
      category: "Sculpture",
      price: 62000,
      image: "https://images.unsplash.com/photo-1578375093859-00a9a08af4e2?w=500&h=500&fit=crop"
    }
  ];

  const mockArtists = [
    {
      _id: "1",
      name: "Elena Rodriguez",
      location: "Barcelona, Spain",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
    },
    {
      _id: "2",
      name: "Marcus Chen",
      location: "Shanghai, China",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
    },
    {
      _id: "3",
      name: "Sophie Laurent",
      location: "Paris, France",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
    },
    {
      _id: "4",
      name: "James Mitchell",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop"
    }
  ];

  const [featuredArt, setFeaturedArt] = useState(mockArtworks.slice(0, 6));

  return (
    <div className="animate-reveal">
      
      {/* Hero Section */}
      <section style={{ 
        height: '85vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem',
        background: 'linear-gradient(135deg, #FEFDF9 0%, #F5F1EA 50%, #E8D4C0 100%)',
        position: 'relative',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
          <div style={{ position: 'absolute', top: '10%', right: '10%', width: '400px', height: '400px', background: 'rgba(217, 165, 116, 0.1)', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: '350px', height: '350px', background: 'rgba(217, 165, 116, 0.08)', borderRadius: '50%' }}></div>
        </div>
        
        <div style={{ position: 'relative', maxWidth: '900px', zIndex: 1 }}>
          <span style={{ 
            display: 'inline-block',
            padding: '0.7rem 2rem',
            background: 'rgba(217, 165, 116, 0.2)',
            borderRadius: '50px',
            marginBottom: '2rem',
            border: '1.5px solid var(--accent-primary)',
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--accent-dark)'
          }}>
            ✨ Discover Premium Artwork
          </span>
          
          <h1 style={{ fontSize: '5rem', lineHeight: '1.2', marginBottom: '1.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            Authentic Art<br/>From Global Creators
          </h1>
          
          <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
            Discover handpicked artworks from talented creators worldwide. Own original pieces that inspire and transform your space.
          </p>
          
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/explore" style={{ textDecoration: 'none' }}>
              <button className="primary" style={{ padding: '1.2rem 3.5rem', fontSize: '0.9rem' }}>
                Explore Gallery
              </button>
            </Link>
            <Link to="/artists" style={{ textDecoration: 'none' }}>
              <button style={{ padding: '1.2rem 3.5rem', fontSize: '0.9rem', borderColor: 'var(--accent-primary)', color: 'var(--accent-primary)' }}>
                Meet Artists
              </button>
            </Link>
          </div>
          
          <p style={{ marginTop: '4rem', fontSize: '0.9rem', color: 'var(--text-tertiary)', fontWeight: '600' }}>
            ✓ Verified Artists • ✓ Authentic Works • ✓ Secure Checkout
          </p>
        </div>
      </section>

      {/* Featured Works Section */}
      <section className="container" style={{ padding: '8rem 0' }}>
        <div style={{ marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
            Featured Collection
          </span>
          <h2 style={{ fontSize: '3rem', marginTop: '0.5rem', marginBottom: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            Trending Artworks
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '500px' }}>
            Explore our curated selection of exceptional pieces loved by collectors
          </p>
        </div>

        <div className="grid-3">
          {featuredArt.map((art) => (
            <div key={art._id} className="product-card">
              <div style={{ position: 'relative', overflow: 'hidden', height: '320px' }}>
                <img src={art.image} alt={art.name} />
                <div style={{ 
                  position: 'absolute', 
                  top: '1rem', 
                  right: '1rem',
                  background: 'var(--accent-primary)',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  fontSize: '0.7rem',
                  fontWeight: '700'
                }}>
                  {art.category}
                </div>
              </div>
              <div style={{ padding: '2rem' }}>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600' }}>
                  by {art.artist.name}
                </p>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {art.name}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                    ₹{art.price.toLocaleString()}
                  </span>
                  <button 
                    onClick={() => addToCart(art)}
                    style={{ padding: '0.6rem 1.4rem', fontSize: '0.7rem', borderRadius: '6px', border: '1.5px solid var(--accent-primary)', background: 'transparent', color: 'var(--accent-primary)', fontWeight: '700', cursor: 'pointer', transition: 'var(--transition-smooth)' }}
                    onMouseEnter={(e) => { e.target.style.background = 'var(--accent-primary)'; e.target.style.color = 'white'; }}
                    onMouseLeave={(e) => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--accent-primary)'; }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '4rem' }}>
          <Link to="/explore" style={{ textDecoration: 'none' }}>
            <button className="primary" style={{ padding: '1rem 3rem' }}>
              View All Works <FaArrowRight style={{ marginLeft: '0.5rem' }} />
            </button>
          </Link>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="container" style={{ padding: '8rem 0' }}>
        <div style={{ marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
            Creator Spotlight
          </span>
          <h2 style={{ fontSize: '3rem', marginTop: '0.5rem', marginBottom: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            Meet the Artists
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '500px' }}>
            Talented creators from around the world sharing their unique vision
          </p>
        </div>

        <div className="grid-3">
          {mockArtists.map((artist) => (
            <Link key={artist._id} to={`/artists`} style={{ textDecoration: 'none' }}>
              <div className="artist-card">
                <img src={artist.image} alt={artist.name} />
                <div style={{ padding: '2rem' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {artist.name}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    📍 {artist.location}
                  </p>
                  <button style={{ width: '100%', padding: '0.8rem', fontSize: '0.8rem', fontWeight: '600' }}>
                    View Portfolio
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Why ArtConnect Section */}
      <section style={{ background: 'var(--bg-secondary)', padding: '6rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.8rem', marginBottom: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              Why Choose ArtConnect
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
              We're committed to supporting artists and delivering exceptional art to collectors
            </p>
          </div>

          <div className="grid-3">
            {[
              { icon: '🎨', title: 'Verified Artists', desc: 'Only authenticated creators share their work' },
              { icon: '✓', title: 'Authentic Works', desc: 'Every piece is original and verified' },
              { icon: '🚚', title: 'Safe Delivery', desc: 'Insured shipping worldwide' }
            ].map((feature, idx) => (
              <div key={idx} className="feature-card">
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{feature.icon}</div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.8rem', fontWeight: '700' }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
          Stay Updated
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', maxWidth: '600px', margin: '0 auto 2.5rem' }}>
          Get notified about new artworks, artist launches, and exclusive collector benefits
        </p>
        <form style={{ display: 'flex', gap: '1rem', maxWidth: '500px', margin: '0 auto', flexDirection: 'row' }}>
          <input 
            type="email" 
            placeholder="Enter your email" 
            style={{ flex: 1, borderRadius: '6px' }}
            required 
          />
          <button className="primary" style={{ padding: '1.1rem 2.5rem', whiteSpace: 'nowrap', fontSize: '0.85rem' }}>
            Subscribe
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-light)', padding: '4rem 0 2rem' }}>
        <div className="container">
          <div className="grid-3" style={{ marginBottom: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                ArtConnect
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                Connecting artists with collectors worldwide through authentic, original artwork.
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                Explore
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li><Link to="/explore" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Collections</Link></li>
                <li><Link to="/artists" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Creators</Link></li>
                <li><Link to="/cart" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>My Collection</Link></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
                Support
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Contact Us</a></li>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>FAQ</a></li>
                <li><a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem' }}>© 2026 ArtConnect. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', textDecoration: 'none' }}>Terms</a>
              <a href="#" style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', textDecoration: 'none' }}>Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
