import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../features/artists/artistsSlice.ts';
import { albumsReducer } from '../features/albums/albumsSlice.ts';
import { tracksReducer } from '../features/tracks/tracksSlice.ts';
import { usersReducer } from '../features/users/usersSlice.ts';
import { tracksListenedReducer } from '../features/trackHistories/TracksListenedSlice.ts';
import {persistReducer, FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';

const usersPersistConfig = {
  key:'music:users',
  storage: storage,
  whiteList: ['user'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  tracksListened: tracksListenedReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
    },
  }),
});
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;