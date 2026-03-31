import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  image: { type: String },
  type: { type: String, enum: ['week', 'popular', 'trending', 'visited', 'all'], default: 'all' }
}, { timestamps: true });

const Artist = mongoose.model('Artist', artistSchema);
export default Artist;
