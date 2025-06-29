import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContentState {
  activeSection: 'feed' | 'trending' | 'favorites';
  loading: boolean;
  error: string | null;
}

const initialState: ContentState = {
  activeSection: 'feed',
  loading: false,
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setActiveSection: (state, action: PayloadAction<'feed' | 'trending' | 'favorites'>) => {
      state.activeSection = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setActiveSection, setLoading, setError } = contentSlice.actions;
export default contentSlice.reducer;