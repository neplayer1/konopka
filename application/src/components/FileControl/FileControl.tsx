import React, {FC, useCallback, useMemo} from 'react';
import InputFiles from "react-input-files";

interface UserFile extends File {
  preview: string;
}

type TProps = {
  onChange: (files: FileList) => void;
  onDelete?: (e: any) => void;
  onDragStart?: (e: any) => void;
  onDrop?: (e: any) => void;
  label: string;
  files: (UserFile | string)[];
  multiple?: boolean;
  previewUrl?: string;
}

export const FileControl: FC<TProps> = ({files, previewUrl, onChange, onDelete, onDragStart = () => {}, onDrop = () => {}, label, multiple}) => {
  const handleDragOver = useCallback((e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    return false;
  }, []);

  const handleDragEnter = useCallback((e) => {
    const el = e.target.closest(".dropzone_preview__item");
    el.classList.add('dropzone_preview__item--over');
  }, []);

  const handleDragLeave = useCallback((e) => {
    const el = e.target.closest(".dropzone_preview__item");
    el.classList.remove('dropzone_preview__item--over');
  }, []);

  const handleDragEnd = useCallback((e) => {
    const dragImage = document.querySelector('.drag-image');
    dragImage && dragImage.remove();
    const cols = document.querySelectorAll('.dropzone_preview__item');
    [].forEach.call(cols, function (col: Element) {
      col.classList.remove('dropzone_preview__item--over');
      col.classList.remove('dropzone_preview__item--dragged');
    });
  }, []);

  const previews = useMemo(() => {
    return files.map(file => {
      const isUrl = typeof file === "string";
      if (isUrl) {
        const url = file as string;
        if (multiple) {
          return (
            <div className="dropzone_preview__item" key={url} draggable={true}
                 onDragStart={(e) => onDragStart(e)}
                 onDragOver={(e) => handleDragOver(e)}
                 onDragEnter={(e) => handleDragEnter(e)}
                 onDragLeave={(e) => handleDragLeave(e)}
                 onDrop={(e) => onDrop(e)}
                 onDragEnd={(e) => handleDragEnd(e)}
            >
              <div className="dropzone_preview_item__inner">
                {onDelete && <div className="dropzone_preview_item__delete-btn" onClick={(e) => onDelete(e)}/>}
                <img src={`http://localhost:3005/api/${url}`} data-url={url} alt={''}/>
              </div>
            </div>
          );
        } else {
          return (
            <div className="dropzone_preview__item" key={url}>
              <div className="dropzone_preview_item__inner">
                {onDelete && <div className="dropzone_preview_item__delete-btn" onClick={(e) => onDelete(e)}/>}
                <img src={`http://localhost:3005/api/${url}`} alt={''}/>
              </div>
            </div>
          );
        }
      } else {
        file = file as UserFile;
        const fileIndex = files.indexOf(file);
        if (multiple) {
          return (
            <div className="dropzone_preview__item" key={file.name} draggable={true}
                 onDragStart={(e) => onDragStart(e)}
                 onDragOver={(e) => handleDragOver(e)}
                 onDragEnter={(e) => handleDragEnter(e)}
                 onDragLeave={(e) => handleDragLeave(e)}
                 onDrop={(e) => onDrop(e)}
                 onDragEnd={(e) => handleDragEnd(e)}
            >
              <div className="dropzone_preview_item__inner">
                {onDelete && <div className="dropzone_preview_item__delete-btn" onClick={(e) => onDelete(e)}/>}
                <img src={file.preview} data-index={fileIndex} alt={''}/>
              </div>
            </div>
          )
        } else {
          return (
            <div className="dropzone_preview__item" key={file.name}>
              <div className="dropzone_preview_item__inner">
                <img src={file.preview} alt={''}/>
              </div>
            </div>
          )
        }
      }
    });
  }, [files, handleDragEnd, handleDragEnter, handleDragLeave, handleDragOver, multiple, onDelete, onDragStart, onDrop]);

  const urlPreview = useMemo(() => {
    return (
      <div className="dropzone_preview__item" key={previewUrl}>
        <div className="dropzone_preview_item__inner">
          {onDelete && <div className="dropzone_preview_item__delete-btn" onClick={(e) => onDelete(e)}/>}
          <img src={`http://localhost:3005/api/${previewUrl}`} alt={''}/>
        </div>
      </div>
    )
  }, [onDelete, previewUrl]);

  return (
    <div className="form-control form-control__dropzone">
      <InputFiles onChange={onChange} multiple={multiple}>
        <div className="form-control form-control__button">{label}</div>
      </InputFiles>
      <div className="dropzone__preview">
        {urlPreview && !multiple && previews.length === 0 ? urlPreview : ''}
        {previews}
      </div>
    </div>
  );
}
