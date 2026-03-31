import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [artworkData, setArtworkData] = useState({ name: "", price: "", image: "", category: "Painting" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) navigate("/login");
    else setUser(JSON.parse(savedUser));
  }, [navigate]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/artworks", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ ...artworkData, artist: user.id }),
      });

      if (response.ok) {
        setMessage("Masterpiece successfully listed for collection.");
        setArtworkData({ name: "", price: "", image: "", category: "Painting" });
      } else {
        setMessage("Listing failed. Please verify all details.");
      }
    } catch (err) {
      setMessage("Server connection error.");
    }
  };

  if (!user) return <div className="container" style={{ padding: '10rem', textAlign: 'center' }}>Authenticating...</div>;

  return (
    <div className="container animate-reveal" style={{ padding: '6rem 2rem' }}>
      
      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '4rem', marginBottom: '6rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>Personal Gallery</h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--accent-gold)', fontStyle: 'italic' }}>{user.name} | {user.role}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: user.role === "Artist" ? '1fr 1.5fr' : '1fr', gap: '8rem' }}>
        
        {/* Profile Info */}
        <div style={{ padding: '4rem', background: '#F9F9F9' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '2.5rem' }}>Account Details</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
             <div>
              <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--text-muted)' }}>Email</p>
              <p style={{ fontSize: '1.1rem' }}>{user.email}</p>
            </div>
             <div>
              <p style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', color: 'var(--text-muted)' }}>Member Since</p>
              <p style={{ fontSize: '1.1rem' }}>March 2026</p>
            </div>
          </div>
          <button style={{ marginTop: '3rem', width: '100%', fontSize: '0.7rem' }}>Edit Preferences</button>
        </div>

        {/* Artist-only: Upload Feature */}
        {user.role === "Artist" && (
          <div>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}>List New Work</h2>
            {message && <p style={{ color: 'var(--accent-gold)', marginBottom: '2rem', fontWeight: '500' }}>{message}</p>}
            
            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Artwork Title</label>
                  <input type="text" value={artworkData.name} onChange={(e) => setArtworkData({ ...artworkData, name: e.target.value })} required placeholder="e.g. Midnight Echo" />
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Price (INR)</label>
                  <input type="number" value={artworkData.price} onChange={(e) => setArtworkData({ ...artworkData, price: e.target.value })} required placeholder="e.g. 45000" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div>
                  <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Category</label>
                  <select value={artworkData.category} onChange={(e) => setArtworkData({ ...artworkData, category: e.target.value })}>
                    <option value="Painting">Painting</option>
                    <option value="Sketching">Sketching</option>
                    <option value="Digital Art">Digital Art</option>
                    <option value="Photography">Photography</option>
                    <option value="Sculpture">Sculpture</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Image URL</label>
                  <input type="text" value={artworkData.image} onChange={(e) => setArtworkData({ ...artworkData, image: e.target.value })} required placeholder="Direct Image Link" />
                </div>
              </div>
              
              <button type="submit" className="primary" style={{ padding: '1.5rem', alignSelf: 'flex-start' }}>Submit for Curation</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;