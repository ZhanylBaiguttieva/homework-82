import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Artist, ArtistMutation } from '../../types';

export const fetchArtists = createAsyncThunk(
  'artists/fetchAll',
  async () => {
    const response = await axiosApi.get<Artist[]>('/artists');
    return response.data;
  }
);

export const fetchOneArtist = createAsyncThunk<Artist| null, string>(
  'artists/fetchOne',
  async(artist_id) => {
    const artistResponse = await axiosApi.get<Artist | null>('/artists/' +  artist_id);
    if(!artistResponse) {
      return null;
    }
    return artistResponse.data;
  }
);

export const createArtist = createAsyncThunk<void, ArtistMutation>(
  'artists/create',
  async(artistMutation) => {

    const formData = new FormData();

    const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];
    keys.forEach(key => {
      const value = artistMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    return await axiosApi.post('/artists', formData);
  }
);

export const deleteArtist = createAsyncThunk<void,string>(
  'artists/delete',
  async(artistId) => {
    return await axiosApi.delete('/artists/' + artistId);
  }
);

export const publishArtist = createAsyncThunk<void, string>(
  'artists/publish',
  async(artistId) => {
    return await axiosApi.patch(  `/artists/${artistId}/togglePublished`);
  }
);