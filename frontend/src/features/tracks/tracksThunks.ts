import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Track, TrackMutation } from '../../types';
import { RootState } from '../../app/store.ts';

export const fetchTracks = createAsyncThunk(
  'tracks/fetchAll',
  async (album_id: string) => {
    const response = await axiosApi.get<Track[]>('/tracks?album=' + album_id);
    return response.data;
  }
);


export const createTrack = createAsyncThunk<void, TrackMutation, {state: RootState}>(
  'tracks/create',
  async(trackMutation, {getState}) => {
    const token = getState().users.user?.token;
    return await axiosApi.post('/tracks', trackMutation, {headers: {'Authorization': 'Bearer ' + token}});
  }
);