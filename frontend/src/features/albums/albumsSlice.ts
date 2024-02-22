import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchAlbums } from './albumsThunks.ts';

interface AlbumsState {
  data: Album[];
  fetching: boolean;
}

const initialState: AlbumsState = {
  data: [],
  fetching: false,
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
  }
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.data;
export const selectAlbumsFetching = (state: RootState) => state.albums.fetching;