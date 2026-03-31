import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import CartItemCard from "../components/CartItemCard";

function Cart({ cart, removeFromCart }) {
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const tax = subtotal * 0.12;
  const shipping = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + tax + shipping;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">Collection Bag</h1>
        <p className="mt-2 text-sm text-slate-600">{cart.length} items selected for acquisition</p>
      </div>

      {cart.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center shadow-sm">
          <FaShoppingBag className="mx-auto mb-4 text-5xl text-slate-400" />
          <h2 className="mb-6 text-2xl font-semibold text-slate-900">Your bag is currently empty.</h2>
          <Link to="/explore">
            <button className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700">
              Browse the Collection
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[1.8fr_1fr]">
          <div className="space-y-4">
            {cart.map((item, index) => (
              <CartItemCard key={item._id || index} item={item} removeFromCart={removeFromCart} />
            ))}
          </div>

          <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-slate-900">Acquisition Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tax estimate (12% GST)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-4">
                <span className="text-slate-500">Insured Shipping</span>
                <span>{shipping === 0 ? 'COMPLIMENTARY' : `₹${shipping.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between pt-2 text-2xl font-bold text-slate-900">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button className="mt-6 w-full rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700">
              Finalize Acquisition
            </button>
            <p className="mt-4 text-center text-xs uppercase tracking-wide text-slate-500">
              Fully Insured Worldwide Delivery
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;