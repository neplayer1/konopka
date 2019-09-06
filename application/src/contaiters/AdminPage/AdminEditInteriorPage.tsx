import React, {FC, useCallback, useEffect, useState} from 'react';
import {UPDATE_INTERIOR} from "queries/mutations";
import {TUpdateInterior} from "types/common";
import {FileControl} from "components/FileControl/FileControl";
import {TInteriorMatch} from "utils/routes";
import {match} from "react-router";
import {GET_INTERIOR_BY_ID, T_GET_INTERIOR_BY_ID, T_VAR_GET_INTERIOR_BY_ID} from "queries/interiors";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {useContextStrict} from "hooks/useContextStrict";
import {UploadMultiFilesContext} from "context/ctxUploadMultiFiles";

interface UserFile extends File {
  preview: string;
}

type TProps = {
  updateInterior: (interior: TUpdateInterior) => void;
  match: match<TInteriorMatch>;
}

export const AdminEditInteriorPage: FC<TProps> = (props) => {
  console.log('RENDER EDIT_PAGE', props);
  const {multiFiles, setMultiFiles, removedImagesUrls} = useContextStrict(UploadMultiFilesContext);
  const {match} = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {loading, error, data} = useQuery<T_GET_INTERIOR_BY_ID, T_VAR_GET_INTERIOR_BY_ID>(GET_INTERIOR_BY_ID, {
    variables: {_id: match.params.id}
  });
  const {interiorById} = data!;
  const [updateInterior] = useMutation<TUpdateInterior>(UPDATE_INTERIOR);
  const [mainFile] = useState<UserFile[]>([]);

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

  console.log("multiFiles", multiFiles);

  useEffect(() => {
    setMultiFiles(picturesUrl);
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
  }, [interiorById, picturesUrl, setMultiFiles]);

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
    const imagesOrder = multiFiles.reduce((acc: any, item) => {
      if (typeof item === "string") {
        acc.push(item)
      } else {
        acc.push('empty');
      }
      return acc;
    }, []);
    const addedFiles = multiFiles.filter(i => typeof i !== "string");

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
    updateInterior(updatedInterior);
  }, [match.params.id, nameRu, typeRu, yearRu, descriptionRu, nameEn, typeEn, yearEn, descriptionEn, previewUrl, mainFile, multiFiles, removedImagesUrls, updateInterior]);

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
          <FileControl previewUrl={previewUrl} label="Add preview"/>
          <FileControl label="Add project files" multiple={true}/>
        </div>
      </form>
    </div>
  );
}