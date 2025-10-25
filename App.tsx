import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from 'styled-components/native';
import { store } from '@/store/store';
import { theme } from '@/theme/theme';
import AppNavigator from '@/navigation/AppNavigator';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <AppNavigator />
      </ThemeProvider>
    </ReduxProvider>
  );
}