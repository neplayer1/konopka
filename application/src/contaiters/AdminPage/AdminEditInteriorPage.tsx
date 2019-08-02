import React, {FC, useCallback, useEffect, useState} from 'react';
import {compose} from "react-apollo";
import {withGraphqlUpdate} from "queries/mutations";
import {TInterior, TUpdateInterior} from "types/common";
import {FileControl} from "components/FileControl/FileControl";
import {TInteriorMatch} from "utils/routes";
import {match} from "react-router";
import {withInteriorById} from "queries/interiors";

interface UserFile extends File {
  preview: string;
}

type TProps = {
  current: TInterior;
  updateInterior: (interior: TUpdateInterior) => void;
  match: match<TInteriorMatch>;
}

const AdminEditInteriorPage: FC<TProps> = (props) => {
  console.log('RENDER EDIT_PAGE', props);
  const {current, updateInterior, match} = props;
  const [mainFile, setMainFile] = useState<UserFile[]>([]);
  const [multiFiles, setMultiFiles] = useState<UserFile[]>([]);

  const [nameRu, setNameRu] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [typeRu, setTypeRu] = useState('');
  const [typeEn, setTypeEn] = useState('');
  const [yearRu, setYearRu] = useState('');
  const [yearEn, setYearEn] = useState('');
  const [descriptionRu, setDescriptionRu] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  const [picturesUrl, setPicturesUrl] = useState<string[]>([]);
  const [removedImagesUrls, setRemovedImagesUrls] = useState<string[]>([]);

  useEffect(() => {
    if (current) {
      setNameRu(current.nameRu);
      setNameEn(current.nameEn);
      setTypeRu(current.typeRu);
      setTypeEn(current.typeEn);
      setYearRu(current.yearRu);
      setYearEn(current.yearEn);
      setDescriptionRu(current.descriptionRu);
      setDescriptionEn(current.descriptionEn);
      setPreviewUrl([current.previewUrl]);
      setPicturesUrl(current.picturesUrl);
    }
  }, [current]);

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
    const updatedInterior = {
      _id: match.params.id,
      nameRu,
      typeRu,
      yearRu,
      descriptionRu,
      nameEn,
      typeEn,
      yearEn,
      descriptionEn,
      previewUrl: previewUrl[0],
      newPreview: mainFile,
      imagesUrls: picturesUrl,
      newImages: multiFiles,
      removedImagesUrls,
    }
    console.log(updatedInterior)
    updateInterior(updatedInterior);
  }, [match.params.id, updateInterior, nameRu, typeRu, yearRu, descriptionRu, nameEn, typeEn, yearEn, descriptionEn, previewUrl, mainFile, picturesUrl, multiFiles, removedImagesUrls]);

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

    const uniqueFiles = filesWithPreview.reduce((acc: UserFile[], el: UserFile) => {
      if (!multiFiles.find(({lastModified}) => el.lastModified === lastModified)) {
        acc.push(el);
      }
      return acc;
    }, []);

    if (uniqueFiles.length !== 0) {
      setMultiFiles([...multiFiles, ...uniqueFiles]);
    }
  }, [multiFiles]);

  const handleDeletePreview = useCallback((e) => {
    console.log(e.currentTarget, e.target.dataset.url);
    const removedUrl = e.target.dataset.url;
    const remIndex = picturesUrl.indexOf(removedUrl);
    if (remIndex !== -1) {
      const pictures = [...picturesUrl];
      const deletedPictureUrl = pictures.splice(remIndex, 1);
      setPicturesUrl(pictures);
      const removedUrls = [...removedImagesUrls, ...deletedPictureUrl];
      setRemovedImagesUrls(removedUrls);
    }
  }, [picturesUrl, removedImagesUrls]);

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
          <FileControl files={mainFile} urls={previewUrl} onChange={handleSetMainFile} onDeletePreview={handleDeletePreview} label="Add preview"/>
          <FileControl files={multiFiles} urls={picturesUrl} onChange={handleSetProjectFiles} onDeletePreview={handleDeletePreview} label="Add project files" multiple={true}/>
        </div>
      </form>
    </div>
  );
}

export default compose(withGraphqlUpdate, withInteriorById)(AdminEditInteriorPage)
