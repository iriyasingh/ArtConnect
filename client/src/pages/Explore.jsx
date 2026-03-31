import { useState, useEffect } from "react";
import { getArtworks } from "../services/artService";
import { mockArtworks } from "../utils/mockData";
import ArtworkCard from "../components/ArtworkCard";

function Explore({ addToCart }) {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getArtworks()
      .then((data) => {
        setArtworks(data?.data?.length ? data.data : mockArtworks);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artworks:", err);
        setArtworks(mockArtworks);
        setLoading(false);
      });
  }, []);

  const categories = ["All", "Painting", "Sketching", "Digital Art", "Photography", "Sculpture"];

  const filteredArt = filter === "All" 
    ? artworks 
    : artworks.filter(art => art.category === filter);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">The Collections</h1>
          <p className="mt-2 text-slate-600">Explore {artworks.length} original works from our global collective.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                filter === cat ? "border-slate-900 bg-slate-900 text-white" : "border-slate-300 text-slate-600 hover:border-slate-900 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <h2>Assembling the exhibition...</h2>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredArt.map((art) => (
            <ArtworkCard key={art._id} art={art} onCollect={addToCart} compact />
          ))}
        </div>
      )}

      {filteredArt.length === 0 && !loading && (
        <div className="py-20 text-center">
          <h2 className="text-xl font-semibold text-slate-900">No works found in this selection.</h2>
          <button
            onClick={() => setFilter("All")}
            className="mt-6 rounded-lg bg-slate-900 px-5 py-2 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700"
          >
            View All Works
          </button>
        </div>
      )}
    </div>
  );
}

export default Explore;