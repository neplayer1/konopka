import React, {Dispatch, SetStateAction} from 'react';
import {UserFile} from "types/common";

type TProps = {
  singleFile: UserFile | string;
  setSingleFile: Dispatch<SetStateAction<string | UserFile>>
}

export const UploadSingleFileContext = React.createContext<null | TProps>(null);
