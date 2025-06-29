import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { 
  X, 
  Save, 
  Moon, 
  Sun, 
  Globe, 
  Tag,
  Plus,
  Trash2,
  User,
  Bell,
  Shield,
  Palette
} from 'lucide-react';
import { RootState } from '../store/store';
import { updateCategories, toggleDarkMode, setLanguage } from '../store/slices/userPreferencesSlice';
import { useTheme } from '../context/ThemeContext';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { categories, darkMode, language } = useSelector((state: RootState) => state.userPreferences);
  const { toggleTheme } = useTheme();
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(categories);
  const [newCategory, setNewCategory] = useState('');
  const [activeTab, setActiveTab] = useState<'preferences' | 'account' | 'notifications'>('preferences');

  const availableCategories = [
    'technology', 'business', 'entertainment', 'sports', 'health',
    'science', 'politics', 'travel', 'food', 'fashion', 'gaming',
    'music', 'art', 'education', 'finance'
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' }
  ];

  const handleSavePreferences = () => {
    dispatch(updateCategories(selectedCategories));
    onClose();
  };

  const handleToggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleAddCustomCategory = () => {
    if (newCategory.trim() && !selectedCategories.includes(newCategory.trim().toLowerCase())) {
      setSelectedCategories(prev => [...prev, newCategory.trim().toLowerCase()]);
      setNewCategory('');
    }
  };

  const handleLanguageChange = (langCode: string) => {
    dispatch(setLanguage(langCode));
  };

  const tabs = [
    { id: 'preferences' as const, label: 'Preferences', icon: Tag },
    { id: 'account' as const, label: 'Account', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell }
  ];

  const renderPreferencesTab = () => (
    <div className="space-y-8">
      {/* Theme Settings */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Palette className="w-5 h-5 mr-2" />
          Appearance
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center">
              {darkMode ? <Moon className="w-5 h-5 mr-3 text-blue-500" /> : <Sun className="w-5 h-5 mr-3 text-yellow-500" />}
              <div>
                <div className="font-medium text-gray-900 dark:text-white">Dark Mode</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {darkMode ? 'Dark theme enabled' : 'Light theme enabled'}
                </div>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Language Settings */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Globe className="w-5 h-5 mr-2" />
          Language
        </h3>
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="w-full p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
          <Tag className="w-5 h-5 mr-2" />
          Content Categories
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Select categories you're interested in to personalize your feed
        </p>
        
        {/* Selected Categories */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Selected ({selectedCategories.length})
          </div>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((category) => (
              <span
                key={category}
                className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {category}
                <button
                  onClick={() => handleToggleCategory(category)}
                  className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Available Categories */}
        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Available Categories
          </div>
          <div className="flex flex-wrap gap-2">
            {availableCategories
              .filter(cat => !selectedCategories.includes(cat))
              .map((category) => (
                <button
                  key={category}
                  onClick={() => handleToggleCategory(category)}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors capitalize"
                >
                  + {category}
                </button>
              ))}
          </div>
        </div>

        {/* Add Custom Category */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add custom category..."
            className="flex-1 p-2 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white text-sm"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddCustomCategory();
              }
            }}
          />
          <button
            onClick={handleAddCustomCategory}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderAccountTab = () => (
    <div className="space-y-6">
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Demo User</h3>
        <p className="text-gray-600 dark:text-gray-400">demo@example.com</p>
      </div>
      
      <div className="space-y-4">
        <button className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
          <div className="font-medium text-gray-900 dark:text-white">Edit Profile</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Update your personal information</div>
        </button>
        
        <button className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
          <div className="font-medium text-gray-900 dark:text-white">Privacy Settings</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Manage your privacy preferences</div>
        </button>
        
        <button className="w-full p-3 text-left bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
          <div className="font-medium text-gray-900 dark:text-white">Data Export</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Download your data</div>
        </button>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <div className="font-medium text-gray-900 dark:text-white">Push Notifications</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Get notified about new content</div>
          </div>
          <input type="checkbox" className="rounded" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <div className="font-medium text-gray-900 dark:text-white">Email Digest</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Weekly summary of your interests</div>
          </div>
          <input type="checkbox" className="rounded" />
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <div className="font-medium text-gray-900 dark:text-white">Trending Alerts</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Notify when content is trending</div>
          </div>
          <input type="checkbox" className="rounded" defaultChecked />
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Settings
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex mt-4 space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-1" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'preferences' && renderPreferencesTab()}
              {activeTab === 'account' && renderAccountTab()}
              {activeTab === 'notifications' && renderNotificationsTab()}
            </div>

            {/* Footer */}
            {activeTab === 'preferences' && (
              <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6">
                <div className="flex gap-3">
                  <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center justify-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Save
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;