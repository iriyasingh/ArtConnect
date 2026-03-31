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

  if (!user) return <div className="container" style={{ padding: '8rem 2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading your profile...</div>;

  return (
    <div className="container animate-reveal" style={{ padding: '5rem 0' }}>
      
      <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '3rem', marginBottom: '4rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '700' }}>Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Welcome back, <span style={{ fontWeight: '600', color: 'var(--accent-primary)' }}>{user.name.split(' ')[0]}</span></p>
          </div>
          <div style={{ background: 'var(--bg-secondary)', padding: '1rem 1.5rem', borderRadius: '4px' }}>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', marginBottom: '0.25rem' }}>Account Type</p>
            <p style={{ fontSize: '0.95rem', fontWeight: '600' }}>{user.role}</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: user.role === "Artist" ? '1fr 2fr' : '1fr', gap: '4rem', alignItems: 'start' }}>
        
        {/* Profile Card */}
        <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '4px', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontWeight: '700' }}>Account Info</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', marginBottom: '0.4rem' }}>Email</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>{user.email}</p>
            </div>
            <div>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', marginBottom: '0.4rem' }}>Member Since</p>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>March 2026</p>
            </div>
          </div>
          <button style={{ marginTop: '2rem', width: '100%', fontSize: '0.75rem' }}>Edit Profile</button>
        </div>

        {/* Artist-only: Upload Feature */}
        {user.role === "Artist" && (
          <div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', fontWeight: '700' }}>List Artwork</h2>
            {message && <div style={{ background: message.includes('success') || message.includes('successfully') ? '#ECFDF5' : '#FEF2F2', color: message.includes('success') || message.includes('successfully') ? '#065F46' : '#991B1B', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', fontSize: '0.85rem', border: message.includes('success') || message.includes('successfully') ? '1px solid #6EE7B7' : '1px solid #FECACA' }}>{message}</div>}
            
            <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', display: 'block', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>Artwork Title</label>
                  <input type="text" value={artworkData.name} onChange={(e) => setArtworkData({ ...artworkData, name: e.target.value })} required placeholder="e.g. Midnight Echo" style={{ fontSize: '0.95rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', display: 'block', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>Price (₹)</label>
                  <input type="number" value={artworkData.price} onChange={(e) => setArtworkData({ ...artworkData, price: e.target.value })} required placeholder="e.g. 45000" style={{ fontSize: '0.95rem' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', display: 'block', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>Category</label>
                  <select value={artworkData.category} onChange={(e) => setArtworkData({ ...artworkData, category: e.target.value })} style={{ fontSize: '0.95rem' }}>
                    <option value="Painting">Painting</option>
                    <option value="Sketching">Sketching</option>
                    <option value="Digital Art">Digital Art</option>
                    <option value="Photography">Photography</option>
                    <option value="Sculpture">Sculpture</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', display: 'block', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>Image URL</label>
                  <input type="text" value={artworkData.image} onChange={(e) => setArtworkData({ ...artworkData, image: e.target.value })} required placeholder="https://example.com/image.jpg" style={{ fontSize: '0.95rem' }} />
                </div>
              </div>
              
              <button type="submit" className="primary" style={{ padding: '1rem', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: '600' }}>List Artwork</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
