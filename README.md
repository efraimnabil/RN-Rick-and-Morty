# React Native Character Browser

A React Native application that displays characters from the Rick and Morty API with pagination, favorites, and detailed views.

## 🚀 API Used

**Rick and Morty API** - https://rickandmortyapi.com/api/
- Free public API with no authentication required
- Provides paginated character data with images and details

## 📦 Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the app:**
   ```bash
   npm start
   ```

3. **Launch on device/simulator:**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your phone

## 🧪 Run Tests

```bash
npm test
```

## 🏗️ Architecture Decisions

### State Management
- **Redux Toolkit** for global state (favorites)
- **RTK Query** for API data fetching and caching
- Eliminates need for manual loading states and cache management

### Folder Structure
```
src/
├── components/     # Reusable UI components
├── screens/        # Screen components
├── store/          # Redux store and slices
├── services/       # API service layer (RTK Query)
├── navigation/     # Navigation configuration
├── types/          # TypeScript type definitions
└── theme/          # Styled components theme
```

### Key Features
- **Infinite scroll pagination** - Loads more data as user scrolls
- **Quick view expansion** - Animated card expansion with Reanimated
- **Favorites system** - Persistent across tabs with Redux
- **Tab navigation** - Characters list and Favorites

### Animation Library
- **React Native Reanimated** for smooth, performant animations
- Used for card expansion and favorite button effects

## 🧪 Testing Approach

### Component Tests (`CharacterCard.test.tsx`)
- Tests rendering of character information
- Validates user interactions (press events)
- Uses React Native Testing Library

### Function/Reducer Tests (`favoritesSlice.test.ts`)
- Tests state management logic
- Validates add/remove favorite operations
- Ensures toggle behavior works correctly

**Test Coverage:** 2 test suites, 9 passing tests

## 💡 Notable Implementation Details

- **Duplicate Prevention:** RTK Query merge function filters duplicates
- **TypeScript:** Full type safety across components and state
- **Styled Components:** Themed, maintainable styling system
- **Clean Separation:** UI, logic, and data layers are independent
