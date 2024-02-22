import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Track } from '../../types';

export const fetchTracks = createAsyncThunk(
  'tracks/fetchAll',
  async (album_id: string) => {
    const response = await axiosApi.get<Track[]>('/tracks?album=' + album_id);
    return response.data;
  }
);