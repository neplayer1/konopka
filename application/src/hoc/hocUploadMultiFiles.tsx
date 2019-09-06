import React, {FC, useState} from 'react';
import {UploadMultiFilesContext} from 'context/ctxUploadMultiFiles';
import {UserFile} from "types/common";

export const UploadMultiFilesProvider: FC = ({children}) => {
  const [multiFiles, setMultiFiles] = useState<(UserFile | string)[]>([]);
  const [removedImagesUrls, setRemovedImagesUrls] = useState<string[]>([]);

  return (
    <UploadMultiFilesContext.Provider value={{multiFiles, setMultiFiles, removedImagesUrls, setRemovedImagesUrls}}>
      {children}
    </UploadMultiFilesContext.Provider>
  );
};