// src/components/PropertyOverview/NavProvider.jsx
import { useState } from "react";
import { NavContext } from "./NavContext"; // adjust the path if your folders differ

export const NavProvider = ({ children }) => {
  const [hideNavbar, setHideNavbar] = useState(false);

  return (
    <NavContext.Provider value={{ hideNavbar, setHideNavbar }}>
      {children}
    </NavContext.Provider>
  );
};
