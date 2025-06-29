import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferencesState {
  categories: string[];
  darkMode: boolean;
  language: string;
  favorites: string[];
  contentOrder: string[];
}

const initialState: UserPreferencesState = {
  categories: ['technology', 'business', 'entertainment'],
  darkMode: false,
  language: 'en',
  favorites: [],
  contentOrder: [],
};

// Load from localStorage
const loadFromLocalStorage = (): UserPreferencesState => {
  try {
    const saved = localStorage.getItem('userPreferences');
    if (saved) {
      return { ...initialState, ...JSON.parse(saved) };
    }
  } catch (error) {
    console.error('Error loading preferences from localStorage:', error);
  }
  return initialState;
};

const userPreferencesSlice = createSlice({
  name: 'userPreferences',
  initialState: loadFromLocalStorage(),
  reducers: {
    updateCategories: (state, action: PayloadAction<string[]>) => {
      state.categories = action.payload;
      localStorage.setItem('userPreferences', JSON.stringify(state));
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem('userPreferences', JSON.stringify(state));
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
      localStorage.setItem('userPreferences', JSON.stringify(state));
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const itemId = action.payload;
      const index = state.favorites.indexOf(itemId);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(itemId);
      }
      localStorage.setItem('userPreferences', JSON.stringify(state));
    },
    updateContentOrder: (state, action: PayloadAction<string[]>) => {
      state.contentOrder = action.payload;
      localStorage.setItem('userPreferences', JSON.stringify(state));
    },
  },
});

export const {
  updateCategories,
  toggleDarkMode,
  setLanguage,
  toggleFavorite,
  updateContentOrder,
} = userPreferencesSlice.actions;

export default userPreferencesSlice.reducer;