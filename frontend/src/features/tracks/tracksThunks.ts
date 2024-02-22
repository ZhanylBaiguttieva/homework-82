import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Track } from '../../types';

export const fetchTracks = createAsyncThunk(
  'tracks/fetchAll',
  async () => {
    const response = await axiosApi.get<Track[]>('/tracks');
    return response.data;
  }
);