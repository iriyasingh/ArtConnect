import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event('storage'));
        navigate("/dashboard");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="animate-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 80px)', background: 'var(--bg-primary)' }}>
      {/* Left Side - Branding */}
      <div style={{ background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-hover) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'white', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '-50px', left: '10%', width: '250px', height: '250px', background: 'white', borderRadius: '50%' }}></div>
        </div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎨</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>ArtConnect</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, lineHeight: '1.8', maxWidth: '300px' }}>
            Discover authentic artworks from talented creators worldwide
          </p>
          <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
              <div>
                <h4 style={{ fontWeight: '700', marginBottom: '0.25rem' }}>Verified Artists</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Only authenticated creators</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
              <div>
                <h4 style={{ fontWeight: '700', marginBottom: '0.25rem' }}>Authentic Works</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Original pieces only</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div>
              <div>
                <h4 style={{ fontWeight: '700', marginBottom: '0.25rem' }}>Secure Checkout</h4>
                <p style={{ fontSize: '0.85rem', opacity: 0.8 }}>Safe transactions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '380px', width: '100%' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>Welcome Back</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Sign in to explore and collect art</p>
          </div>

          {error && (
            <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '1.2rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.85rem', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '1.2rem' }}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', display: 'block', marginBottom: '0.7rem', color: 'var(--text-primary)' }}>
                Email Address
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <FaEnvelope style={{ position: 'absolute', left: '1rem', color: 'var(--accent-primary)', fontSize: '0.9rem' }} />
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  placeholder="you@example.com"
                  style={{ paddingLeft: '2.8rem', fontSize: '0.95rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', display: 'block', marginBottom: '0.7rem', color: 'var(--text-primary)' }}>
                Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <FaLock style={{ position: 'absolute', left: '1rem', color: 'var(--accent-primary)', fontSize: '0.9rem' }} />
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder="••••••••"
                  style={{ paddingLeft: '2.8rem', fontSize: '0.95rem' }}
                />
              </div>
            </div>

            <button type="submit" className="primary" style={{ padding: '1.1rem', fontSize: '0.85rem', fontWeight: '700', marginTop: '0.5rem' }}>
              Sign In
            </button>
          </form>

          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Don&apos;t have an account? <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: '700', textDecoration: 'none' }}>Sign up here</Link>
            </p>
          </div>

          <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'var(--text-tertiary)', textAlign: 'center' }}>
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
