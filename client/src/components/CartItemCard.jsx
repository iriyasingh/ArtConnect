function CartItemCard({ item, removeFromCart }) {
  return (
    <article className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[160px_1fr_auto] md:items-center">
      <div className="h-52 overflow-hidden rounded-xl bg-slate-100 md:h-40 md:w-40">
        <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
      </div>

      <div className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.category || "Artwork"}</p>
        <h3 className="text-2xl font-semibold text-slate-900">{item.name}</h3>
        <p className="text-sm text-slate-500">by {item.artist?.name || "Artist"}</p>
      </div>

      <div className="space-y-3 md:text-right">
        <p className="text-xl font-bold text-slate-900">₹{Number(item.price || 0).toLocaleString()}</p>
        <button
          onClick={() => removeFromCart(item._id || item.id)}
          className="text-xs font-semibold uppercase tracking-wide text-rose-500 transition hover:text-rose-700"
        >
          Remove from bag
        </button>
      </div>
    </article>
  );
}

export default CartItemCard;
