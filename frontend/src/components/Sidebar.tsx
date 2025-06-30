import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  TrendingUp, 
  Heart, 
  Settings, 
  Search,
  User
} from 'lucide-react';

export interface SidebarProps {
  activeSection: 'feed' | 'trending' | 'favorites';
  onSectionChange: (section: 'feed' | 'trending' | 'favorites') => void;
  onSettingsClick: () => void;
  onAuthClick: (mode?: 'login' | 'signup') => void;
  onProfileClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  onSettingsClick 
}) => {
  const menuItems = [
    { id: 'feed' as const, icon: Home, label: 'Feed', description: 'Personalized content' },
    { id: 'trending' as const, icon: TrendingUp, label: 'Trending', description: 'Popular now' },
    { id: 'favorites' as const, icon: Heart, label: 'Favorites', description: 'Saved content' },
  ];

  return (
    <motion.div 
      className="w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Content Hub
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Your personalized dashboard
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {item.description}
                </div>
              </div>
            </motion.button>
          );
        })}
      </nav>

      {/* User Profile & Settings */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
        <motion.button
          onClick={onSettingsClick}
          className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Settings className="w-5 h-5 mr-3" />
          <div>
            <div className="font-medium">Settings</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Preferences & more
            </div>
          </div>
        </motion.button>
        
        <div className="flex items-center px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
            <User className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="font-medium text-gray-800 dark:text-white text-sm">Demo User</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              demo@example.com
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;