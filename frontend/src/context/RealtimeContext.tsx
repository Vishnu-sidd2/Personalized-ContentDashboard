import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { contentApi } from '../store/api/contentApi';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface RealtimeState {
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected';
  lastUpdate: Date | null;
  newContentCount: number;
}

interface RealtimeContextType {
  state: RealtimeState;
  refreshContent: () => void;
  markContentAsRead: () => void;
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined);

export const useRealtime = () => {
  const context = useContext(RealtimeContext);
  if (!context) {
    throw new Error('useRealtime must be used within a RealtimeProvider');
  }
  return context;
};

export const RealtimeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const socketRef = useRef<Socket | null>(null);
  const [state, setState] = useState<RealtimeState>({
    isConnected: false,
    connectionStatus: 'disconnected',
    lastUpdate: null,
    newContentCount: 0,
  });

  useEffect(() => {
    let updateInterval: NodeJS.Timeout;

    const simulateRealtimeUpdates = () => {
      setState(prev => ({
        ...prev,
        isConnected: true,
        connectionStatus: 'connected',
        lastUpdate: new Date(),
      }));

      updateInterval = setInterval(() => {
        const shouldUpdate = Math.random() > 0.7;

        if (shouldUpdate) {
          setState(prev => ({
            ...prev,
            newContentCount: prev.newContentCount + Math.floor(Math.random() * 3) + 1,
            lastUpdate: new Date(),
          }));

          toast.info(t('realtime.newContent'), {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
        }
      }, 30000);
    };

    setState(prev => ({ ...prev, connectionStatus: 'connecting' }));
    simulateRealtimeUpdates();

    return () => {
      clearInterval(updateInterval);
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [t]);

  const refreshContent = () => {
    dispatch(contentApi.util.invalidateTags(['Content']));
    setState(prev => ({
      ...prev,
      newContentCount: 0,
      lastUpdate: new Date(),
    }));
    toast.success(t('content.refresh'));
  };

  const markContentAsRead = () => {
    setState(prev => ({
      ...prev,
      newContentCount: 0,
    }));
  };

  const value: RealtimeContextType = {
    state,
    refreshContent,
    markContentAsRead,
  };

  return (
    <RealtimeContext.Provider value={value}>
      {children}
    </RealtimeContext.Provider>
  );
};
