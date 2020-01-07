import React, {FC, useCallback, useEffect, useState} from 'react';
import {UPDATE_INTERIOR} from "queries/mutations";
import {TUpdateInterior} from "types/common";
import {FileControl} from "components/FileControl/FileControl";
import {routes, TInteriorMatch} from "utils/routes";
import {match} from "react-router";
import { History } from 'history';
import {GET_INTERIOR_BY_ID, T_GET_INTERIOR_BY_ID, T_VAR_GET_INTERIOR_BY_ID} from "queries/interiors";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {useContextStrict} from "hooks/useContextStrict";
import {UploadMultiFilesContext} from "context/ctxUploadMultiFiles";
import {useForm} from "hooks/useForm";
import {TIntlDictionary} from "types/i18n";
import {arrayIsEmpty, stringIsEmpty, stringOrVoid} from "utils/stringUtils";
import {useIntlDictionary} from "hooks/useDictionary";
import {FormInput} from "components/FormInput/FormInput";
import {FormTextarea} from "components/FormTextarea/FormTextarea";
import {FormSubmitBtn} from "components/FormSubmitBtn/FormSubmitBtn";
import {UploadSingleFileContext} from "context/ctxUploadSingleFile";

type TInteriorEditFormValues = {
  nameRu: string;
  nameEn: string;
  typeRu: string;
  typeEn: string;
  yearRu: string;
  yearEn: string;
  descriptionRu: string;
  descriptionEn: string;
  multiPreviews: (UserFile | string)[];
}

const validateEditInteriorForm = (i18n: TIntlDictionary, multiFiles: (UserFile | string)[]) => (values: TInteriorEditFormValues) => ({
  nameRu: stringOrVoid(stringIsEmpty(values.nameRu), i18n.validation.required),
  nameEn: stringOrVoid(stringIsEmpty(values.nameEn), i18n.validation.required),
  typeRu: stringOrVoid(stringIsEmpty(values.typeRu), i18n.validation.required),
  typeEn: stringOrVoid(stringIsEmpty(values.typeEn), i18n.validation.required),
  yearRu: stringOrVoid(stringIsEmpty(values.yearRu), i18n.validation.required),
  yearEn: stringOrVoid(stringIsEmpty(values.yearEn), i18n.validation.required),
  descriptionRu: stringOrVoid(stringIsEmpty(values.descriptionRu), i18n.validation.required),
  descriptionEn: stringOrVoid(stringIsEmpty(values.descriptionEn), i18n.validation.required),
  multiPreviews: stringOrVoid(arrayIsEmpty(multiFiles), 'form-control__button--error'),
});

interface UserFile extends File {
  preview: string;
}

type TProps = {
  updateInterior: (interior: TUpdateInterior) => void;
  match: match<TInteriorMatch>;
  history: History
}

export const AdminEditInteriorPage: FC<TProps> = (props) => {
  console.log('RENDER EDIT_PAGE');
  const {singleFile} = useContextStrict(UploadSingleFileContext);
  const {multiFiles, setMultiFiles, removedImagesUrls} = useContextStrict(UploadMultiFilesContext);
  const {match, history} = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {loading, error, data} = useQuery<T_GET_INTERIOR_BY_ID, T_VAR_GET_INTERIOR_BY_ID>(GET_INTERIOR_BY_ID, {
    variables: {_id: match.params.id}
  });
  const interiorById = null || (data && data.interiorById);
  const [updateInterior] = useMutation<TUpdateInterior>(UPDATE_INTERIOR, {
    onCompleted: () => {
      history.push(routes.admin())
    }
  });
  const [initialValues, setInitialValues] = useState<TInteriorEditFormValues>({
    nameRu: '',
    nameEn: '',
    typeRu: '',
    typeEn: '',
    yearRu: '',
    yearEn: '',
    descriptionRu: '',
    descriptionEn: '',
    multiPreviews: []
  });
  const intl = useIntlDictionary();

  const validator = React.useMemo(() => validateEditInteriorForm(intl, multiFiles), [intl, multiFiles]);

  const {values, onChange, validation, validate} = useForm({initialValues, validator});

  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (interiorById) {
      setInitialValues({
        nameRu: interiorById.nameRu,
        nameEn: interiorById.nameEn,
        typeRu: interiorById.typeRu,
        typeEn: interiorById.typeEn,
        yearRu: interiorById.yearRu,
        yearEn: interiorById.yearEn,
        descriptionRu: interiorById.descriptionRu,
        descriptionEn: interiorById.descriptionEn,
        multiPreviews: interiorById.picturesUrl
      });
      setPreviewUrl(interiorById.previewUrl);
      setMultiFiles(interiorById.picturesUrl);
    }
  }, [interiorById, setMultiFiles]);

  const handleUpdate = useCallback(() => {
    const imagesOrder = multiFiles.reduce((acc: any, item) => {
      if (typeof item === "string") {
        acc.push(item)
      } else {
        acc.push('empty');
      }
      return acc;
    }, []);

    const addedFiles = multiFiles.filter(i => typeof i !== "string");

    const {nameRu, typeRu, yearRu, descriptionRu, nameEn, typeEn, yearEn, descriptionEn} = values;

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
        newPreview: singleFile,
        imagesOrder,
        addedFiles,
        removedImagesUrls,
      }
    };
    validate(() => updateInterior(updatedInterior));
  }, [multiFiles, values, match.params.id, previewUrl, singleFile, removedImagesUrls, validate, updateInterior]);

  return (
    <>
      {!interiorById && <div>{error && error.message}</div>}
      {
        !loading && interiorById &&
        <div className="admin-page">
          <form className="form" action="">
            <div className="form__left">
              <FormInput name="nameRu" placeholder='Имя' value={values.nameRu} onChange={onChange} errorMessage={validation.nameRu}/>
              <FormInput name="nameEn" placeholder='Name' value={values.nameEn} onChange={onChange} errorMessage={validation.nameEn}/>
              <FormInput name="typeRu" placeholder='Тип' value={values.typeRu} onChange={onChange} errorMessage={validation.typeRu}/>
              <FormInput name="typeEn" placeholder='Type' value={values.typeEn} onChange={onChange} errorMessage={validation.typeEn}/>
              <FormInput name="yearRu" placeholder='Год' value={values.yearRu} onChange={onChange} errorMessage={validation.yearRu}/>
              <FormInput name="yearEn" placeholder='Year' value={values.yearEn} onChange={onChange} errorMessage={validation.yearEn}/>
              <FormTextarea name="descriptionRu" placeholder='Описание' value={values.descriptionRu} onChange={onChange} errorMessage={validation.descriptionRu}/>
              <FormTextarea name="descriptionEn" placeholder='Description' value={values.descriptionEn} onChange={onChange} errorMessage={validation.descriptionEn}/>
              <FormSubmitBtn label={intl.ui.submit.update} onClick={handleUpdate}/>
            </div>
            <div className="form__right">
              <FileControl label={intl.ui.buttons.addPreview} previewUrl={previewUrl}/>
              <FileControl label={intl.ui.buttons.addImages} multiple={true} errorValidationClass={arrayIsEmpty(multiFiles) ? validation.multiPreviews : ''}/>
            </div>
          </form>
        </div>
      }
    </>
  );
}