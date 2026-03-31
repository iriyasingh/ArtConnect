import { Link } from "react-router-dom";
import { FaTrash, FaShoppingBag } from "react-icons/fa";

function Cart({ cart, removeFromCart }) {
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const tax = subtotal * 0.12;
  const shipping = subtotal > 50000 ? 0 : 1500;
  const total = subtotal + tax + shipping;

  return (
    <div className="container animate-reveal" style={{ padding: '8rem 2rem' }}>
      <div style={{ marginBottom: '5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>Collection Bag</h1>
        <p style={{ color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.8rem' }}>{cart.length} items selected for acquisition</p>
      </div>

      {cart.length === 0 ? (
        <div style={{ padding: '8rem', textAlign: 'center', border: '1px solid var(--border-light)' }}>
          <FaShoppingBag style={{ fontSize: '3rem', color: 'var(--text-muted)', marginBottom: '2rem' }} />
          <h2 style={{ marginBottom: '2.5rem', fontWeight: '400' }}>Your bag is currently empty.</h2>
          <Link to="/explore"><button className="primary">Browse the Collection</button></Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '6rem', alignItems: 'start' }}>
          
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {cart.map((item, index) => (
              <div key={item._id || index} style={{ display: 'flex', paddingBottom: '3rem', borderBottom: '1px solid var(--border-light)', gap: '3rem', alignItems: 'center' }}>
                <div style={{ width: '180px', height: '180px', background: '#F5F5F5', overflow: 'hidden' }}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                   <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.5rem' }}>{item.category}</p>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{item.name}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>by {item.artist?.name || 'Artist'}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '1.4rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--accent-gold)' }}>₹{item.price.toLocaleString()}</p>
                  <button 
                    onClick={() => removeFromCart(item._id)} 
                    style={{ border: 'none', background: 'transparent', color: '#999', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer' }}
                  >
                    Remove from bag
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Acquisition Summary */}
          <div style={{ background: '#F9F9F9', padding: '4rem', position: 'sticky', top: '120px' }}>
            <h2 style={{ fontSize: '2rem', marginBottom: '3rem' }}>Acquisition Summary</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Tax estimate (12% GST)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-medium)', paddingBottom: '1.5rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Insured Shipping</span>
                <span>{shipping === 0 ? 'COMPLIMENTARY' : `₹${shipping.toLocaleString()}`}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '1.8rem', marginTop: '1rem' }}>
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <button className="primary" style={{ width: '100%', padding: '1.5rem', fontSize: '0.9rem' }}>
              Finalize Acquisition
            </button>
            <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Fully Insured Worldwide Delivery
            </p>
          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;