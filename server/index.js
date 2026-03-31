import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import connectDB from './database.js';
import Artist from './models/Artist.js';
import Artwork from './models/Artwork.js';
import User from './models/User.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

app.use(cors());
app.use(express.json());

connectDB();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Unauthorized' });
    req.userId = decoded.id;
    next();
  });
};

// --- AUTH ROUTES ---

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ token, user: { id: user._id, name, email, role } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { id: user._id, name: user.name, email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Current User
app.get('/api/auth/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- ARTIST ROUTES ---

// Get all artists
app.get('/api/artists', async (req, res) => {
  try {
    const artists = await Artist.find();
    res.json({ message: "success", data: artists });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- ARTWORK ROUTES ---

// Get all artworks
app.get('/api/artworks', async (req, res) => {
  try {
    const artworks = await Artwork.find().populate('artist');
    res.json({ message: "success", data: artworks });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET Single Artwork (Detailed)
app.get('/api/artworks/:id', async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id)
      .populate('artist')
      .populate('comments.user', 'name'); // Only populate name for comments
    if (!artwork) return res.status(404).json({ error: 'Artwork not found' });
    res.json(artwork);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST a comment (Protected)
app.post('/api/artworks/:id/comments', verifyToken, async (req, res) => {
  try {
    const { text } = req.body;
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ error: 'Artwork not found' });

    artwork.comments.push({ user: req.userId, text });
    await artwork.save();

    // Re-populate and return the artwork
    const updated = await Artwork.findById(req.params.id).populate('comments.user', 'name');
    res.status(201).json(updated.comments[updated.comments.length - 1]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Create artwork (Protected)
app.post('/api/artworks', verifyToken, async (req, res) => {
  try {
    const artwork = new Artwork(req.body);
    await artwork.save();
    res.status(201).json({ message: "Artwork created", data: artwork });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- UTILS ---

app.get('/', (req, res) => {
  res.json({ message: "ArtConnect API is running" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
