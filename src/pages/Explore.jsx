import { useState } from "react";
import { FaFilter } from "react-icons/fa";

function Explore({ addToCart }) {
  const mockArtworks = [
    { _id: "1", name: "Sunset Dreams", artist: { name: "Elena Rodriguez" }, category: "Painting", price: 45000, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop" },
    { _id: "2", name: "Urban Pulse", artist: { name: "Marcus Chen" }, category: "Digital Art", price: 32000, image: "https://images.unsplash.com/photo-1578401494619-246883941f1d?w=500&h=500&fit=crop" },
    { _id: "3", name: "Nature's Whisper", artist: { name: "Sophie Laurent" }, category: "Photography", price: 28000, image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=500&fit=crop" },
    { _id: "4", name: "Abstract Harmony", artist: { name: "James Mitchell" }, category: "Sculpture", price: 55000, image: "https://images.unsplash.com/photo-1561214115-6d3dedf3cfb6?w=500&h=500&fit=crop" },
    { _id: "5", name: "Ocean Serenity", artist: { name: "Amara Okonkwo" }, category: "Painting", price: 38000, image: "https://images.unsplash.com/photo-1475066847556-880ae5922d6f?w=500&h=500&fit=crop" },
    { _id: "6", name: "Modern Reflections", artist: { name: "David Park" }, category: "Digital Art", price: 41000, image: "https://images.unsplash.com/photo-1538527527ff-6b5a6f81a87c?w=500&h=500&fit=crop" },
    { _id: "7", name: "Golden Hour", artist: { name: "Isabella Santos" }, category: "Photography", price: 35000, image: "https://images.unsplash.com/photo-1501888691938-d2a5ad0c3fe7?w=500&h=500&fit=crop" },
    { _id: "8", name: "Timeless Forms", artist: { name: "Johannes Berg" }, category: "Sculpture", price: 62000, image: "https://images.unsplash.com/photo-1578375093859-00a9a08af4e2?w=500&h=500&fit=crop" },
    { _id: "9", name: "Ethereal Dreams", artist: { name: "Yuki Tanaka" }, category: "Painting", price: 48000, image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=500&h=500&fit=crop" },
    { _id: "10", name: "Digital Horizon", artist: { name: "Alex Rivera" }, category: "Digital Art", price: 36000, image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop" },
    { _id: "11", name: "Captured Essence", artist: { name: "Nina Patel" }, category: "Photography", price: 31000, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop" },
    { _id: "12", name: "Stone Poetry", artist: { name: "Klaus Mueller" }, category: "Sculpture", price: 59000, image: "https://images.unsplash.com/photo-1549887534-f2cb8a303f94?w=500&h=500&fit=crop" }
  ];

  const categories = ["All", "Painting", "Digital Art", "Photography", "Sculpture"];
  const [filter, setFilter] = useState("All");

  const filteredArt = filter === "All" ? mockArtworks : mockArtworks.filter(art => art.category === filter);

  return (
    <div className="animate-reveal">
      <section className="container" style={{ padding: '5rem 0' }}>
        <div style={{ marginBottom: '4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
                Art Gallery
              </span>
              <h1 style={{ fontSize: '3.5rem', marginTop: '0.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Explore Collections
              </h1>
              <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                Browse {filteredArt.length} unique artworks from global creators
              </p>
            </div>
            <div style={{ background: 'var(--bg-accent)', color: 'var(--text-primary)', padding: '1rem 1.8rem', borderRadius: '8px', fontWeight: '700', fontSize: '1rem', textAlign: 'center' }}>
              {filteredArt.length} Works
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '3.5rem', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)' }}>
          <p style={{ fontSize: '0.8rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-tertiary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaFilter size={12} /> Filter by Category
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                style={{ 
                  padding: '0.7rem 1.8rem', 
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  background: filter === cat ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                  color: filter === cat ? 'white' : 'var(--text-primary)',
                  borderColor: filter === cat ? 'var(--accent-primary)' : 'var(--border-medium)',
                  border: '1.5px solid',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid-3">
          {filteredArt.map((art, idx) => (
            <div key={art._id} className="product-card" style={{ 
              animation: `reveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
              animationDelay: `${idx * 0.08}s`,
              opacity: 0
            }}>
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
                    className="primary"
                    style={{ padding: '0.7rem 1.5rem', fontSize: '0.7rem', fontWeight: '700' }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredArt.length === 0 && (
          <div style={{ textAlign: 'center', padding: '6rem 2rem' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>No artworks found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default Explore;
