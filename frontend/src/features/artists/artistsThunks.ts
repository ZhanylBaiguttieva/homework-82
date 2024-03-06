import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Artist, ArtistMutation } from '../../types';
import { RootState } from '../../app/store.ts';

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

export const createArtist = createAsyncThunk<void, ArtistMutation,{state: RootState}>(
  'artists/create',
  async(artistMutation, {getState}) => {
    const token = getState().users.user?.token;

    const formData = new FormData();

    const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];
    keys.forEach(key => {
      const value = artistMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    return await axiosApi.post('/artists', formData, {headers: {'Authorization': 'Bearer ' + token}});
  }
);