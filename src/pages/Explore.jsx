import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaFilter } from "react-icons/fa";

function Explore({ addToCart }) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/api/artworks")
      .then(res => res.json())
      .then(data => {
        setArtworks(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching artworks:", err);
        setLoading(false);
      });
  }, []);

  const categories = ["All", "Painting", "Sketching", "Digital Art", "Photography", "Sculpture"];

  const filteredArt = filter === "All" 
    ? artworks 
    : artworks.filter(art => art.category === filter);

  return (
    <div className="container animate-reveal" style={{ padding: '5rem 0' }}>
      
      <div style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: '700' }}>Explore Artworks</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Browse {artworks.length} original works from artists worldwide</p>
      </div>
      
      <div style={{ marginBottom: '3rem' }}>
        <p style={{ fontSize: '0.85rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-tertiary)', marginBottom: '1.5rem' }}>Filter by category</p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              style={{ 
                padding: '0.6rem 1.4rem', 
                fontSize: '0.7rem',
                fontWeight: '500',
                background: filter === cat ? 'var(--text-primary)' : 'var(--bg-secondary)',
                color: filter === cat ? 'white' : 'var(--text-primary)',
                borderColor: filter === cat ? 'var(--text-primary)' : 'var(--border-medium)',
                borderRadius: '4px'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '8rem 2rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Loading artworks...</p>
        </div>
      ) : (
        <div className="grid">
          {filteredArt.map(art => (
            <div key={art._id} className="gallery-card">
              <div style={{ overflow: 'hidden', height: '400px', background: 'var(--bg-secondary)', position: 'relative', borderRadius: '4px' }}>
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
                  background: 'rgba(0, 0, 0, 0)',
                  opacity: 0,
                  transition: 'var(--transition-smooth)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '1.5rem',
                  cursor: 'pointer'
                }} className="image-overlay">
                  <button 
                    onClick={() => addToCart(art)} 
                    className="primary" 
                    style={{ padding: '0.7rem 1.4rem', fontSize: '0.7rem', width: '100%' }}
                  >
                    Add to Collection
                  </button>
                </div>
              </div>

              <div style={{ padding: '1.5rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{ flex: 1 }}>
                    <Link to={`/artwork/${art._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.3rem', fontWeight: '600' }}>{art.name}</h3>
                    </Link>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{art.artist?.name || 'Unknown Artist'}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600' }}>{art.category}</span>
                  <p style={{ fontWeight: '700', color: 'var(--accent-primary)', fontSize: '0.95rem' }}>₹{art.price.toLocaleString()}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredArt.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem' }}>No artworks found in this category.</p>
          <button onClick={() => setFilter("All")} style={{ marginTop: '1rem' }}>View All Works</button>
        </div>
      )}
    </div>
  );
}

export default Explore;
