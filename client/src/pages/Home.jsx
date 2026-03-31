import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getArtworks } from "../services/artService";
import { mockArtworks } from "../utils/mockData";
import ArtworkCard from "../components/ArtworkCard";

function Home({ addToCart }) {
  const [featuredArt, setFeaturedArt] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtworks()
      .then((data) => {
        const artworks = data?.data?.length ? data.data : mockArtworks;
        setFeaturedArt(artworks.slice(0, 4));
        setLoading(false);
      })
      .catch(() => {
        setFeaturedArt(mockArtworks.slice(0, 4));
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 text-center">
        <img
          src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2000"
          alt="Gallery hero"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />
        <div className="relative z-10 mx-auto max-w-4xl">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.35em] text-slate-600">
            Curated Fine Art
          </span>
          <h1 className="mb-5 text-4xl font-bold leading-tight text-slate-900 sm:text-6xl">
            Where Tradition Meets <span className="text-slate-600">Contemporary</span>
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base text-slate-600 sm:text-lg">
            ArtConnect is a premier destination for discovering and acquiring original masterpieces from the world's most promising talents.
          </p>
          <Link to="/explore">
            <button className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700">
              View the Collection
            </button>
          </Link>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">The Autumn Selection</h2>
          <p className="mt-3 text-slate-600">Handpicked pieces curated for collectors this season.</p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-500">Curating...</div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featuredArt.map((art) => (
              <ArtworkCard key={art._id} art={art} onCollect={addToCart} />
            ))}
          </div>
        )}
      </section>

      <section className="bg-slate-900 py-16 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div className="overflow-hidden rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1000"
              className="h-full w-full object-cover"
              alt="Artist at work"
            />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-300">Creator Spotlight</span>
            <h2 className="mt-3 text-3xl font-bold leading-tight sm:text-5xl">
              Celebrating Cultural <span className="text-slate-300">Excellence</span>
            </h2>
            <p className="mt-5 text-slate-300">
              We believe that every piece of art carries a story, a heritage, and a vision. Join our community of over 500 verified creators and share your journey with collectors worldwide.
            </p>
            <Link to="/register">
              <button className="mt-6 rounded-lg border border-white px-5 py-2 text-sm font-semibold uppercase tracking-wide transition hover:bg-white hover:text-slate-900">
                Become a Partner
              </button>
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-3xl font-bold text-slate-900">Exclusive Access</h2>
          <p className="mt-3 text-slate-600">Subscribe to receive early access to new collections and private exhibitions.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <input type="email" placeholder="Your email address" className="flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none ring-slate-400 focus:ring-2" />
            <button className="rounded-lg bg-slate-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700">
              Join
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8">
          <h3 className="text-xl font-semibold text-slate-900">ArtConnect</h3>
          <div className="flex gap-5">
            <Link to="/explore" className="transition hover:text-slate-900">Collections</Link>
            <Link to="/artists" className="transition hover:text-slate-900">Artists</Link>
            <Link to="/about" className="transition hover:text-slate-900">About</Link>
          </div>
          <p>&copy; 2026 ArtConnect Private Gallery</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;