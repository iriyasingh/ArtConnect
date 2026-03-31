import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Collector" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
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
      <div style={{ background: 'linear-gradient(135deg, #8B6F47 0%, var(--accent-dark) 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '4rem', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
          <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'white', borderRadius: '50%' }}></div>
          <div style={{ position: 'absolute', bottom: '-50px', left: '10%', width: '250px', height: '250px', background: 'white', borderRadius: '50%' }}></div>
        </div>
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎨</div>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>ArtConnect</h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.95, lineHeight: '1.8', maxWidth: '300px', marginBottom: '3rem' }}>
            Join a community of art lovers and talented creators worldwide
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'flex-start' }}>
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '1rem' }}>For Collectors:</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
                <li>✓ Curated artwork collection</li>
                <li>✓ Secure purchasing</li>
                <li>✓ Expert recommendations</li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '1rem' }}>For Artists:</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
                <li>✓ Global audience reach</li>
                <li>✓ Artist verification</li>
                <li>✓ Direct sales platform</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Registration Form */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '380px', width: '100%' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2.2rem', marginBottom: '0.5rem', fontWeight: '800', color: 'var(--text-primary)' }}>Create Account</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Join the ArtConnect community</p>
          </div>

          {error && (
            <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '1.2rem', borderRadius: '8px', marginBottom: '2rem', fontSize: '0.85rem', border: '1px solid #FECACA', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '1.2rem' }}>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', display: 'block', marginBottom: '0.7rem', color: 'var(--text-primary)' }}>
                Full Name
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <FaUser style={{ position: 'absolute', left: '1rem', color: 'var(--accent-primary)', fontSize: '0.9rem' }} />
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                  required 
                  placeholder="John Doe"
                  style={{ paddingLeft: '2.8rem', fontSize: '0.95rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', display: 'block', marginBottom: '0.7rem', color: 'var(--text-primary)' }}>
                Email Address
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <FaEnvelope style={{ position: 'absolute', left: '1rem', color: 'var(--accent-primary)', fontSize: '0.9rem' }} />
                <input 
                  type="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  required 
                  placeholder="you@example.com"
                  style={{ paddingLeft: '2.8rem', fontSize: '0.95rem' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', display: 'block', marginBottom: '0.7rem', color: 'var(--text-primary)' }}>
                I am a...
              </label>
              <select 
                value={formData.role} 
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                style={{ fontSize: '0.95rem', paddingLeft: '1rem' }}
              >
                <option value="Collector">Art Collector</option>
                <option value="Artist">Artist</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '700', display: 'block', marginBottom: '0.7rem', color: 'var(--text-primary)' }}>
                Password
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <FaLock style={{ position: 'absolute', left: '1rem', color: 'var(--accent-primary)', fontSize: '0.9rem' }} />
                <input 
                  type="password" 
                  value={formData.password} 
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                  required 
                  placeholder="••••••••"
                  style={{ paddingLeft: '2.8rem', fontSize: '0.95rem' }}
                />
              </div>
            </div>

            <button type="submit" className="primary" style={{ padding: '1.1rem', fontSize: '0.85rem', fontWeight: '700', marginTop: '0.5rem' }}>
              Create Account
            </button>
          </form>

          <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: '700', textDecoration: 'none' }}>Sign in here</Link>
            </p>
          </div>

          <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: 'var(--text-tertiary)', textAlign: 'center' }}>
            By signing up, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
