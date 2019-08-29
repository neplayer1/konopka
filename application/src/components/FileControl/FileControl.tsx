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
        <div className="dropzone_preview_item__inner">
          {onDelete && <div className="dropzone_preview_item__delete-btn" onClick={(e) => onDelete(e)}/>}
          <img src={file.preview} alt={''}/>
        </div>
      </div>
    ));
  }, [files, onDelete]);

  const urlPreviews = useMemo(() => {
    return urls && urls.map(url => (
      <div className="dropzone_preview__item" key={url}>
        <div className="dropzone_preview_item__inner">
          {onDelete && <div className="dropzone_preview_item__delete-btn" onClick={(e) => onDelete(e)}/>}
          <img src={`http://localhost:3005/api/${url}`} data-url={url} alt={''}/>
        </div>
      </div>
    ));
  }, [urls, onDelete]);

  return (
    <div className="form-control form-control__dropzone">
      <InputFiles onChange={onChange} multiple={multiple}>
        <div className="form-control form-control__button">{label}</div>
      </InputFiles>
      <div className="dropzone__preview">
        {previews.length !== 0 && !multiple ? '' : urlPreviews}
        {previews}
      </div>
    </div>
  );
}
