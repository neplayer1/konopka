import React, {FC, useEffect, useState} from 'react';
import {AuthContext} from "context/ctxAuth";
import {useQuery} from "@apollo/react-hooks";
import {CHECK_TOKEN} from "queries/admin";

export const AuthProvider: FC = ({children}) => {
  const {data} = useQuery(CHECK_TOKEN);
  const [autorized, setAutorized] = useState(false);

  useEffect(() => {
    setAutorized(data && data.checkToken);
  }, [data]);

  return (
    <AuthContext.Provider value={{autorized, setAutorized}}>
      {children}
    </AuthContext.Provider>
  );
};