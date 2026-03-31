import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="animate-reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)', background: 'var(--bg-secondary)', padding: '2rem' }}>
      <div style={{ maxWidth: '480px', width: '100%', padding: '3rem', background: 'var(--bg-primary)', borderRadius: '4px', boxShadow: 'var(--shadow-light)', border: '1px solid var(--border-light)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            background: 'var(--accent-primary)', 
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'white',
            margin: '0 auto 1.5rem'
          }}>A</div>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: '700' }}>Create Account</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Join the ArtConnect community</p>
        </div>
        
        {error && <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', fontSize: '0.85rem', border: '1px solid #FECACA' }}>{error}</div>}
        
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', display: 'block', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>Full Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder="John Doe" style={{ fontSize: '0.95rem' }} />
          </div>
          
          <div>
            <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', display: 'block', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>Email Address</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required placeholder="you@example.com" style={{ fontSize: '0.95rem' }} />
          </div>
          
          <div>
            <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', display: 'block', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>I am a...</label>
            <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ fontSize: '0.95rem' }}>
              <option value="Collector">Art Collector</option>
              <option value="Artist">Artist</option>
            </select>
          </div>
          
          <div>
            <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', display: 'block', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required placeholder="••••••••" style={{ fontSize: '0.95rem' }} />
          </div>
          
          <button type="submit" className="primary" style={{ marginTop: '0.5rem', padding: '1rem', fontSize: '0.85rem', fontWeight: '600' }}>Create Account</button>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', fontWeight: '600', textDecoration: 'none' }}>Sign in</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
