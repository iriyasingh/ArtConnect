import { FaCheckCircle } from "react-icons/fa";

function Toast({ message }) {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[10000] flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 text-sm font-medium text-slate-800 shadow-lg">
      <FaCheckCircle className="text-emerald-500" />
      <span>{message}</span>
    </div>
  );
}

export default Toast;
