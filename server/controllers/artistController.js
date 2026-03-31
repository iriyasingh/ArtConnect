import Artist from "../models/Artist.js";

export const getArtists = async (_req, res) => {
  try {
    const artists = await Artist.find();
    res.json({ message: "success", data: artists });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
