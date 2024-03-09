import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Album, AlbumMutation } from '../../types';

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

export const createAlbum = createAsyncThunk<void, AlbumMutation>(
  'albums/create',
  async(albumMutation) => {

    const formData = new FormData();

    const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];
    keys.forEach(key => {
      const value = albumMutation[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });
    return await axiosApi.post('/albums', formData);
  }
);

export const deleteAlbum = createAsyncThunk<void,string>(
  'albums/delete',
  async(albumId) => {
      return await axiosApi.delete('/albums/' + albumId);
  }
);

export const publishAlbum = createAsyncThunk<void, string>(
  'albums/publish',
  async(albumId) => {

    return await axiosApi.patch(  `/albums/${albumId}/togglePublished`);
  }
);