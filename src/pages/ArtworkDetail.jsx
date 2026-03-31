import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaRegComment, FaChevronLeft } from "react-icons/fa";

function ArtworkDetail({ addToCart, showToast }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    fetch(`http://localhost:5000/api/artworks/${id}`)
      .then(res => res.json())
      .then(data => {
        setArtwork(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    if (!comment.trim()) return;

    setIsSubmitting(true);
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`http://localhost:5000/api/artworks/${id}/comments`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ text: comment })
      });

      if (res.ok) {
        const newComment = await res.json();
        setArtwork({ ...artwork, comments: [...artwork.comments, newComment] });
        setComment("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(artwork);
    showToast(`${artwork.name} added to your collection.`);
  };

  if (loading) return <div className="container" style={{ padding: '10rem', textAlign: 'center' }}><h2 className="serif">Loading Masterpiece...</h2></div>;
  if (!artwork) return <div className="container" style={{ padding: '10rem', textAlign: 'center' }}><h2 className="serif">Art not found.</h2></div>;

  return (
    <div className="container animate-reveal" style={{ padding: '4rem 0 10rem' }}>
      
      <button 
        onClick={() => navigate(-1)} 
        style={{ border: 'none', background: 'transparent', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}
      >
        <FaChevronLeft /> Back to Gallery
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '6rem', alignItems: 'start' }}>
        
        {/* Large Image View */}
        <div style={{ position: 'sticky', top: '120px' }}>
          <div style={{ background: '#F5F5F5', overflow: 'hidden', boxShadow: 'var(--shadow-hover)' }}>
            <img src={artwork.image} alt={artwork.name} style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <FaMapMarkerAlt style={{ color: 'var(--accent-gold)' }} />
            <span>Currently housed at: <strong>{artwork.location}</strong></span>
          </div>
        </div>

        {/* Details & Interaction */}
        <div>
          <div style={{ borderBottom: '1px solid var(--border-light)', paddingBottom: '3rem', marginBottom: '3rem' }}>
            <p style={{ color: 'var(--accent-gold)', fontWeight: '600', letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem' }}>
              {artwork.category} / {artwork.tag}
            </p>
            <h1 style={{ fontSize: '4.5rem', lineHeight: '1', marginBottom: '1.5rem' }}>{artwork.name}</h1>
            <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', marginBottom: '2.5rem', fontStyle: 'italic' }}>
              by {artwork.artist?.name || "Independent Creator"}
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
              {artwork.description}
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4rem' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: '600' }}>₹{artwork.price.toLocaleString()}</span>
              <button className="primary" onClick={handleAddToCart} style={{ padding: '1.2rem 4rem' }}>Add to Collection</button>
            </div>
          </div>

          {/* Comments Section */}
          <div style={{ marginTop: '5rem' }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <FaRegComment style={{ fontSize: '1.5rem', color: 'var(--accent-gold)' }} /> 
              Community Thoughts ({artwork.comments?.length || 0})
            </h3>

            {/* Comment Form */}
            <div style={{ marginBottom: '4rem' }}>
              {user ? (
                <form onSubmit={handleAddComment}>
                  <textarea 
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your reflection on this piece..."
                    style={{ minHeight: '120px', marginBottom: '1rem', borderRadius: '0', border: '1px solid var(--border-medium)' }}
                    required
                  />
                  <button type="submit" disabled={isSubmitting} style={{ fontSize: '0.75rem', padding: '0.8rem 2rem' }}>
                    {isSubmitting ? "Post... " : "Post Reflection"}
                  </button>
                </form>
              ) : (
                <div style={{ padding: '2rem', background: '#F9F9F9', textAlign: 'center', border: '1px solid var(--border-light)' }}>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>Please sign in to join the conversation.</p>
                  <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Sign In</Link>
                </div>
              )}
            </div>

            {/* Comments List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              {artwork.comments?.map((c, i) => (
                <div key={i} style={{ borderBottom: '1px solid #F0F0F0', paddingBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{c.user?.name || "Gallery Guest"}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>{c.text}</p>
                </div>
              ))}
              {artwork.comments?.length === 0 && (
                <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No reflections yet. Be the first to share.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ArtworkDetail;
