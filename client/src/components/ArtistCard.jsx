function ArtistCard({ artist }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="h-80 overflow-hidden bg-slate-100">
        <img src={artist.image} alt={artist.name} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
      </div>
      <div className="space-y-3 p-5 text-center">
        <h3 className="text-xl font-semibold text-slate-900">{artist.name}</h3>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{artist.location || "Global Artist"}</p>
        <button className="rounded-lg border border-slate-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-slate-900 hover:text-slate-900">
          View Portfolio
        </button>
      </div>
    </article>
  );
}

export default ArtistCard;
