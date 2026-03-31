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
    <div className="container animate-reveal" style={{ padding: '6rem 2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>The Collections</h1>
          <p style={{ color: 'var(--text-muted)', letterSpacing: '0.05em' }}>Explore {artworks.length} original works from our global collective.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          {categories.map(cat => (
            <button 
              key={cat} 
              onClick={() => setFilter(cat)}
              style={{ 
                padding: '0.6rem 1.5rem', 
                fontSize: '0.7rem', 
                background: filter === cat ? 'var(--text-primary)' : 'transparent',
                color: filter === cat ? 'white' : 'var(--text-primary)',
                borderColor: filter === cat ? 'var(--text-primary)' : 'var(--border-medium)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '10rem' }}>
          <h2 className="serif">Assembling the exhibition...</h2>
        </div>
      ) : (
        <div className="grid">
          {filteredArt.map(art => (
            <div key={art._id} className="gallery-card">
              <div style={{ overflow: 'hidden', height: '400px', background: '#F0F0F0', position: 'relative' }}>
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
                }}>
                  <button 
                    onClick={() => addToCart(art)} 
                    className="primary" 
                    style={{ padding: '0.6rem 1.2rem', fontSize: '0.7rem', boxShadow: 'var(--shadow-subtle)' }}
                  >
                    Collect
                  </button>
                </div>
              </div>

              <div style={{ padding: '1.5rem 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <Link to={`/artwork/${art._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <h3 style={{ fontSize: '1.4rem', marginBottom: '0.3rem' }}>{art.name}</h3>
                    </Link>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{art.artist?.name || 'Unknown Artist'}</p>
                  </div>
                  <p style={{ fontWeight: '600', color: 'var(--accent-gold)' }}>₹{art.price.toLocaleString()}</p>
                </div>
                <div style={{ marginTop: '0.5rem' }}>
                   <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{art.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredArt.length === 0 && !loading && (
        <div style={{ textAlign: 'center', padding: '10rem' }}>
          <h2 className="serif">No works found in this selection.</h2>
          <button onClick={() => setFilter("All")} style={{ marginTop: '2rem' }}>View All Works</button>
        </div>
      )}
    </div>
  );
}

export default Explore;