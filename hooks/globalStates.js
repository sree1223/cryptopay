import React, { createContext, useContext, useState } from 'react';
import { Dimensions } from 'react-native';
// Define initial structure
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [theme, setTheme] = useState('light');
  const [tokenUsage, setTokenUsage] = useState(0);
  const [language, setLanguage] = useState('en');
  const [signingRequest, setSigningRequest] = useState(null);
  
  const showSigningRequest = (txData) => {
    setSigningRequest(txData);
  };

  const clearSigningRequest = () => {
    setSigningRequest(null);
  };
  
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const SCREEN_HEIGHT = Dimensions.get('window').height;

  const contextValue = {
    menuVisible, setMenuVisible,
    theme, setTheme,
    tokenUsage, setTokenUsage,
    language, setLanguage,
    SCREEN_WIDTH, SCREEN_HEIGHT,
    signingRequest,
    showSigningRequest,
    clearSigningRequest,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Optional custom hook
export const useGlobalStates = () => useContext(AppContext);
