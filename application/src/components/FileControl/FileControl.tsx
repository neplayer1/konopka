import React, {FC, useCallback, useEffect, useMemo} from 'react';
import InputFiles from "react-input-files";
import {useContextStrict} from "hooks/useContextStrict";
import {UploadFilesContext} from "context/ctxUploadFiles";

interface UserFile extends File {
  preview: string;
}

type TProps = {
  onChange: (files: FileList) => void;
  label: string;
  files: (UserFile | string)[];
  multiple?: boolean;
  previewUrl?: string;
}

export const FileControl: FC<TProps> = ({files, previewUrl, onChange, label, multiple}) => {
  const {setUpdatedFiles, removedImagesUrls, setRemovedImagesUrls} = useContextStrict(UploadFilesContext);

  useEffect(() => {
    return () => {
      setUpdatedFiles([]);
      setRemovedImagesUrls([]);
    }
  }, [setRemovedImagesUrls, setUpdatedFiles]);

  // DnD

  const swapPictures = useCallback((e, i, j) => {
    console.log(i, j, files[i], files[j]);
    [files[i], files[j]] = [files[j], files[i]];
    setUpdatedFiles([...files]);
  }, [files, setUpdatedFiles]);

  const handleDragStart = useCallback((e) => {
    const dragImage = document.createElement('img');
    dragImage.classList.add('drag-image');
    dragImage.src = e.target.src;
    document.body.appendChild(dragImage);

    const el = e.target.closest(".dropzone_preview__item");
    el.classList.add('dropzone_preview__item--dragged');
    e.dataTransfer.effectAllowed = 'move';
    if (e.target.dataset.url) {
      e.dataTransfer.setData('text', e.target.dataset.url);
    } else if (e.target.dataset.index) {
      e.dataTransfer.setData('text', e.target.dataset.index);
    }
    e.dataTransfer.setDragImage(dragImage, 0, 0);

    return true;
  }, []);

  const handleDrop = useCallback((e) => {
    if (e.stopPropagation) {
      e.stopPropagation();
    }
    let i;
    if (e.dataTransfer.getData('text')) {
      if (e.target.dataset.url) {
        i = files.indexOf(e.target.dataset.url);
      } else if (e.target.dataset.index) {
        i = +e.target.dataset.index;
      }
      const indexUrl = files.indexOf(e.dataTransfer.getData('text'));
      const j = indexUrl === -1 ? +e.dataTransfer.getData('text') : indexUrl;
      swapPictures(e, i, j);
    }

    return false;
  }, [files, swapPictures]);

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

  //handlers

  const handleDeleteFile = useCallback((e) => {
    const removedUrl = e.target.nextSibling.dataset.url;
    const remIndex = files.indexOf(removedUrl);
    if (remIndex !== -1) {
      const pictures = [...files];
      const deletedPictures = pictures.splice(remIndex, 1);
      const deletedPicturesUrl = deletedPictures.filter(i => typeof i === "string");
      setUpdatedFiles(pictures);
      const removedUrls = [...removedImagesUrls, ...deletedPicturesUrl];
      setRemovedImagesUrls(removedUrls as string[]);
    } else {
      const newResultFiles = files.filter(item => {
        if (typeof item !== "string") {
          return item.preview !== e.target.nextSibling.src
        }
        return true;
      });
      setUpdatedFiles(() => newResultFiles);
    }
  }, [files, setUpdatedFiles, removedImagesUrls, setRemovedImagesUrls]);

  //render

  const previews = useMemo(() => {
    return files.map(file => {
      const isUrl = typeof file === "string";
      if (isUrl) {
        const url = file as string;
        if (multiple) {
          return (
            <div className="dropzone_preview__item" key={url} draggable={true}
                 onDragStart={(e) => handleDragStart(e)}
                 onDragOver={(e) => handleDragOver(e)}
                 onDragEnter={(e) => handleDragEnter(e)}
                 onDragLeave={(e) => handleDragLeave(e)}
                 onDrop={(e) => handleDrop(e)}
                 onDragEnd={(e) => handleDragEnd(e)}
            >
              <div className="dropzone_preview_item__inner">
                <div className="dropzone_preview_item__delete-btn" onClick={(e) => handleDeleteFile(e)}/>
                <img src={`http://localhost:3005/api/${url}`} data-url={url} alt={''}/>
              </div>
            </div>
          );
        } else {
          return (
            <div className="dropzone_preview__item" key={url}>
              <div className="dropzone_preview_item__inner">
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
                 onDragStart={(e) => handleDragStart(e)}
                 onDragOver={(e) => handleDragOver(e)}
                 onDragEnter={(e) => handleDragEnter(e)}
                 onDragLeave={(e) => handleDragLeave(e)}
                 onDrop={(e) => handleDrop(e)}
                 onDragEnd={(e) => handleDragEnd(e)}
            >
              <div className="dropzone_preview_item__inner">
                <div className="dropzone_preview_item__delete-btn" onClick={(e) => handleDeleteFile(e)}/>
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
  }, [files, handleDeleteFile, handleDragEnd, handleDragEnter, handleDragLeave, handleDragOver, handleDragStart, handleDrop, multiple]);

  const mainPreview = useMemo(() => {
    return (
      <div className="dropzone_preview__item" key={previewUrl}>
        <div className="dropzone_preview_item__inner">
          <img src={`http://localhost:3005/api/${previewUrl}`} alt={''}/>
        </div>
      </div>
    )
  }, [previewUrl]);

  return (
    <div className="form-control form-control__dropzone">
      <InputFiles onChange={onChange} multiple={multiple}>
        <div className="form-control form-control__button">{label}</div>
      </InputFiles>
      <div className="dropzone__preview">
        {previewUrl && !multiple && previews.length === 0 ? mainPreview : ''}
        {previews}
      </div>
    </div>
  );
}
