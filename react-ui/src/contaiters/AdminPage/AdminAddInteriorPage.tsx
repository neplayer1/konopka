import React, {FC, useCallback} from 'react';
import {FileControl} from "components/FileControl/FileControl";
import {useMutation} from "@apollo/react-hooks";
import {ADD_INTERIOR} from "queries/mutations";
import {useContextStrict} from "hooks/useContextStrict";
import {UploadMultiFilesContext} from "context/ctxUploadMultiFiles";
import {TIntlDictionary} from "types/i18n";
import {useIntlDictionary} from "hooks/useDictionary";
import {useForm} from "hooks/useForm";
import {FormInput} from "components/FormInput/FormInput";
import {FormTextarea} from "components/FormTextarea/FormTextarea";
import {UploadSingleFileContext} from "context/ctxUploadSingleFile";
import {arrayIsEmpty, stringIsEmpty, stringOrVoid, valueIsString} from "utils/stringUtils";
import {FormSubmitBtn} from "components/FormSubmitBtn/FormSubmitBtn";
import {UserFile} from "types/common";
import {routes} from "utils/routes";
import {History} from "history";
import {GET_ALL_INTERIORS} from "queries/interiors";

type TInteriorFormValues = {
  nameRu: string;
  nameEn: string;
  typeRu: string;
  typeEn: string;
  yearRu: string;
  yearEn: string;
  descriptionRu: string;
  descriptionEn: string;
  preview: string;
  multiPreviews: string;
}

const initialValues: TInteriorFormValues = {
  nameRu: '',
  nameEn: '',
  typeRu: '',
  typeEn: '',
  yearRu: '',
  yearEn: '',
  descriptionRu: '',
  descriptionEn: '',
  preview: '',
  multiPreviews: ''
};

const validateAddInteriorForm = (i18n: TIntlDictionary, singleFile: UserFile | string, multiFiles: (UserFile | string)[]) => (values: TInteriorFormValues) => ({
  nameRu: stringOrVoid(stringIsEmpty(values.nameRu), i18n.validation.required),
  nameEn: stringOrVoid(stringIsEmpty(values.nameEn), i18n.validation.required),
  typeRu: stringOrVoid(stringIsEmpty(values.typeRu), i18n.validation.required),
  typeEn: stringOrVoid(stringIsEmpty(values.typeEn), i18n.validation.required),
  yearRu: stringOrVoid(stringIsEmpty(values.yearRu), i18n.validation.required),
  yearEn: stringOrVoid(stringIsEmpty(values.yearEn), i18n.validation.required),
  descriptionRu: stringOrVoid(stringIsEmpty(values.descriptionRu), i18n.validation.required),
  descriptionEn: stringOrVoid(stringIsEmpty(values.descriptionEn), i18n.validation.required),
  preview: stringOrVoid(valueIsString(singleFile), 'form-control__button--error'),
  multiPreviews: stringOrVoid(arrayIsEmpty(multiFiles), 'form-control__button--error'),
});

type TProps = {
  history: History
}

export const AdminAddInteriorPage: FC<TProps> = ({history}) => {
  console.log('RENDER ADD_PAGE');
  const {multiFiles} = useContextStrict(UploadMultiFilesContext);
  console.log(multiFiles)
  const {singleFile} = useContextStrict(UploadSingleFileContext);
  const [addInterior] = useMutation(ADD_INTERIOR, {
    onCompleted: () => {
      history.push(routes.adminDashboard())
    }
  });

  const intl = useIntlDictionary();

  const validator = React.useMemo(() => validateAddInteriorForm(intl, singleFile, multiFiles), [intl, multiFiles, singleFile]);

  const {values, onChange, validation, validate} = useForm({initialValues, validator});

  const handleAdd = useCallback(() => {
    const {nameRu, typeRu, yearRu, descriptionRu, nameEn, typeEn, yearEn, descriptionEn} = values;
    console.log("images", multiFiles);
    const newInterior = {
      variables: {nameRu, typeRu, yearRu, descriptionRu, nameEn, typeEn, yearEn, descriptionEn, preview: singleFile, images: multiFiles},
      refetchQueries: [ { query: GET_ALL_INTERIORS }]
    };
    validate(() => addInterior(newInterior));
  }, [addInterior, multiFiles, singleFile, validate, values]);

  return (
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
          <FormSubmitBtn label={intl.ui.submit.add} onClick={handleAdd}/>
        </div>
        <div className="form__right">
          <FileControl label={intl.ui.buttons.addPreview} errorValidationClass={valueIsString(singleFile) ? validation.preview : ''}/>
          <FileControl label={intl.ui.buttons.addImages} multiple={true}  errorValidationClass={arrayIsEmpty(multiFiles) ? validation.multiPreviews : ''}/>
        </div>
      </form>
    </div>
  );
}