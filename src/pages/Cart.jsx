import { Link } from "react-router-dom";
import { FaTrash, FaShoppingBag } from "react-icons/fa";

function Cart({ cart, removeFromCart }) {
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const tax = subtotal * 0.12;
  const shipping = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + tax + shipping;

  return (
    <div className="container animate-reveal" style={{ padding: '4rem 0' }}>
      <div style={{ marginBottom: '5rem' }}>
        <h1 style={{ fontSize: '3.2rem', marginBottom: '0.5rem', fontWeight: '800' }}>Your Collection</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>{cart.length} {cart.length === 1 ? 'artwork' : 'artworks'} in your cart</p>
      </div>

      {cart.length === 0 ? (
        <div style={{ padding: '8rem 2rem', textAlign: 'center', border: '2px solid var(--border-light)', borderRadius: '8px', background: 'var(--bg-secondary)' }}>
          <FaShoppingBag style={{ fontSize: '4rem', color: 'var(--accent-primary)', marginBottom: '2.5rem' }} />
          <h2 style={{ marginBottom: '1rem', fontWeight: '700', fontSize: '1.8rem' }}>Your collection is empty</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 3rem' }}>Start exploring our gallery and add your favorite artworks to build your personal collection.</p>
          <Link to="/explore" style={{ textDecoration: 'none' }}><button className="primary" style={{ padding: '1.1rem 3rem' }}>Explore Gallery</button></Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '4rem', alignItems: 'start' }}>
          
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {cart.map((item, index) => (
              <div key={item._id || index} style={{ display: 'flex', paddingBottom: '2.5rem', borderBottom: '1px solid var(--border-light)', gap: '2.5rem', alignItems: 'flex-start' }}>
                <div style={{ width: '160px', height: '160px', background: 'var(--bg-secondary)', overflow: 'hidden', borderRadius: '8px', flexShrink: 0 }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.7rem', fontWeight: '700' }}>{item.category}</p>
                  <h3 style={{ fontSize: '1.35rem', marginBottom: '0.3rem', fontWeight: '700' }}>{item.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>by {item.artist?.name || 'Artist'}</p>
                  <button 
                    onClick={() => removeFromCart(item._id)} 
                    style={{ border: 'none', background: 'transparent', color: 'var(--text-tertiary)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'var(--transition-smooth)', fontWeight: '700', padding: '0.5rem 0' }}
                  >
                    ✕ Remove from Collection
                  </button>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--accent-primary)' }}>₹{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ background: 'var(--bg-secondary)', padding: '3rem', position: 'sticky', top: '100px', borderRadius: '8px' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', fontWeight: '800' }}>Order Summary</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span style={{ fontWeight: '600' }}>₹{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tax (12% GST)</span>
                <span style={{ fontWeight: '600' }}>₹{tax.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', borderBottom: '1.5px solid var(--border-medium)', paddingBottom: '1.2rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                <span style={{ fontWeight: '600', color: shipping === 0 ? 'var(--accent-primary)' : 'var(--text-primary)' }}>{shipping === 0 ? '✓ FREE' : `₹${shipping.toLocaleString()}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.4rem', marginTop: '0.5rem', color: 'var(--text-primary)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--accent-primary)' }}>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button className="primary" style={{ width: '100%', padding: '1.3rem', fontSize: '0.85rem', fontWeight: '700' }}>
              Proceed to Checkout
            </button>
            <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-tertiary)', fontSize: '0.8rem', lineHeight: '1.5' }}>
              🔒 Secure checkout • 🌍 Worldwide shipping • 📦 Insured delivery
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;
