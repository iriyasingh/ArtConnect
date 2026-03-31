import { apiRequest } from "./apiClient";

export const loginUser = (payload) =>
  apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const registerUser = (payload) =>
  apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
