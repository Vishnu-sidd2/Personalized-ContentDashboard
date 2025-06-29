import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchTerm: string;
  isSearching: boolean;
  searchHistory: string[];
}

const initialState: SearchState = {
  searchTerm: '',
  isSearching: false,
  searchHistory: [],
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setIsSearching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      const term = action.payload.trim();
      if (term && !state.searchHistory.includes(term)) {
        state.searchHistory.unshift(term);
        if (state.searchHistory.length > 10) {
          state.searchHistory.pop();
        }
      }
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
  },
});

export const {
  setSearchTerm,
  setIsSearching,
  addToSearchHistory,
  clearSearchHistory,
} = searchSlice.actions;

export default searchSlice.reducer;