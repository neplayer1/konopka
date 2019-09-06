import React, {FC} from 'react';

interface TProps extends React.HTMLProps<HTMLTextAreaElement> {
  placeholder: string;
  errorMessage?: string;
  hintMessage?: string;
}

export const FormTextarea: FC<TProps> = (props) => {
  const {name, placeholder, errorMessage, value, onChange} = props;
  const error = errorMessage && errorMessage.length !== 0 ? 'form-control__textarea--error' : '';
  return (
    <>
      <div className={`form-control form-control__textarea ${error}`}>
        <div className="expandingArea">
          <textarea name={name} placeholder={placeholder} value={value} onChange={onChange}/>
          <pre>
              <span>{value}</span>
              <br/>
              </pre>
        </div>
      </div>
      {/*<div>{errorMessage}</div>*/}
      {/*<div>{hintMessage}</div>*/}
    </>
  );
}
