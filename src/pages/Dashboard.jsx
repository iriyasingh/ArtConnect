import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaArtwork, FaDollarSign } from "react-icons/fa";

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
    <div className="animate-reveal">
      <section className="container" style={{ padding: '5rem 0' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
            Account Dashboard
          </span>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '1rem' }}>
            <div>
              <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Dashboard
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
                Welcome back, <span style={{ fontWeight: '700', color: 'var(--accent-primary)' }}>{user.name.split(' ')[0]}</span>
              </p>
            </div>
            <div style={{ background: 'var(--accent-primary)', color: 'white', padding: '1.2rem 2rem', borderRadius: '8px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', marginBottom: '0.5rem' }}>Account Type</p>
              <p style={{ fontSize: '1.1rem', fontWeight: '800' }}>{user.role}</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: user.role === "Artist" ? '1fr 2fr' : '1fr', gap: '4rem', alignItems: 'start' }}>
          
          {/* Profile Card */}
          <div style={{ background: 'var(--bg-secondary)', padding: '3rem', borderRadius: '12px', border: '1px solid var(--border-light)', height: 'fit-content' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '2.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
              Account Information
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800', marginBottom: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaUser size={11} /> Full Name
                </p>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', fontWeight: '700' }}>{user.name}</p>
              </div>

              <div style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800', marginBottom: '0.7rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaEnvelope size={11} /> Email Address
                </p>
                <p style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '600' }}>{user.email}</p>
              </div>

              <div style={{ padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800', marginBottom: '0.7rem' }}>
                  Member Since
                </p>
                <p style={{ fontSize: '1rem', color: 'var(--text-primary)', fontWeight: '600' }}>March 2026</p>
              </div>
            </div>

            <button style={{ marginTop: '2.5rem', width: '100%', padding: '0.95rem', fontSize: '0.8rem', fontWeight: '700' }}>
              Edit Profile
            </button>
          </div>

          {/* Artist-only: Upload Feature */}
          {user.role === "Artist" && (
            <div>
              <div style={{ marginBottom: '3rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
                  Artist Tools
                </span>
                <h2 style={{ fontSize: '2.2rem', marginTop: '0.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  List New Artwork
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.5rem' }}>
                  Share your masterpiece with collectors worldwide
                </p>
              </div>

              {message && (
                <div style={{ 
                  background: message.includes('success') || message.includes('successfully') ? '#ECFDF5' : '#FEF2F2', 
                  color: message.includes('success') || message.includes('successfully') ? '#065F46' : '#991B1B', 
                  padding: '1.3rem', 
                  borderRadius: '8px', 
                  marginBottom: '2.5rem', 
                  fontSize: '0.85rem', 
                  border: message.includes('success') || message.includes('successfully') ? '1px solid #6EE7B7' : '1px solid #FECACA',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem'
                }}>
                  <span style={{ fontSize: '1.2rem' }}>{message.includes('success') || message.includes('successfully') ? '✓' : '⚠️'}</span>
                  <span>{message}</span>
                </div>
              )}
              
              <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', gap: '2rem', background: 'var(--bg-secondary)', padding: '3rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', display: 'block', marginBottom: '0.8rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaArtwork size={12} /> Artwork Title
                    </label>
                    <input 
                      type="text" 
                      value={artworkData.name} 
                      onChange={(e) => setArtworkData({ ...artworkData, name: e.target.value })} 
                      required 
                      placeholder="e.g. Midnight Echo"
                      style={{ fontSize: '0.95rem' }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', display: 'block', marginBottom: '0.8rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <FaDollarSign size={12} /> Price (₹)
                    </label>
                    <input 
                      type="number" 
                      value={artworkData.price} 
                      onChange={(e) => setArtworkData({ ...artworkData, price: e.target.value })} 
                      required 
                      placeholder="e.g. 45000"
                      style={{ fontSize: '0.95rem' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', display: 'block', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>
                      Category
                    </label>
                    <select 
                      value={artworkData.category} 
                      onChange={(e) => setArtworkData({ ...artworkData, category: e.target.value })}
                      style={{ fontSize: '0.95rem' }}
                    >
                      <option value="Painting">Painting</option>
                      <option value="Digital Art">Digital Art</option>
                      <option value="Photography">Photography</option>
                      <option value="Sculpture">Sculpture</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', display: 'block', marginBottom: '0.8rem', color: 'var(--text-primary)' }}>
                      Image URL
                    </label>
                    <input 
                      type="text" 
                      value={artworkData.image} 
                      onChange={(e) => setArtworkData({ ...artworkData, image: e.target.value })} 
                      required 
                      placeholder="https://example.com/image.jpg"
                      style={{ fontSize: '0.95rem' }}
                    />
                  </div>
                </div>
                
                <button type="submit" className="primary" style={{ padding: '1.1rem', fontSize: '0.85rem', marginTop: '1rem', fontWeight: '700', width: '100%' }}>
                  List Artwork
                </button>
              </form>
            </div>
          )}

          {/* Collector Info */}
          {user.role !== "Artist" && (
            <div>
              <div style={{ marginBottom: '3rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
                  Collector Tools
                </span>
                <h2 style={{ fontSize: '2.2rem', marginTop: '0.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Your Collection
                </h2>
              </div>

              <div className="grid-2">
                <div style={{ background: 'var(--bg-secondary)', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                  <p style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>0</p>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Items in Collection</p>
                </div>
                <div style={{ background: 'var(--bg-secondary)', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', textAlign: 'center' }}>
                  <p style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>₹0</p>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Total Invested</p>
                </div>
              </div>

              <div style={{ background: 'var(--bg-secondary)', padding: '3rem', borderRadius: '12px', border: '1px solid var(--border-light)', marginTop: '2.5rem', textAlign: 'center' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.8' }}>
                  Start building your art collection by exploring our gallery of curated artworks from talented creators around the world.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
