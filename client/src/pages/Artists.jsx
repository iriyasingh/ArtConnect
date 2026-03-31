import { useState, useEffect } from "react";
import { getArtists } from "../services/artService";
import { mockArtists } from "../utils/mockData";
import ArtistCard from "../components/ArtistCard";

function Artists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getArtists()
      .then((data) => {
        setArtists(data?.data?.length ? data.data : mockArtists);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching artists:", err);
        setArtists(mockArtists);
        setLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Our Collective</h1>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Meet the visionary creators whose works define the ArtConnect experience. A curated group of world-class talent and emerging voices.
        </p>
      </div>

      {loading ? (
        <div className="py-20 text-center text-slate-500">
          <h2>Gathering the masters...</h2>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {artists.map((artist) => (
            <ArtistCard key={artist._id} artist={artist} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Artists;