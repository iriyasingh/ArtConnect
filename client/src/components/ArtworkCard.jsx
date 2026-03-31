import { Link } from "react-router-dom";

function ArtworkCard({ art, onCollect, compact = false }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className={`relative overflow-hidden bg-slate-100 ${compact ? "h-72" : "h-80"}`}>
        <Link to={`/artwork/${art._id}`}>
          <img src={art.image} alt={art.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
        </Link>
        <span className="absolute left-3 top-3 rounded-full bg-slate-900/85 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white">
          {art.tag || "CURATED"}
        </span>
      </div>

      <div className="space-y-3 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{art.category || "Artwork"}</p>
        <Link to={`/artwork/${art._id}`} className="block">
          <h3 className="text-xl font-semibold text-slate-900">{art.name}</h3>
        </Link>
        <p className="text-sm text-slate-500">{art.artist?.name || "Unknown Artist"}</p>

        <div className="flex items-center justify-between gap-3 pt-1">
          <p className="text-lg font-bold text-slate-900">₹{Number(art.price || 0).toLocaleString()}</p>
          <button
            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700"
            onClick={() => onCollect(art)}
          >
            Collect
          </button>
        </div>
      </div>
    </article>
  );
}

export default ArtworkCard;
