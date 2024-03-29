import mongoose, { Schema, Types } from 'mongoose';
import Artist from './Artist';

const AlbumSchema = new mongoose.Schema({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist does not exist!',
    },
  },
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  image: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;
