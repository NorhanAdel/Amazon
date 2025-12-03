import React, { createContext, useState } from "react";

export const LoginContext = createContext();

function ContextProvider({ children }) {
  const [account, setAccount] = useState(null);

  return (
    <LoginContext.Provider value={{ account, setAccount }}>
      {children}
    </LoginContext.Provider>
  );
}

export default ContextProvider;
