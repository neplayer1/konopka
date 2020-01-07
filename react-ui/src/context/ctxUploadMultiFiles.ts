import React, {Dispatch, SetStateAction} from 'react';
import {UserFile} from "types/common";

type TProps = {
  multiFiles: (UserFile | string)[];
  removedImagesUrls: string[];
  setMultiFiles: Dispatch<SetStateAction<(string | UserFile)[]>>
  setRemovedImagesUrls: Dispatch<SetStateAction<string[]>>
}

export const UploadMultiFilesContext = React.createContext<null | TProps>(null);
