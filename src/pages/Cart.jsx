import { Link } from "react-router-dom";
import { FaTrash, FaShoppingBag, FaCheckCircle, FaTruck, FaLock } from "react-icons/fa";

function Cart({ cart, removeFromCart }) {
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const tax = subtotal * 0.12;
  const shipping = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + tax + shipping;

  return (
    <div className="animate-reveal">
      <section className="container" style={{ padding: '4rem 0' }}>
        {/* Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-primary)' }}>
            Shopping Cart
          </span>
          <h1 style={{ fontSize: '3.2rem', marginTop: '0.5rem', marginBottom: '0.5rem', fontWeight: '800' }}>
            Your Collection
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            {cart.length} {cart.length === 1 ? 'artwork' : 'artworks'} in your cart
          </p>
        </div>

        {cart.length === 0 ? (
          <div style={{ padding: '8rem 2rem', textAlign: 'center', border: '2px solid var(--border-light)', borderRadius: '12px', background: 'var(--bg-secondary)' }}>
            <FaShoppingBag style={{ fontSize: '5rem', color: 'var(--accent-primary)', marginBottom: '2.5rem', opacity: 0.7 }} />
            <h2 style={{ marginBottom: '1rem', fontWeight: '800', fontSize: '2rem', color: 'var(--text-primary)' }}>
              Your collection is empty
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 3rem', lineHeight: '1.8' }}>
              Start exploring our gallery and add your favorite artworks to build your personal collection.
            </p>
            <Link to="/explore" style={{ textDecoration: 'none' }}>
              <button className="primary" style={{ padding: '1.2rem 3.5rem', fontSize: '0.9rem', fontWeight: '700' }}>
                Explore Gallery
              </button>
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '4rem', alignItems: 'start' }}>
            
            {/* Cart Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {cart.map((item, index) => (
                <div key={item._id || index} className="card" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', padding: '2rem', border: '1px solid var(--border-light)' }}>
                  <div style={{ width: '180px', height: '180px', background: 'var(--bg-secondary)', overflow: 'hidden', borderRadius: '8px', flexShrink: 0 }}>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.8rem', fontWeight: '800' }}>
                      {item.category}
                    </p>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                      {item.name}
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                      by {item.artist?.name || 'Artist'}
                    </p>
                    <button 
                      onClick={() => removeFromCart(item._id)} 
                      style={{ border: 'none', background: 'transparent', color: '#ef4444', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', transition: 'var(--transition-smooth)', fontWeight: '700', padding: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                      onMouseEnter={(e) => e.target.style.color = '#dc2626'}
                      onMouseLeave={(e) => e.target.style.color = '#ef4444'}
                    >
                      <FaTrash size={12} /> Remove
                    </button>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0, minWidth: '120px' }}>
                    <p style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                      ₹{(Number(item.price) || 0).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ background: 'var(--bg-secondary)', padding: '2.5rem', position: 'sticky', top: '100px', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '2.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                Order Summary
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem', marginBottom: '2.5rem', paddingBottom: '2.5rem', borderBottom: '1.5px solid var(--border-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Subtotal</span>
                  <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>₹{subtotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Tax (12% GST)</span>
                  <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>₹{tax.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Shipping</span>
                  <span style={{ fontWeight: '700', color: shipping === 0 ? 'var(--success)' : 'var(--text-primary)' }}>
                    {shipping === 0 ? '✓ FREE' : `₹${shipping.toLocaleString()}`}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.5rem', marginBottom: '2.5rem', color: 'var(--text-primary)' }}>
                <span>Total</span>
                <span style={{ color: 'var(--accent-primary)' }}>₹{total.toLocaleString()}</span>
              </div>

              <button className="primary" style={{ width: '100%', padding: '1.3rem', fontSize: '0.85rem', fontWeight: '700', marginBottom: '2rem' }}>
                Proceed to Checkout
              </button>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.9rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                  <FaLock style={{ color: 'var(--accent-primary)', fontSize: '0.85rem' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Secure checkout</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.9rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                  <FaTruck style={{ color: 'var(--accent-primary)', fontSize: '0.85rem' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Worldwide shipping</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.9rem', background: 'var(--bg-primary)', borderRadius: '8px' }}>
                  <FaCheckCircle style={{ color: 'var(--accent-primary)', fontSize: '0.85rem' }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Insured delivery</span>
                </div>
              </div>
            </div>

          </div>
        )}
      </section>
    </div>
  );
}

export default Cart;
