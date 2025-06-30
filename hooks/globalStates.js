import React, { createContext, useContext, useState } from 'react';

// Define initial structure
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [theme, setTheme] = useState('light');
  const [tokenUsage, setTokenUsage] = useState(0);
  const [language, setLanguage] = useState('en');

  const contextValue = {
    menuVisible, setMenuVisible,
    theme, setTheme,
    tokenUsage, setTokenUsage,
    language, setLanguage,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Optional custom hook
export const useGlobalStates = () => useContext(AppContext);
