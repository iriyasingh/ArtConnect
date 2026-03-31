import { useState, useEffect } from "react";

function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/api/artists")
      .then(res => res.json())
      .then(data => {
        setArtists(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching artists:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container animate-reveal" style={{ padding: '5rem 0' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '5rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '700' }}>Featured Artists</h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto', fontSize: '1rem', lineHeight: '1.6' }}>
          Discover talented creators from around the world. Each artist brings a unique vision and style to our platform.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Loading artists...</p>
        </div>
      ) : (
        <div className="grid">
          {artists.map(artist => (
            <div key={artist._id} className="gallery-card">
              <div style={{ overflow: 'hidden', height: '420px', background: 'var(--bg-secondary)', borderRadius: '4px' }}>
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-smooth)' }} 
                />
              </div>
              <div style={{ padding: '1.5rem 0', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.3rem', fontWeight: '600' }}>{artist.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>{artist.location}</p>
                <button style={{ padding: '0.7rem 1.8rem', fontSize: '0.7rem', marginTop: '1.2rem' }}>View Works</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Artists;
