import { Link } from "react-router-dom";

function About() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          About ArtConnect
        </p>
        <h1 className="mt-3 text-4xl font-bold text-slate-900 sm:text-5xl">Curating Stories Through Art</h1>
        <p className="mt-4 text-slate-600">
          ArtConnect is a digital-first gallery where emerging and established creators can present original work,
          connect with collectors, and build long-term visibility. We focus on premium presentation, trusted
          transactions, and meaningful discovery.
        </p>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-lg font-semibold text-slate-900">For Collectors</h3>
          <p className="text-slate-600">Discover curated pieces with transparent artist context and secure checkout.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-lg font-semibold text-slate-900">For Artists</h3>
          <p className="text-slate-600">List your work, share your story, and receive visibility from global audiences.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-2 text-lg font-semibold text-slate-900">For Community</h3>
          <p className="text-slate-600">Engage through reflections, feedback, and exhibition-ready storytelling.</p>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link to="/explore">
          <button className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-slate-700">
            Explore Collections
          </button>
        </Link>
      </div>
    </div>
  );
}

export default About;
