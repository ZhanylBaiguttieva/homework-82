import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Album } from '../../types';

export const fetchAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchAll',
  async (artist_id) => {
    const response = await axiosApi.get<Album[]>('/albums/?artist=' + artist_id);
    return response.data;
  }
);

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