import React, {FC, useCallback, useState} from 'react';
import {FileControl} from "components/FileControl/FileControl";
import {useMutation} from "@apollo/react-hooks";
import {ADD_INTERIOR} from "queries/mutations";
import {useContextStrict} from "hooks/useContextStrict";
import {UploadFilesContext} from "context/ctxUploadFiles";

interface UserFile extends File {
  preview: string;
}

export const AdminAddInteriorPage: FC<any> = (props) => {
  console.log('RENDER ADD_PAGE', props);
  const {updatedFiles: addedFiles, setUpdatedFiles: setAddedFiles} = useContextStrict(UploadFilesContext);
  const [addInterior] = useMutation(ADD_INTERIOR);
  const [mainFile, setMainFile] = useState<UserFile[]>([]);

  const [nameRu, setNameRu] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [typeRu, setTypeRu] = useState('');
  const [typeEn, setTypeEn] = useState('');
  const [yearRu, setYearRu] = useState('');
  const [yearEn, setYearEn] = useState('');
  const [descriptionRu, setDescriptionRu] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');

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

  const add = useCallback(() => {
    const newInterior = {
      variables: {nameRu, typeRu, yearRu, descriptionRu, nameEn, typeEn, yearEn, descriptionEn, preview: mainFile, images: addedFiles},
      // refetchQueries: [ { query: GET_ALL_INTERIORS }]
    }
    addInterior(newInterior);
  }, [mainFile, addedFiles, nameRu, typeRu, yearRu, descriptionRu, nameEn, typeEn, yearEn, descriptionEn, addInterior]);

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
      if (!(addedFiles as UserFile[]).find(({lastModified}) => el.lastModified === lastModified)) {
        acc.push(el);
      }
      return acc;
    }, []);

    if (uniqueFiles.length !== 0) {
      setAddedFiles([...addedFiles, ...uniqueFiles]);
    }
  }, [addedFiles, setAddedFiles]);

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
          <div className="form-control form-control__button" onClick={add}>Add</div>
        </div>
        <div className="form__right">
          <FileControl files={mainFile} onChange={handleSetMainFile} label="Add preview"/>
          <FileControl files={addedFiles} onChange={handleSetProjectFiles} label="Add project files" multiple={true}/>
        </div>
      </form>
    </div>
  );
}