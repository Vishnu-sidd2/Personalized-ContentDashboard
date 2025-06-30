import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToastContainer } from 'react-toastify';
import { store } from './store/store';
import Dashboard from './components/Dashboard';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { RealtimeProvider } from './context/RealtimeContext';
import './i18n/i18n';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Beams from './components/Beams';
import { ErrorBoundary } from './components/ErrorBoundary'

const App: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider>
          <RealtimeProvider>
            <DndProvider backend={HTML5Backend}>
              <div className="App">
                {/* 3D Canvas Background */}
                

                <Dashboard />

                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="colored"
                />
              </div>
            </DndProvider>
          </RealtimeProvider>
        </ThemeProvider>
      </AuthProvider>
    </Provider>
  );
};

export default App;
