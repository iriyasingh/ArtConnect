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
    <div className="container animate-reveal" style={{ padding: '4rem 0' }}>
      
      <div style={{ marginBottom: '5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '3.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>Explore Gallery</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>{artworks.length} artworks from talented creators</p>
          </div>
          <span style={{ background: 'var(--bg-accent)', color: 'var(--text-primary)', padding: '0.6rem 1.5rem', borderRadius: '50px', fontSize: '0.8rem', fontWeight: '700' }}>
            {filteredArt.length} Works
          </span>
        </div>
      </div>
      
      <div style={{ marginBottom: '4rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <FaFilter size={12} /> Filter by category
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              style={{ 
                padding: '0.65rem 1.6rem', 
                fontSize: '0.75rem',
                fontWeight: '600',
                background: filter === cat ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                color: filter === cat ? 'white' : 'var(--text-primary)',
                borderColor: filter === cat ? 'var(--accent-primary)' : 'var(--border-medium)',
                borderRadius: '6px'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Loading artworks...</p>
        </div>
      ) : (
        <div className="grid">
          {filteredArt.map((art, idx) => (
            <div key={art._id} className="gallery-card" style={{ 
              animation: `reveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
              animationDelay: `${idx * 0.08}s`,
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
                  background: 'rgba(0, 0, 0, 0)',
                  opacity: 0,
                  transition: 'var(--transition-smooth)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '2rem',
                  cursor: 'pointer'
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
                <div style={{ marginBottom: '0.5rem' }}>
                  <Link to={`/artwork/${art._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3 style={{ fontSize: '1.3rem', marginBottom: '0.3rem', fontWeight: '700' }}>{art.name}</h3>
                  </Link>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>{art.artist?.name || 'Unknown Artist'}</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700' }}>{art.category}</span>
                  <p style={{ fontWeight: '800', color: 'var(--accent-primary)', fontSize: '1.1rem' }}>₹{art.price.toLocaleString()}</p>
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
