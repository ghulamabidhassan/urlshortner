import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [dark, setDark] = useState(false);

  const darkMode = () => {
    setDark(!dark);
  };

  return (
    <AppContext.Provider value={{ dark, setDark, darkMode }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
