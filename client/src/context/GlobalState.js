import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [clothImage, setClothImage] = useState(null);

  return (
    <GlobalContext.Provider value={{ clothImage, setClothImage }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
