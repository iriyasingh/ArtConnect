import { useEffect, useState } from "react";
import { createArtwork } from "../services/artService";
import { getStoredUser } from "../utils/storage";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [isOfflinePreview, setIsOfflinePreview] = useState(false);
  const [artworkData, setArtworkData] = useState({ name: "", price: "", image: "", category: "Painting" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = getStoredUser();
    if (!savedUser) {
      setUser({ name: "Guest Curator", email: "guest@artconnect.local", role: "Artist", id: "preview-user" });
      setIsOfflinePreview(true);
      return;
    }
    setUser(savedUser);
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (isOfflinePreview) {
        setMessage("Preview mode: sample listing created locally.");
        setArtworkData({ name: "", price: "", image: "", category: "Painting" });
        return;
      }
      await createArtwork({ ...artworkData, artist: user.id });
      setMessage("Masterpiece successfully listed for collection.");
      setArtworkData({ name: "", price: "", image: "", category: "Painting" });
    } catch {
      setMessage("Server connection error.");
    }
  };

  if (!user) return <div className="py-20 text-center text-slate-500">Authenticating...</div>;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 border-b border-slate-200 pb-6 text-center">
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Personal Gallery</h1>
        <p className="mt-2 text-slate-600">{user.name} | {user.role}</p>
        {isOfflinePreview && (
          <p className="mt-2 text-sm text-slate-500">
            Offline preview mode is active. Sign in to upload to the live API.
          </p>
        )}
      </div>

      <div className={`grid gap-8 ${user.role === "Artist" ? "lg:grid-cols-[1fr_1.4fr]" : ""}`}>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">Account Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
              <p className="mt-1 text-base text-slate-800">{user.email}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Member Since</p>
              <p className="mt-1 text-base text-slate-800">March 2026</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-slate-900">
            Edit Preferences
          </button>
        </div>

        {user.role === "Artist" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-3xl font-bold text-slate-900">List New Work</h2>
            {message && <p className="mb-4 rounded-lg bg-slate-100 px-3 py-2 text-sm text-slate-700">{message}</p>}

            <form onSubmit={handleUpload} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">Artwork Title</label>
                  <input
                    type="text"
                    value={artworkData.name}
                    onChange={(e) => setArtworkData({ ...artworkData, name: e.target.value })}
                    required
                    placeholder="e.g. Midnight Echo"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none ring-slate-400 focus:ring-2"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">Price (INR)</label>
                  <input
                    type="number"
                    value={artworkData.price}
                    onChange={(e) => setArtworkData({ ...artworkData, price: e.target.value })}
                    required
                    placeholder="e.g. 45000"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none ring-slate-400 focus:ring-2"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">Category</label>
                  <select
                    value={artworkData.category}
                    onChange={(e) => setArtworkData({ ...artworkData, category: e.target.value })}
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none ring-slate-400 focus:ring-2"
                  >
                    <option value="Painting">Painting</option>
                    <option value="Sketching">Sketching</option>
                    <option value="Digital Art">Digital Art</option>
                    <option value="Photography">Photography</option>
                    <option value="Sculpture">Sculpture</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">Image URL</label>
                  <input
                    type="text"
                    value={artworkData.image}
                    onChange={(e) => setArtworkData({ ...artworkData, image: e.target.value })}
                    required
                    placeholder="Direct Image Link"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none ring-slate-400 focus:ring-2"
                  />
                </div>
              </div>

              <button type="submit" className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700">
                Submit for Curation
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;