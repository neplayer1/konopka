import React, {FC, useCallback, useEffect, useState} from 'react';
import {UPDATE_INTERIOR} from "queries/mutations";
import {TUpdateInterior} from "types/common";
import {FileControl} from "components/FileControl/FileControl";
import {TInteriorMatch} from "utils/routes";
import {match} from "react-router";
import {GET_INTERIOR_BY_ID, T_GET_INTERIOR_BY_ID, T_VAR_GET_INTERIOR_BY_ID} from "queries/interiors";
import {useMutation, useQuery} from "@apollo/react-hooks";

interface UserFile extends File {
  preview: string;
}

type TProps = {
  updateInterior: (interior: TUpdateInterior) => void;
  match: match<TInteriorMatch>;
}

export const AdminEditInteriorPage: FC<TProps> = (props) => {
  console.log('RENDER EDIT_PAGE', props);
  const {match} = props;
  const {loading, error, data} = useQuery<T_GET_INTERIOR_BY_ID, T_VAR_GET_INTERIOR_BY_ID>(GET_INTERIOR_BY_ID, {
    variables: {_id: match.params.id}
  });
  const {interiorById} = data!;
  const [updateInterior] = useMutation<TUpdateInterior>(UPDATE_INTERIOR);
  const [mainFile, setMainFile] = useState<UserFile[]>([]);

  const [nameRu, setNameRu] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [typeRu, setTypeRu] = useState('');
  const [typeEn, setTypeEn] = useState('');
  const [yearRu, setYearRu] = useState('');
  const [yearEn, setYearEn] = useState('');
  const [descriptionRu, setDescriptionRu] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [picturesUrl, setPicturesUrl] = useState<string[]>([]);
  const [removedImagesUrls, setRemovedImagesUrls] = useState<string[]>([]);

  const [updatedImages, setUpdatedFiles] = useState<(UserFile | string)[]>([]);

  useEffect(() => {
    setUpdatedFiles(picturesUrl);
    if (interiorById) {
      setNameRu(interiorById.nameRu);
      setNameEn(interiorById.nameEn);
      setTypeRu(interiorById.typeRu);
      setTypeEn(interiorById.typeEn);
      setYearRu(interiorById.yearRu);
      setYearEn(interiorById.yearEn);
      setDescriptionRu(interiorById.descriptionRu);
      setDescriptionEn(interiorById.descriptionEn);
      setPreviewUrl(interiorById.previewUrl);
      setPicturesUrl(interiorById.picturesUrl);
    }
  }, [interiorById, picturesUrl]);

  const handleChangeNameRu = useCallback((event) => {
    setNameRu(event.target.value);
  }, []);
  const handleChangeNameEn = useCallback((event) => {
    setNameEn(event.target.value);
  }, []);
  const handleChangeTypeRu = useCallback((event) => {
    setTypeRu(event.target.value);
  }, []);
  const handleChangeTypeEn = useCallback((event) => {
    setTypeEn(event.target.value);
  }, []);
  const handleChangeYearRu = useCallback((event) => {
    setYearRu(event.target.value);
  }, []);
  const handleChangeYearEn = useCallback((event) => {
    setYearEn(event.target.value);
  }, []);
  const handleChangeDescriptionRu = useCallback((event) => {
    setDescriptionRu(event.target.value);
  }, []);
  const handleChangeDescriptionEn = useCallback((event) => {
    setDescriptionEn(event.target.value);
  }, []);

  const update = useCallback(() => {
    const imagesOrder = updatedImages.reduce((acc: any, item) => {
      if (typeof item === "string") {
        acc.push(item)
      } else {
        acc.push('empty');
      }
      return acc;
    }, []);
    const addedFiles = updatedImages.filter(i => typeof i !== "string");
    console.log(addedFiles)

    const updatedInterior = {
      variables: {
        _id: match.params.id,
        nameRu,
        typeRu,
        yearRu,
        descriptionRu,
        nameEn,
        typeEn,
        yearEn,
        descriptionEn,
        previewUrl: previewUrl,
        newPreview: mainFile,
        imagesOrder,
        addedFiles,
        removedImagesUrls,
      }
    }
    console.log(updatedInterior);
    updateInterior(updatedInterior);
  }, [match.params.id, nameRu, typeRu, yearRu, descriptionRu, nameEn, typeEn, yearEn, descriptionEn, previewUrl, mainFile, updatedImages, removedImagesUrls, updateInterior]);

  const handleSetMainFile = useCallback((file) => {
    if (file.length !== 0) {
      const fileWithPreview = Object.assign(file[0], {
        preview: URL.createObjectURL(file[0])
      });
      setMainFile([fileWithPreview]);
    }
  }, []);

  const handleSetProjectFiles = useCallback((files: FileList) => {
    const filesWithPreview = Array.from(files).map(file => Object.assign(file, {
      preview: URL.createObjectURL(file)
    }));
    const uniqueFiles = filesWithPreview.reduce((acc: (string | UserFile)[], el: UserFile | string) => {
      const isFileFound = updatedImages.find((item: string | UserFile) => {
        if (typeof item !== "string" && typeof el !== "string") {
          return el.lastModified === item.lastModified;
        }
        return false;
      });
      if (!isFileFound) {
        acc.push(el);
      }
      return acc;
    }, []);

    if (uniqueFiles.length !== 0) {
      setUpdatedFiles([...updatedImages, ...uniqueFiles])
    }

  }, [updatedImages]);

  const handleDeleteFile = useCallback((e) => {
    const removedUrl = e.target.nextSibling.dataset.url;
    const remIndex = updatedImages.indexOf(removedUrl);
    if (remIndex !== -1) {
      const pictures = [...updatedImages];
      const deletedPictures = pictures.splice(remIndex, 1);
      const deletedPicturesUrl = deletedPictures.filter(i => typeof i === "string");
      setUpdatedFiles(pictures);
      const removedUrls = [...removedImagesUrls, ...deletedPicturesUrl];
      setRemovedImagesUrls(removedUrls as string[]);
    } else {
      const newResultFiles = updatedImages.filter(item => {
        if (typeof item !== "string") {
          return item.preview !== e.target.nextSibling.src
        }
        return true;
      });
      setUpdatedFiles(() => newResultFiles);
    }
  }, [removedImagesUrls, updatedImages]);

  //DnD

  const swapPictures = useCallback((e, i, j) => {
    console.log(i, j, updatedImages[i], updatedImages[j]);
    [updatedImages[i], updatedImages[j]] = [updatedImages[j], updatedImages[i]];
    setUpdatedFiles([...updatedImages]);
  }, [updatedImages]);

  console.log("updatedImages", updatedImages);

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
        i = updatedImages.indexOf(e.target.dataset.url);
      } else if (e.target.dataset.index) {
        i = +e.target.dataset.index;
      }
      const indexUrl = updatedImages.indexOf(e.dataTransfer.getData('text'));
      const j = indexUrl === -1 ? +e.dataTransfer.getData('text') : indexUrl;
      swapPictures(e, i, j);
    }

    return false;
  }, [updatedImages, swapPictures]);

  return (
    <div className="admin-page">
      <form className="form" action="">
        <div className="form__left">
          <input className="form-control form-control__input" type="text" placeholder='Имя' value={nameRu} onChange={handleChangeNameRu}/>
          <input className="form-control form-control__input" type="text" placeholder='Name' value={nameEn} onChange={handleChangeNameEn}/>
          <input className="form-control form-control__input" type="text" placeholder='Тип' value={typeRu} onChange={handleChangeTypeRu}/>
          <input className="form-control form-control__input" type="text" placeholder='Type' value={typeEn} onChange={handleChangeTypeEn}/>
          <input className="form-control form-control__input" type="text" placeholder='Год' value={yearRu} onChange={handleChangeYearRu}/>
          <input className="form-control form-control__input" type="text" placeholder='Year' value={yearEn} onChange={handleChangeYearEn}/>
          <div className="form-control form-control__textarea">
            <div className="expandingArea">
              <textarea placeholder='Описание' value={descriptionRu} onChange={handleChangeDescriptionRu}/>
              <pre>
                <span>{descriptionRu}</span>
                <br/>
              </pre>
            </div>
          </div>
          <div className="form-control form-control__textarea">
            <div className="expandingArea">
              <textarea placeholder='Description' value={descriptionEn} onChange={handleChangeDescriptionEn}/>
              <pre>
                <span>{descriptionEn}</span>
                <br/>
              </pre>
            </div>
          </div>
          <div className="form-control form-control__button" onClick={update}>Update</div>
        </div>
        <div className="form__right">
          <FileControl files={mainFile} previewUrl={previewUrl} onChange={handleSetMainFile} label="Add preview"/>
          <FileControl files={updatedImages}
                       onChange={handleSetProjectFiles} onDelete={handleDeleteFile}
                       label="Add project files" multiple={true}
                       onDragStart={handleDragStart}
                       onDrop={handleDrop}
          />
        </div>
      </form>
    </div>
  );
}