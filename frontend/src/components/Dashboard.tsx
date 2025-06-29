import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { setActiveSection } from '../store/slices/contentSlice';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';
import ContentFeed from './ContentFeed';
import TrendingSection from './TrendingSection';
import FavoritesSection from './FavoritesSection';
import SettingsPanel from './SettingsPanel';
import AuthModal from './auth/AuthModal';
import ProfileModal from './auth/ProfileModal';

const Dashboard: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const { activeSection } = useSelector((state: RootState) => state.content);
  const { darkMode } = useSelector((state: RootState) => state.userPreferences);
  const { state: authState } = useAuth();
  const dispatch = useDispatch();

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'feed':
        return <ContentFeed />;
      case 'trending':
        return <TrendingSection />;
      case 'favorites':
        return <FavoritesSection />;
      default:
        return <ContentFeed />;
    }
  };

  const handleAuthRequired = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="flex">
          {/* Sidebar */}
          <Sidebar 
            activeSection={activeSection}
            onSectionChange={(section) => dispatch(setActiveSection(section))}
            onSettingsClick={() => setIsSettingsOpen(true)}
            onAuthClick={handleAuthRequired}
            onProfileClick={() => setIsProfileModalOpen(true)}
          />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <Header 
              onSettingsClick={() => setIsSettingsOpen(true)}
              onAuthClick={handleAuthRequired}
              onProfileClick={() => setIsProfileModalOpen(true)}
            />
            
            {/* Content Area */}
            <main className="flex-1 p-6">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderActiveSection()}
              </motion.div>
            </main>
          </div>
        </div>
        
        {/* Modals */}
        <SettingsPanel 
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
        />
        
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authMode}
        />
        
        <ProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setIsProfileModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default Dashboard;