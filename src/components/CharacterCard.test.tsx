import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { ThemeProvider } from 'styled-components/native';
import { CharacterCard } from './CharacterCard';
import favoritesReducer from '@/store/slices/favoritesSlice';
import { theme } from '@/theme/theme';

// Mock character data
const mockCharacter = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive',
  species: 'Human',
  type: '',
  gender: 'Male',
  origin: { name: 'Earth', url: '' },
  location: { name: 'Earth', url: '' },
  image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
  episode: 'https://rickandmortyapi.com/api/episode/1',
  url: '',
  created: '',
};

// Helper function to create a test store
const createTestStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
  });
};

describe('CharacterCard', () => {
  it('renders character name correctly', () => {
    const store = createTestStore();
    const onPressMock = jest.fn();

    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CharacterCard character={mockCharacter} onPress={onPressMock} />
        </ThemeProvider>
      </Provider>
    );

    expect(getByText('Rick Sanchez')).toBeTruthy();
  });

  it('displays character status', () => {
    const store = createTestStore();
    const onPressMock = jest.fn();

    const { getAllByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CharacterCard character={mockCharacter} onPress={onPressMock} />
        </ThemeProvider>
      </Provider>
    );

    expect(getAllByText('Alive').length).toBeGreaterThan(0);
  });

  it('displays character species', () => {
    const store = createTestStore();
    const onPressMock = jest.fn();

    const { getAllByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CharacterCard character={mockCharacter} onPress={onPressMock} />
        </ThemeProvider>
      </Provider>
    );

    expect(getAllByText('Human').length).toBeGreaterThan(0);
  });

  it('calls onPress when card is pressed', () => {
    const store = createTestStore();
    const onPressMock = jest.fn();

    const { getByText } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CharacterCard character={mockCharacter} onPress={onPressMock} />
        </ThemeProvider>
      </Provider>
    );

    fireEvent.press(getByText('Rick Sanchez'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
