import React, {FC, useState} from 'react';
import {AuthContext} from "context/ctxAuth";
import {useCookies} from "react-cookie";

export const AuthProvider: FC = ({children}) => {
  const [cookies] = useCookies(['access-token']);
  const [autorized, setAutorized] = useState(!!cookies['access-token']);

  return (
    <AuthContext.Provider value={{autorized, setAutorized}}>
      {children}
    </AuthContext.Provider>
  );
};