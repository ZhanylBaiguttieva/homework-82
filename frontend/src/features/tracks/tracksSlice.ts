import { Track } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchTracks } from './tracksThunks.ts';

interface TracksState {
  tracks: Track[];
  fetching: boolean;
}

const initialState: TracksState = {
  tracks: [],
  fetching: false,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracks.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state, {payload: tracks}) => {
      state.fetching = false;
      state.tracks = tracks;
    });
    builder.addCase(fetchTracks.rejected, (state) => {
      state.fetching = false;
    });
  }
});

export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksFetching = (state: RootState) => state.tracks.fetching;