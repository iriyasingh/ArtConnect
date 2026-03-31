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
    <div className="container animate-reveal" style={{ padding: '6rem 2rem' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>Our Collective</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem', letterSpacing: '0.02em' }}>
          Meet the visionary creators whose works define the ArtConnect experience. A curated group of world-class talent and emerging voices.
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '10rem' }}>
          <h2 className="serif">Gathering the masters...</h2>
        </div>
      ) : (
        <div className="grid">
          {artists.map(artist => (
            <div key={artist._id} className="gallery-card" style={{ borderBottom: 'none' }}>
              <div style={{ overflow: 'hidden', height: '500px', background: '#F0F0F0' }}>
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition-smooth)' }} 
                />
              </div>
              <div style={{ padding: '2.5rem 0', textAlign: 'center' }}>
                <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{artist.name}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{artist.location}</p>
                <div style={{ marginTop: '2rem' }}>
                  <button style={{ padding: '0.8rem 2rem', fontSize: '0.7rem' }}>View Portfolio</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Artists;