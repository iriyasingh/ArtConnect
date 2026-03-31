import Artwork from "../models/Artwork.js";

export const getArtworks = async (_req, res) => {
  try {
    const artworks = await Artwork.find().populate("artist");
    res.json({ message: "success", data: artworks });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getArtworkById = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id)
      .populate("artist")
      .populate("comments.user", "name");

    if (!artwork) return res.status(404).json({ error: "Artwork not found" });
    res.json(artwork);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ error: "Artwork not found" });

    artwork.comments.push({ user: req.userId, text });
    await artwork.save();

    const updated = await Artwork.findById(req.params.id).populate("comments.user", "name");
    res.status(201).json(updated.comments[updated.comments.length - 1]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const createArtwork = async (req, res) => {
  try {
    const artwork = new Artwork(req.body);
    await artwork.save();
    res.status(201).json({ message: "Artwork created", data: artwork });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
