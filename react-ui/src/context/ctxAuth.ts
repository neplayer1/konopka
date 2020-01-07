import React, {Dispatch, SetStateAction} from 'react';

type TProps = {
  autorized: boolean;
  setAutorized: Dispatch<SetStateAction<boolean>>;
}

export const AuthContext = React.createContext<null | TProps>(null);
