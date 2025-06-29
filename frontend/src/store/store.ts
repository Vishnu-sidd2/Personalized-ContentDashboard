import { configureStore } from '@reduxjs/toolkit';
import { contentApi } from './api/contentApi';
import userPreferencesReducer from './slices/userPreferencesSlice';
import contentReducer from './slices/contentSlice';
import searchReducer from './slices/searchSlice';

export const store = configureStore({
  reducer: {
    userPreferences: userPreferencesReducer,
    content: contentReducer,
    search: searchReducer,
    [contentApi.reducerPath]: contentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;