import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Album, AlbumMutation, ArtistMutation } from '../../types';
import { RootState } from '../../app/store.ts';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchByArtist',
  async (artist_id) => {
    const response = await axiosApi.get<Album[]>('/albums/?artist=' + artist_id);
    return response.data;
  }
);

export const fetchAllAlbums = createAsyncThunk<Album[]>(
  'albums/fetchAll',
  async() => {
    const response = await axiosApi.get<Album[]>('/albums');
    return response.data;
  }
)

export const fetchOneAlbum = createAsyncThunk<Album | null, string>(
  'albums/fetchOne',
  async(album_id) => {
    const albumResponse = await axiosApi.get<Album | null>('/albums/' +  album_id);
    if(!albumResponse) {
      return null;
    }
    return albumResponse.data;
  }
);

export const createAlbum = createAsyncThunk<void, AlbumMutation, {state: RootState}>(
  'albums/create',
  async(albumMutation, {getState}) => {
    const token = getState().users.user?.token;

    const formData = new FormData();

    const keys = Object.keys(albumMutation) as (keyof ArtistMutation)[];
    keys.forEach(key => {
      const value = albumMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    return await axiosApi.post('/albums', formData, {headers: {'Authorization': 'Bearer ' + token}});
  }
);