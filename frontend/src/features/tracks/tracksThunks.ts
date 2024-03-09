import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Track, TrackMutation } from '../../types';

export const fetchTracks = createAsyncThunk(
  'tracks/fetchAll',
  async (album_id: string) => {
    const response = await axiosApi.get<Track[]>('/tracks?album=' + album_id);
    return response.data;
  }
);


export const createTrack = createAsyncThunk<void, TrackMutation>(
  'tracks/create',
  async(trackMutation) => {
    return await axiosApi.post('/tracks', trackMutation);
  }
);