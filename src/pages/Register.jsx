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
    <div className="container animate-reveal" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ maxWidth: '500px', width: '100%', padding: '4rem', background: 'white', border: '1px solid var(--border-light)' }}>
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>Create Account</h1>
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '0.9rem' }}>Join the global art collective today.</p>
        
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
        
        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Full Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required placeholder="Full Name" />
          </div>
          <div>
            <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Email Address</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required placeholder="Email Address" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div>
              <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Role</label>
              <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} style={{ borderRadius: 0 }}>
                <option value="Collector">Collector</option>
                <option value="Artist">Artist</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '600', display: 'block', marginBottom: '0.5rem' }}>Password</label>
              <input type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required placeholder="Password" />
            </div>
          </div>
          
          <button type="submit" className="primary" style={{ marginTop: '1rem', padding: '1.2rem' }}>Register Now</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: '600', textDecoration: 'none', borderBottom: '1px solid currentColor' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
