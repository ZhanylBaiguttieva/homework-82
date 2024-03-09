import { Artist } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { createArtist, deleteArtist, fetchArtists, fetchOneArtist } from './artistsThunks.ts';

interface ArtistsState {
  items: Artist[];
  artist: Artist | null;
  fetching: boolean;
  fetchingOneArtist: boolean;
  creating: boolean;
  deleteLoading: boolean;
}

const initialState: ArtistsState = {
  items: [],
  artist: null,
  fetching: false,
  fetchingOneArtist: false,
  creating: false,
  deleteLoading: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, {payload: artists}) => {
      state.fetching = false;
      state.items = artists;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.fetching = false;
    });
    builder.addCase(fetchOneArtist.pending, (state) => {
      state.fetchingOneArtist = true;
    });
    builder.addCase(fetchOneArtist.fulfilled, (state, {payload: artist}) => {
      state.fetchingOneArtist = false;
      state.artist = artist;
    });
    builder.addCase(fetchOneArtist.rejected, (state) => {
      state.fetchingOneArtist = false;
    });

    builder.addCase(createArtist.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createArtist.fulfilled, (state) => {
      state.creating = false;
    });
    builder.addCase(createArtist.rejected, (state) => {
      state.creating = false;
    });

    builder.addCase(deleteArtist.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteArtist.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteArtist.rejected, (state) => {
      state.deleteLoading = false;
    });
  }
});


export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.items;
export const selectArtist = (state: RootState) => state.artists.artist;

export const selectCreating = (state: RootState) => state.artists.creating;
export const selectArtistsFetching = (state: RootState) => state.artists.fetching;
export const selectOneArtistFetching = (state: RootState) => state.artists.fetchingOneArtist;
export const selectDeletingArtist = (state: RootState) => state.artists.deleteLoading;