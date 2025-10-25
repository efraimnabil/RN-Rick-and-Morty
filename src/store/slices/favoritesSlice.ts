import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favoriteIds: number[];
}

const initialState: FavoritesState = {
  favoriteIds: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<number>) {
      const id = action.payload;
      const existingIndex = state.favoriteIds.findIndex(favId => favId === id);
      if (existingIndex >= 0) {
        state.favoriteIds.splice(existingIndex, 1);
      } else {
        state.favoriteIds.push(id);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;