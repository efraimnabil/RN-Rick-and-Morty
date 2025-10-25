import favoritesReducer, { toggleFavorite } from './favoritesSlice';

describe('favoritesSlice', () => {
  it('should return the initial state', () => {
    const state = favoritesReducer(undefined, { type: 'unknown' });
    expect(state).toEqual({ favoriteIds: [] });
  });

  it('should add a favorite id when toggling a new favorite', () => {
    const initialState = { favoriteIds: [] };
    const state = favoritesReducer(initialState, toggleFavorite(1));
    expect(state.favoriteIds).toEqual([1]);
  });

  it('should remove a favorite id when toggling an existing favorite', () => {
    const initialState = { favoriteIds: [1, 2, 3] };
    const state = favoritesReducer(initialState, toggleFavorite(2));
    expect(state.favoriteIds).toEqual([1, 3]);
  });

  it('should add multiple favorites', () => {
    let state = { favoriteIds: [] as number[] };
    state = favoritesReducer(state, toggleFavorite(1));
    state = favoritesReducer(state, toggleFavorite(2));
    state = favoritesReducer(state, toggleFavorite(3));
    expect(state.favoriteIds).toEqual([1, 2, 3]);
  });

  it('should toggle favorite on and off', () => {
    let state = { favoriteIds: [] as number[] };
    // Add favorite
    state = favoritesReducer(state, toggleFavorite(1));
    expect(state.favoriteIds).toEqual([1]);
    // Remove favorite
    state = favoritesReducer(state, toggleFavorite(1));
    expect(state.favoriteIds).toEqual([]);
  });
});
