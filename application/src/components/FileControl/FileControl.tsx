import React, {FC, useMemo} from 'react';
import InputFiles from "react-input-files";

interface UserFile extends File {
  preview: string;
}

type TProps = {
  onChange: (files: FileList) => void;
  onDelete?: any;
  label: string;
  files: UserFile[];
  multiple?: boolean;
  urls?: string[];
}

export const FileControl: FC<TProps> = ({files, urls, onChange, onDelete, label, multiple}) => {
  const previews = useMemo(() => {
    return files.map(file => (
      <div className="dropzone_preview__item" key={file.name}>
        <img src={file.preview} alt={''}/>
      </div>
    ));
  }, [files]);

  const urlPreviews = useMemo(() => {
    return urls && urls.map(url => (
      <div className="dropzone_preview__item" key={url} onClick={(e) => onDelete(e)}>
        <img src={`http://localhost:3005/api/${url}`} data-url={url} alt={''}/>
      </div>
    ));
  }, [urls, onDelete]);

  return (
    <div className="form-control form-control__dropzone">
      <InputFiles onChange={onChange} multiple={multiple}>
        <div className="form-control form-control__button">{label}</div>
      </InputFiles>
      <div className="dropzone__preview">
        {previews}
        {urlPreviews}
      </div>
    </div>
  );
}
