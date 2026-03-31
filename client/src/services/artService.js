import { apiRequest } from "./apiClient";

export const getArtists = () => apiRequest("/artists");
export const getArtworks = () => apiRequest("/artworks");
export const getArtworkById = (id) => apiRequest(`/artworks/${id}`);

export const createArtwork = (payload) =>
  apiRequest("/artworks", {
    method: "POST",
    auth: true,
    body: JSON.stringify(payload),
  });

export const addArtworkComment = (id, text) =>
  apiRequest(`/artworks/${id}/comments`, {
    method: "POST",
    auth: true,
    body: JSON.stringify({ text }),
  });
