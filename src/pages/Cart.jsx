import { Link } from "react-router-dom";
import { FaTrash, FaShoppingBag } from "react-icons/fa";

function Cart({ cart, removeFromCart }) {
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const tax = subtotal * 0.12;
  const shipping = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + tax + shipping;

  return (
    <div className="container animate-reveal" style={{ padding: '5rem 0' }}>
      <div style={{ marginBottom: '4rem' }}>
        <h1 style={{ fontSize: '2.8rem', marginBottom: '0.5rem', fontWeight: '700' }}>Your Collection</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>{cart.length} {cart.length === 1 ? 'artwork' : 'artworks'} selected</p>
      </div>

      {cart.length === 0 ? (
        <div style={{ padding: '6rem 2rem', textAlign: 'center', border: '1px solid var(--border-light)', borderRadius: '4px', background: 'var(--bg-secondary)' }}>
          <FaShoppingBag style={{ fontSize: '3rem', color: 'var(--text-tertiary)', marginBottom: '2rem' }} />
          <h2 style={{ marginBottom: '2rem', fontWeight: '600', fontSize: '1.5rem' }}>Your collection is empty</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '0.95rem' }}>Explore our featured artworks and start building your collection.</p>
          <Link to="/explore" style={{ textDecoration: 'none' }}><button className="primary">Browse Artworks</button></Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem', alignItems: 'start' }}>
          
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {cart.map((item, index) => (
              <div key={item._id || index} style={{ display: 'flex', paddingBottom: '2rem', borderBottom: '1px solid var(--border-light)', gap: '2rem', alignItems: 'flex-start' }}>
                <div style={{ width: '140px', height: '140px', background: 'var(--bg-secondary)', overflow: 'hidden', borderRadius: '4px', flexShrink: 0 }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', fontWeight: '600' }}>{item.category}</p>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem', fontWeight: '600' }}>{item.name}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>by {item.artist?.name || 'Artist'}</p>
                  <button 
                    onClick={() => removeFromCart(item._id)} 
                    style={{ border: 'none', background: 'transparent', color: 'var(--text-tertiary)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer', transition: 'var(--transition-smooth)', fontWeight: '600' }}
                  >
                    Remove
                  </button>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--accent-primary)' }}>₹{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ background: 'var(--bg-secondary)', padding: '2.5rem', position: 'sticky', top: '100px', borderRadius: '4px' }}>
            <h2 style={{ fontSize: '1.4rem', marginBottom: '2rem', fontWeight: '700' }}>Order Summary</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                <span style={{ fontWeight: '500' }}>₹{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Tax (12% GST)</span>
                <span style={{ fontWeight: '500' }}>₹{tax.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', borderBottom: '1px solid var(--border-medium)', paddingBottom: '1rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                <span style={{ fontWeight: '500' }}>{shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.3rem', marginTop: '0.5rem' }}>
                <span>Total</span>
                <span style={{ color: 'var(--accent-primary)' }}>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button className="primary" style={{ width: '100%', padding: '1.2rem', fontSize: '0.85rem' }}>
              Proceed to Checkout
            </button>
            <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-tertiary)', fontSize: '0.75rem', lineHeight: '1.5' }}>
              All items ship insured worldwide
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;
