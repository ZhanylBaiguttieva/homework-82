import { Track } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { createTrack, deleteTrack, fetchTracks } from './tracksThunks.ts';

interface TracksState {
  tracks: Track[];
  fetching: boolean;
  creating: boolean;
  deleting: boolean;
}

const initialState: TracksState = {
  tracks: [],
  fetching: false,
  creating: false,
  deleting: false,
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

    builder.addCase(createTrack.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createTrack.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(createTrack.rejected, (state) => {
      state.creating = false;
    });

    builder.addCase(deleteTrack.pending, (state) => {
      state.deleting = true;
    });
    builder.addCase(deleteTrack.fulfilled, (state) => {
      state.deleting = false;
    });
    builder.addCase(deleteTrack.rejected, (state) => {
      state.deleting = false;
    });
  }
});

export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.tracks;
export const selectTracksFetching = (state: RootState) => state.tracks.fetching;

export const selectCreatingTrack = (state: RootState) => state.tracks.creating;

export const selectDeletingTrack = (state: RootState) => state.tracks.deleting;