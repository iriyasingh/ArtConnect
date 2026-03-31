import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <div className="animate-reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 80px)', background: 'var(--bg-secondary)', padding: '2rem' }}>
      <div style={{ maxWidth: '420px', width: '100%', padding: '3rem', background: 'var(--bg-primary)', borderRadius: '4px', boxShadow: 'var(--shadow-light)', border: '1px solid var(--border-light)' }}>
        
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
          <h1 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', fontWeight: '700' }}>Welcome Back</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sign in to your ArtConnect account</p>
        </div>
        
        {error && <div style={{ background: '#FEE2E2', color: '#991B1B', padding: '1rem', borderRadius: '4px', marginBottom: '2rem', fontSize: '0.85rem', border: '1px solid #FECACA' }}>{error}</div>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', display: 'block', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>Email Address</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="you@example.com"
              style={{ fontSize: '0.95rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: '600', display: 'block', marginBottom: '0.6rem', color: 'var(--text-primary)' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              placeholder="••••••••"
              style={{ fontSize: '0.95rem' }}
            />
          </div>
          
          <button type="submit" className="primary" style={{ marginTop: '0.5rem', padding: '1rem', fontSize: '0.85rem', fontWeight: '600' }}>Sign In</button>
        </form>

        <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Don&apos;t have an account? <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: '600', textDecoration: 'none' }}>Sign up</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
