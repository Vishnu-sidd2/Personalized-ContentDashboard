import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, WifiOff, RefreshCw, Clock } from 'lucide-react';
import { useRealtime } from '../../context/RealtimeContext';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

const RealtimeIndicator: React.FC = () => {
  const { t } = useTranslation();
  const { state, refreshContent, markContentAsRead } = useRealtime();

  const getStatusIcon = () => {
    switch (state.connectionStatus) {
      case 'connected':
        return <Wifi className="w-4 h-4 text-green-500" />;
      case 'connecting':
        return <RefreshCw className="w-4 h-4 text-yellow-500 animate-spin" />;
      case 'disconnected':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = () => {
    switch (state.connectionStatus) {
      case 'connected':
        return t('realtime.connected');
      case 'connecting':
        return t('realtime.connecting');
      case 'disconnected':
        return t('realtime.disconnected');
      default:
        return t('realtime.disconnected');
    }
  };

  const getStatusColor = () => {
    switch (state.connectionStatus) {
      case 'connected':
        return 'text-green-600 dark:text-green-400';
      case 'connecting':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'disconnected':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Connection Status */}
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <span className={`text-xs font-medium ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      {/* New Content Indicator */}
      {state.newContentCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            refreshContent();
            markContentAsRead();
          }}
          className="flex items-center space-x-2 px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full text-xs font-medium transition-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>{state.newContentCount} {t('realtime.newContent')}</span>
        </motion.button>
      )}

      {/* Last Update Time */}
      {state.lastUpdate && (
        <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="w-3 h-3" />
          <span>
            {t('realtime.lastUpdated', { 
              time: format(state.lastUpdate, 'HH:mm:ss') 
            })}
          </span>
        </div>
      )}
    </div>
  );
};

export default RealtimeIndicator;