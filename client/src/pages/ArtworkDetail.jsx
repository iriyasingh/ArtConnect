import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaRegComment, FaChevronLeft } from "react-icons/fa";
import { addArtworkComment, getArtworkById } from "../services/artService";
import { mockArtworks } from "../utils/mockData";
import { getStoredUser } from "../utils/storage";

function ArtworkDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getStoredUser());

    getArtworkById(id)
      .then((data) => {
        setArtwork(data);
        setLoading(false);
      })
      .catch(() => {
        const mockArtwork = mockArtworks.find((item) => item._id === id) || mockArtworks[0];
        setArtwork(mockArtwork);
        setLoading(false);
      });
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) return navigate("/login");
    if (!comment.trim()) return;

    setIsSubmitting(true);
    try {
      const newComment = await addArtworkComment(id, comment);
      setArtwork({ ...artwork, comments: [...(artwork.comments || []), newComment] });
      setComment("");
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(artwork);
  };

  if (loading) return <div className="py-20 text-center text-slate-500">Loading Masterpiece...</div>;
  if (!artwork) return <div className="py-20 text-center text-slate-500">Art not found.</div>;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500 transition hover:text-slate-900"
      >
        <FaChevronLeft /> Back to Gallery
      </button>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_1fr]">
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <img src={artwork.image} alt={artwork.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FaMapMarkerAlt className="text-slate-700" />
            <span>Currently housed at: <strong className="text-slate-800">{artwork.location}</strong></span>
          </div>
        </div>

        <div>
          <div className="mb-8 border-b border-slate-200 pb-8">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {artwork.category} / {artwork.tag}
            </p>
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">{artwork.name}</h1>
            <p className="mt-3 text-lg text-slate-600">
              by {artwork.artist?.name || "Independent Creator"}
            </p>
            <p className="mt-5 leading-relaxed text-slate-700">
              {artwork.description}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-3xl font-bold text-slate-900">₹{artwork.price.toLocaleString()}</span>
              <button
                className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700"
                onClick={handleAddToCart}
              >
                Add to Collection
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-6 flex items-center gap-2 text-2xl font-semibold text-slate-900">
              <FaRegComment />
              Community Thoughts ({artwork.comments?.length || 0})
            </h3>

            <div className="mb-8">
              {user ? (
                <form onSubmit={handleAddComment}>
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your reflection on this piece..."
                    className="mb-3 min-h-28 w-full rounded-lg border border-slate-300 px-4 py-3 outline-none ring-slate-400 focus:ring-2"
                    required
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-lg bg-slate-900 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700 disabled:opacity-70"
                  >
                    {isSubmitting ? "Post... " : "Post Reflection"}
                  </button>
                </form>
              ) : (
                <div className="rounded-xl border border-slate-200 bg-white p-5 text-center">
                  <p className="mb-2 text-sm text-slate-600">Please sign in to join the conversation.</p>
                  <Link to="/login" className="font-semibold text-slate-900 underline underline-offset-2">Sign In</Link>
                </div>
              )}
            </div>

            <div className="space-y-5">
              {artwork.comments?.map((c, i) => (
                <div key={i} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900">{c.user?.name || "Gallery Guest"}</span>
                    <span className="text-xs text-slate-500">{new Date(c.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-700">{c.text}</p>
                </div>
              ))}
              {artwork.comments?.length === 0 && (
                <p className="text-sm italic text-slate-500">No reflections yet. Be the first to share.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ArtworkDetail;
