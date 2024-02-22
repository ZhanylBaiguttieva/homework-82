import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Artist } from '../../types';

export const fetchArtists = createAsyncThunk(
  'artists/fetchAll',
  async () => {
    const response = await axiosApi.get<Artist[]>('/artists');
    return response.data;
  }
);

export const fetchOneArtist = createAsyncThunk<Artist| null, string>(
  'albums/fetchOne',
  async(artist_id) => {
    const artistResponse = await axiosApi.get<Artist | null>('/artists/' +  artist_id);
    if(!artistResponse) {
      return null;
    }
    return artistResponse.data;
  }
);