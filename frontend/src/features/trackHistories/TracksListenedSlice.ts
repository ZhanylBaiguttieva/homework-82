import { TrackListened } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTracksListened } from './TracksListenedThunk.ts';
import { RootState } from '../../app/store.ts';

interface TracksListenedState {
  data: TrackListened[];
  fetching: boolean;
}

const initialState: TracksListenedState = {
  data: [],
  fetching: false,
};

export const tracksListenedSlice = createSlice({
  name:'tracksListened',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTracksListened.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchTracksListened.fulfilled, (state,{payload: data}) => {
      state.fetching = false;
      state.data = data;
    });
    builder.addCase(fetchTracksListened.rejected, (state) => {
      state.fetching = false;
    });
  }
});

export const tracksListenedReducer = tracksListenedSlice.reducer;
export const selectTracksListened = (state: RootState) => state.tracksListened.data;
export const selectFetching  = (state: RootState) => state.tracksListened.fetching;