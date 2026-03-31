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
    <div className="container animate-reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ maxWidth: '450px', width: '100%', padding: '4rem', background: 'white', border: '1px solid var(--border-light)' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>Welcome Back</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '0.9rem' }}>Access your personalized gallery collection.</p>
        
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email Address" />
          </div>
          <div>
            <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" />
          </div>
          
          <button type="submit" className="primary" style={{ marginTop: '1rem', padding: '1.2rem' }}>Sign In</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          New to ArtConnect? <Link to="/register" style={{ color: 'var(--text-primary)', fontWeight: '600', textDecoration: 'none', borderBottom: '1px solid currentColor' }}>Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;