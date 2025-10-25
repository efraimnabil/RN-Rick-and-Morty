const palette = {
  blue_500: '#007AFF',
  blue_100: '#E5F2FF',
  red_500: '#FF3B30',
  neutral_900: '#121212',
  neutral_500: '#8E8E93',
  neutral_300: '#C7C7CC',
  neutral_100: '#F2F2F7',
  neutral_0: '#FFFFFF',
};

export const theme = {
  colors: {
    primary: palette.blue_500,
    favorite: palette.red_500,
    background: palette.neutral_100,
    surface: palette.neutral_0,
    text_primary: palette.neutral_900,
    text_secondary: palette.neutral_500,
    border: palette.neutral_300,
    card_header: palette.blue_100,
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  fontSizes: {
    body: 16,
    title: 20,
    detail_header: 28,
  },
  fontWeights: {
    regular: '400',
    bold: '700',
  },
  radii: {
    md: 8,
  },
  shadows: {
    standard: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
  },
};