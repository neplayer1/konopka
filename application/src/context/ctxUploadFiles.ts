import React, {Dispatch, SetStateAction} from 'react';
import {UserFile} from "types/common";

type TProps = {
  updatedFiles: (UserFile | string)[];
  removedImagesUrls: string[];
  setUpdatedFiles: Dispatch<SetStateAction<(string | UserFile)[]>>
  setRemovedImagesUrls: Dispatch<SetStateAction<string[]>>
}

export const UploadFilesContext = React.createContext<null | TProps>(null);
