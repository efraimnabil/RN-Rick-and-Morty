import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { rickAndMortyApi } from '@/services/rickAndMortyApi';
import favoritesReducer from './slices/favoritesSlice';

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    [rickAndMortyApi.reducerPath]: rickAndMortyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rickAndMortyApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;