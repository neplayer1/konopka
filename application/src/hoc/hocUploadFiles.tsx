import React, {FC, useState} from 'react';
import {UploadFilesContext} from 'context/ctxUploadFiles';
import {UserFile} from "types/common";

export const UploadImagesProvider: FC = ({children}) => {
  const [updatedFiles, setUpdatedFiles] = useState<(UserFile | string)[]>([]);
  const [removedImagesUrls, setRemovedImagesUrls] = useState<string[]>([]);

  return (
    <UploadFilesContext.Provider value={{updatedFiles, setUpdatedFiles, removedImagesUrls, setRemovedImagesUrls}}>
      {children}
    </UploadFilesContext.Provider>
  );
};