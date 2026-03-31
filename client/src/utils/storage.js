import { STORAGE_KEYS } from "./constants";

export const getToken = () => localStorage.getItem(STORAGE_KEYS.token);

export const getStoredUser = () => {
  const value = localStorage.getItem(STORAGE_KEYS.user);
  return value ? JSON.parse(value) : null;
};

export const setAuthData = ({ token, user }) => {
  localStorage.setItem(STORAGE_KEYS.token, token);
  localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
  window.dispatchEvent(new Event("storage"));
};

export const clearAuthData = () => {
  localStorage.removeItem(STORAGE_KEYS.token);
  localStorage.removeItem(STORAGE_KEYS.user);
  window.dispatchEvent(new Event("storage"));
};
