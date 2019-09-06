import React, {FC} from 'react';

interface TProps extends React.HTMLProps<HTMLInputElement> {
  placeholder: string;
  errorMessage?: string;
  hintMessage?: string;
}

export const FormInput: FC<TProps> = (props) => {
  const {placeholder, errorMessage, hintMessage, ...forwardProps} = props;
  const error = errorMessage && errorMessage.length !== 0 ? 'form-control__input--error' : '';
  return (
    <>
      <input {...forwardProps} className={`form-control form-control__input ${error}`} type="text" placeholder={placeholder}/>
      {/*<div>{errorMessage}</div>*/}
      {/*<div>{hintMessage}</div>*/}
    </>
  );
}
