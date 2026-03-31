import { Navigate } from "react-router-dom";
import { getStoredUser } from "../utils/storage";

function ProtectedRoute({ children }) {
  const user = getStoredUser();

  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;