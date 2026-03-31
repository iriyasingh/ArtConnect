import { useState } from "react";

function Artists() {
  const mockArtists = [
    { _id: "1", name: "Elena Rodriguez", location: "Barcelona, Spain", speciality: "Contemporary Painting", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&h=500&fit=crop" },
    { _id: "2", name: "Marcus Chen", location: "Shanghai, China", speciality: "Digital Art", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop" },
    { _id: "3", name: "Sophie Laurent", location: "Paris, France", speciality: "Fine Photography", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&h=500&fit=crop" },
    { _id: "4", name: "James Mitchell", location: "London, UK", speciality: "Sculpture", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&h=500&fit=crop" },
    { _id: "5", name: "Amara Okonkwo", location: "Lagos, Nigeria", speciality: "Abstract Art", image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=500&h=500&fit=crop" },
    { _id: "6", name: "David Park", location: "Seoul, South Korea", speciality: "Mixed Media", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=500&fit=crop" },
    { _id: "7", name: "Isabella Santos", location: "Rio de Janeiro, Brazil", speciality: "Landscape Photography", image: "https://images.unsplash.com/photo-1517849845537-1d51a20414de?w=500&h=500&fit=crop" },
    { _id: "8", name: "Johannes Berg", location: "Berlin, Germany", speciality: "Modern Sculpture", image: "https://images.unsplash.com/photo-1492562094212-642386f968da?w=500&h=500&fit=crop" },
    { _id: "9", name: "Yuki Tanaka", location: "Tokyo, Japan", speciality: "Traditional Painting", image: "https://images.unsplash.com/photo-1516387938699-c52646db42da?w=500&h=500&fit=crop" }
  ];

  return (
    <div className="animate-reveal">
      <section className="container" style={{ padding: '5rem 0' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
            Creator Community
          </span>
          <h1 style={{ fontSize: '3.5rem', marginTop: '0.5rem', marginBottom: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            Meet Our Artists
          </h1>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Discover talented creators from around the world sharing their unique vision and artistic excellence
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid-3">
          {mockArtists.map((artist, idx) => (
            <div key={artist._id} className="artist-card" style={{ 
              animation: `reveal 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards`,
              animationDelay: `${idx * 0.08}s`,
              opacity: 0
            }}>
              <img src={artist.image} alt={artist.name} />
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {artist.name}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.8rem', fontWeight: '500' }}>
                  📍 {artist.location}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-tertiary)', marginBottom: '1.5rem', fontStyle: 'italic' }}>
                  {artist.speciality}
                </p>
                <button style={{ width: '100%', padding: '0.9rem', fontSize: '0.8rem', fontWeight: '700' }}>
                  View Portfolio
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ background: 'var(--bg-secondary)', padding: '6rem 0', marginTop: '4rem' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.8rem', marginBottom: '1rem', fontWeight: '800', color: 'var(--text-primary)' }}>
            Are You an Artist?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            Join our thriving community and showcase your work to collectors worldwide
          </p>
          <button className="primary" style={{ padding: '1.1rem 3rem', fontSize: '0.85rem', fontWeight: '700' }}>
            Become a Creator
          </button>
        </div>
      </section>
    </div>
  );
}

export default Artists;
