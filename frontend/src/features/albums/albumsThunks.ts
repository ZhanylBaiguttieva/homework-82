import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Album } from '../../types';

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAll',
  async () => {
    const response = await axiosApi.get<Album[]>('/albums');
    return response.data;
  }
);