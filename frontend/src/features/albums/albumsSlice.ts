import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { createAlbum, fetchAlbums, fetchOneAlbum } from './albumsThunks.ts';

interface AlbumsState {
  data: Album[];
  album: Album | null;
  fetching: boolean;
  fetchingOneAlbum: boolean;
  creating: boolean;
}

const initialState: AlbumsState = {
  data: [],
  album: null,
  fetching: false,
  fetchingOneAlbum: false,
  creating: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbums.pending, (state) => {
      state.fetching = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state, {payload: albums}) => {
      state.fetching = false;
      state.data = albums;
    });
    builder.addCase(fetchAlbums.rejected, (state) => {
      state.fetching = false;
    });
    builder.addCase(fetchOneAlbum.pending, (state) => {
      state.fetchingOneAlbum = true;
    });
    builder.addCase(fetchOneAlbum.fulfilled, (state, {payload: album}) => {
      state.fetchingOneAlbum = false;
      state.album = album;
    });
    builder.addCase(fetchOneAlbum.rejected, (state) => {
      state.fetchingOneAlbum = false;
    });

    builder.addCase(createAlbum.pending, (state) => {
      state.creating = true;
    });
    builder.addCase(createAlbum.fulfilled, (state) => {
      state.creating = false;

    });
    builder.addCase(createAlbum.rejected, (state) => {
      state.creating = false;
    });
  }
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.data;
export const selectOneAlbum = (state: RootState) => state.albums.album;
export const selectAlbumsFetching = (state: RootState) => state.albums.fetching;

export const selectCreatingAlbum = (state: RootState) => state.albums.creating;