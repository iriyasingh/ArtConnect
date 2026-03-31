import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import { setAuthData } from "../utils/storage";

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", role: "Collector" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(formData);
      setAuthData({ token: data.token, user: data.user });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Server error. Please try again.");
    }
  };

  return (
    <div className="mx-auto flex min-h-[75vh] w-full max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-center text-3xl font-bold text-slate-900">Create Account</h1>
        <p className="mt-2 text-center text-sm text-slate-600">Join the global art collective today.</p>

        {error && <p className="mt-4 rounded-lg bg-rose-50 px-3 py-2 text-center text-sm text-rose-600">{error}</p>}

        <form onSubmit={handleRegister} className="mt-6 space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Full Name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none ring-slate-400 focus:ring-2"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              placeholder="Email Address"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none ring-slate-400 focus:ring-2"
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">Role</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none ring-slate-400 focus:ring-2"
              >
                <option value="Collector">Collector</option>
                <option value="Artist">Artist</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                placeholder="Password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none ring-slate-400 focus:ring-2"
              />
            </div>
          </div>

          <button type="submit" className="w-full rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700">
            Register Now
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-slate-900 underline underline-offset-2">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
