import React, {FC} from 'react';

interface TProps extends React.HTMLProps<HTMLInputElement> {
  placeholder: string;
  errorMessage?: string;
  animationError?: boolean;
  hintMessage?: string;
  type?: string;
}

export const FormInput: FC<TProps> = (props) => {
  const {placeholder, errorMessage, hintMessage, type = 'text', animationError, ...forwardProps} = props;
  const error = errorMessage && errorMessage.length !== 0 ? 'form-control__input--error' : '';
  const animation = animationError ? 'form-control__input--animate-error form-control__input--error' : '';
  return (
    <>
      <input {...forwardProps} className={`form-control form-control__input ${error} ${animation}`} type={type} placeholder={placeholder}/>
      {/*<div>{errorMessage}</div>*/}
      {/*<div>{hintMessage}</div>*/}
    </>
  );
}
