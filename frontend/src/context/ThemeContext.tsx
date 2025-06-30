import React, { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { toggleDarkMode } from '../store/slices/userPreferencesSlice';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isDarkMode = useSelector((state: RootState) => state.userPreferences.darkMode);
  const dispatch = useDispatch();

  // Sync dark mode with HTML and localStorage
  useEffect(() => {
    const root = document.documentElement;
    const className = 'dark';

    if (isDarkMode) {
      root.classList.add(className);
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove(className);
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
