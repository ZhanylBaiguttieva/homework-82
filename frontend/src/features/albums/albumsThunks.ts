import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Album } from '../../types';

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAll',
  async (artist_id:string) => {
    const response = await axiosApi.get<Album[]>('/albums/?artist=' + artist_id);
    return response.data;
  }
);