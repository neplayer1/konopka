import {useCallback} from 'react';
import {useContextStrict} from "hooks/useContextStrict";
import {UploadMultiFilesContext} from "context/ctxUploadMultiFiles";

export const useFileControlModel = () => {
  const {multiFiles, setMultiFiles, removedImagesUrls, setRemovedImagesUrls} = useContextStrict(UploadMultiFilesContext);
  // DnD

  const swapPictures = useCallback((e, i, j) => {
    console.log(i, j, multiFiles[i], multiFiles[j]);
    [multiFiles[i], multiFiles[j]] = [multiFiles[j], multiFiles[i]];
    setMultiFiles([...multiFiles]);
  }, [multiFiles, setMultiFiles]);

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
        i = multiFiles.indexOf(e.target.dataset.url);
      } else if (e.target.dataset.index) {
        i = +e.target.dataset.index;
      }
      const indexUrl = multiFiles.indexOf(e.dataTransfer.getData('text'));
      const j = indexUrl === -1 ? +e.dataTransfer.getData('text') : indexUrl;
      swapPictures(e, i, j);
    }

    return false;
  }, [multiFiles, swapPictures]);

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
    const remIndex = multiFiles.indexOf(removedUrl);
    if (remIndex !== -1) {
      const pictures = [...multiFiles];
      const deletedPictures = pictures.splice(remIndex, 1);
      const deletedPicturesUrl = deletedPictures.filter(i => typeof i === "string");
      setMultiFiles(pictures);
      const removedUrls = [...removedImagesUrls, ...deletedPicturesUrl];
      setRemovedImagesUrls(removedUrls as string[]);
    } else {
      const newResultFiles = multiFiles.filter(item => {
        if (typeof item !== "string") {
          return item.preview !== e.target.nextSibling.src
        }
        return true;
      });
      setMultiFiles(() => newResultFiles);
    }
  }, [multiFiles, setMultiFiles, removedImagesUrls, setRemovedImagesUrls]);

  return {
    handleDragStart,
    handleDrop,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDragEnd,
    handleDeleteFile
  };
}