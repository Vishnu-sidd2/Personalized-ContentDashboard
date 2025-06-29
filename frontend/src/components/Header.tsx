import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Search, 
  Settings, 
  Moon, 
  Sun, 
  Bell,
  Filter,
  X
} from 'lucide-react';
import { RootState } from '../store/store';
import { setSearchTerm, addToSearchHistory, setIsSearching } from '../store/slices/searchSlice';
import { useDebounce } from '../hooks/useDebounce';
import { useTheme } from '../context/ThemeContext';

interface HeaderProps {
  onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  
  const { searchTerm, searchHistory } = useSelector((state: RootState) => state.search);
  const { categories } = useSelector((state: RootState) => state.userPreferences);
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

  React.useEffect(() => {
    dispatch(setSearchTerm(debouncedSearchTerm));
    if (debouncedSearchTerm) {
      dispatch(setIsSearching(true));
    } else {
      dispatch(setIsSearching(false));
    }
  }, [debouncedSearchTerm, dispatch]);

  const handleSearchSubmit = useCallback((term: string) => {
    if (term.trim()) {
      dispatch(addToSearchHistory(term.trim()));
      setShowSearchHistory(false);
    }
  }, [dispatch]);

  const handleSearchHistoryClick = (term: string) => {
    setLocalSearchTerm(term);
    dispatch(setSearchTerm(term));
    setShowSearchHistory(false);
  };

  const clearSearch = () => {
    setLocalSearchTerm('');
    dispatch(setSearchTerm(''));
    dispatch(setIsSearching(false));
  };

  return (
    <motion.header 
      className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        {/* Search Section */}
        <div className="flex-1 max-w-2xl mr-6 relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={localSearchTerm}
              onChange={(e) => setLocalSearchTerm(e.target.value)}
              onFocus={() => setShowSearchHistory(searchHistory.length > 0)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit(localSearchTerm);
                }
              }}
              placeholder="Search across news, movies, and social posts..."
              className="w-full pl-10 pr-12 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
            {localSearchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Search History Dropdown */}
          {showSearchHistory && searchHistory.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50"
            >
              <div className="p-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 px-3 py-2 font-medium">
                  Recent Searches
                </div>
                {searchHistory.slice(0, 5).map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleSearchHistoryClick(term)}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  >
                    <Search className="inline w-4 h-4 mr-2 text-gray-400" />
                    {term}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          {/* Active Categories */}
          <div className="hidden md:flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            <div className="flex flex-wrap gap-1">
              {categories.slice(0, 3).map((category) => (
                <span
                  key={category}
                  className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full capitalize"
                >
                  {category}
                </span>
              ))}
              {categories.length > 3 && (
                <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                  +{categories.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </motion.button>

          {/* Settings */}
          <motion.button
            onClick={onSettingsClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Settings className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;