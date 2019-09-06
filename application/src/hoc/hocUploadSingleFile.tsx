import React, {FC, useState} from 'react';
import {UserFile} from "types/common";
import {UploadSingleFileContext} from 'context/ctxUploadSingleFile';

export const UploadSingleFileProvider: FC = ({children}) => {
  const [singleFile, setSingleFile] = useState<UserFile | string>('');

  return (
    <UploadSingleFileContext.Provider value={{singleFile, setSingleFile}}>
      {children}
    </UploadSingleFileContext.Provider>
  );
};