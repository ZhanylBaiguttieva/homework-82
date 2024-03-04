import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';
import { TrackListened } from '../../types';

export const addTrackToHistory = createAsyncThunk<void, string, {state: RootState}>(
  'tracksListened/create',
  async(trackId, {getState}) => {
      const token = getState().users.user?.token;
      const trackBody = {
        _id: trackId,
      };
      await axiosApi.post('/track_history', trackBody, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
  }
);

export const fetchTracksListened = createAsyncThunk<TrackListened[],void,{state: RootState}>(
  'tracksListened/fetchAll',
  async (_, {getState}) => {
    const token =  getState().users.user?.token;

    if(token) {
      const response = await axiosApi.get('/track_history', {
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
      return response.data;
    } else {
      return [];
    }
  }
);
