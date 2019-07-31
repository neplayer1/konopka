import React, {FC, useCallback, useState} from 'react';
import {useDropzone} from "react-dropzone";
import {graphql} from "react-apollo";
import {addInteriorMutation} from "queries/mutations";
import {DropzoneFieldSingle} from "components/DropzoneSingle/DropzoneFieldSingle";
import {DropzoneFieldMulti} from "components/DropzoneMulti/DropzoneFieldMulti";

interface UserFile extends File {
  preview: string;
}

const AdminPage: FC<any> = (props) => {
  const {mutate} = props;
  const [mainFile, setMainFile] = useState<UserFile[]>([]);
  const [multiFiles, setMultiFiles] = useState<UserFile[]>([]);

  const {acceptedFiles: mainImageFile, getRootProps: mainImageRootProps, getInputProps: mainImageInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: mainImageFile => {
      setMainFile(mainImageFile.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const {acceptedFiles: multiImgFiles, getRootProps: multiImgRootProps, getInputProps: multiImgInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: multiImgFiles => {
      const files = multiImgFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }));

      const uniqueFiles = files.reduce((acc: UserFile[], el: UserFile) => {
        if (!multiFiles.find(({lastModified}) => el.lastModified === lastModified)) {
          acc.push(el);
        }
        return acc;
      }, []);

      setMultiFiles([...multiFiles, ...uniqueFiles]);
    }
  });

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
    const preview = mainImageFile;
    const images = multiImgFiles;
    console.log(preview, images);
    mutate({
      variables: {nameRu, typeRu, yearRu, descriptionRu, nameEn, typeEn, yearEn, descriptionEn, preview, images},
      // refetchQueries: [ { query: interiorsQuery }]
    });
  }, [nameRu, typeRu, yearRu, descriptionRu, nameEn, typeEn, yearEn, descriptionEn, mainImageFile, multiImgFiles, mutate]);

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
          <DropzoneFieldSingle acceptedFiles={mainFile} getRootProps={mainImageRootProps} getInputProps={mainImageInputProps}/>
          <DropzoneFieldMulti acceptedFiles={multiFiles} getRootProps={multiImgRootProps} getInputProps={multiImgInputProps}/>
        </div>
      </form>
    </div>
  );
}

export default graphql(addInteriorMutation)(AdminPage)
