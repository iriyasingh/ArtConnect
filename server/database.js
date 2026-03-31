import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Artist from './models/Artist.js';
import Artwork from './models/Artwork.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    console.log('Connected to MongoDB Atlas');
    await seedData();
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    const artistCount = await Artist.countDocuments();
    if (artistCount === 0) {
      const artists = [
        { name: "Raji Pavithran", location: "Chengannur, India", image: "/images/artist1.jpg", type: "week" },
        { name: "Neeta Singh", location: "Ghaziabad, India", image: "/images/artist2.jpg", type: "popular" },
        { name: "Ranjit Singh Kurmi", location: "Virar, India", image: "/images/artist3.jpg", type: "trending" },
        { name: "Monalisa Sarkar Mitra", location: "Ranaghat, India", image: "/images/artist4.jpg", type: "visited" },
        { name: "Sekhar Roy", location: "Kolkata, India", image: "/images/artist5.jpg", type: "popular" },
        { name: "Kanchanmala Ghosh", location: "India", image: "/images/artist6.jpg", type: "week" }
      ];

      const createdArtists = await Artist.insertMany(artists);
      console.log('Artists seeded');

      const artworks = [
        { name: "Painting", price: 500, artist: createdArtists[0]._id, category: "Painting", image: "/images/art1.jpg", tag: "FEATURED" },
        { name: "Sketch Art", price: 300, artist: createdArtists[1]._id, category: "Sketching", image: "/images/art2.jpg", tag: "TRENDING" },
        { name: "Calligraphy", price: 400, artist: createdArtists[2]._id, category: "Calligraphy", image: "/images/art3.jpg", tag: "NEW" }
      ];

      await Artwork.insertMany(artworks);
      console.log('Artworks seeded');
    }
  } catch (err) {
    console.error('Error seeding data:', err.message);
  }
};

export default connectDB;
