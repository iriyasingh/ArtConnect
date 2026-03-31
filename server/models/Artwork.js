import mongoose from 'mongoose';

const artworkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'Artist' },
  tag: { type: String, enum: ['FEATURED', 'TRENDING', 'NEW'], default: 'NEW' },
  image: { type: String },
  category: { type: String },
  description: { type: String },
  location: { type: String, default: 'Global Gallery' },
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

const Artwork = mongoose.model('Artwork', artworkSchema);
export default Artwork;
