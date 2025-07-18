import { createContext, useContext, useState } from "react";

const NavContext = createContext();

export const useNavContext = () => useContext(NavContext);


export const NavProvider = ({ children }) => {
  const [hideNavbar, setHideNavbar] = useState(false);

  return (
    <NavContext.Provider value={{ hideNavbar, setHideNavbar }}>
      {children}
    </NavContext.Provider>
  );
};
