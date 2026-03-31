import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Artist from './models/Artist.js';
import Artwork from './models/Artwork.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const artists = [
  {
    name: "Aarav Sharma",
    location: "Jaipur, India",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop",
    type: "week"
  },
  {
    name: "Elena Rodriguez",
    location: "Madrid, Spain",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2000&auto=format&fit=crop",
    type: "popular"
  },
  {
    name: "Kenji Tanaka",
    location: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2000&auto=format&fit=crop",
    type: "trending"
  }
];

const artworks = [
  {
    name: "Ethereal Bloom",
    price: 4500,
    tag: "FEATURED",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2000&auto=format&fit=crop",
    category: "Digital Art",
    description: "A mesmerizing exploration of organic fractals and celestial light. Ethereal Bloom represents the unseen connection between deep nature and digital consciousness.",
    location: "Jaipur International Gallery, Rajasthan"
  },
  {
    name: "Urban Velocity",
    price: 3200,
    tag: "TRENDING",
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=2000&auto=format&fit=crop",
    category: "Abstract",
    description: "Capturing the frantic yet rhythmic pulse of modern metropolitan life. Urban Velocity uses bold strokes and cold palettes to evoke the feeling of standing in a moving crowd.",
    location: "Museo del Arte Contemporáneo, Madrid"
  },
  {
    name: "Midnight Echo",
    price: 5800,
    tag: "NEW",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=2000&auto=format&fit=crop",
    category: "Painting",
    description: "A hauntingly beautiful soundscape captured in oil. Midnight Echo explores themes of solitude and the quiet reflections found in the stillness of the night.",
    location: "Ginza Art House, Tokyo"
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    await Artist.deleteMany({});
    await Artwork.deleteMany({});

    const createdArtists = await Artist.insertMany(artists);
    console.log("Artists seeded!");

    // Assign artworks to random artists
    const artworkData = artworks.map((art, index) => ({
      ...art,
      artist: createdArtists[index % createdArtists.length]._id
    }));

    await Artwork.insertMany(artworkData);
    console.log("Artworks seeded!");

    mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();
