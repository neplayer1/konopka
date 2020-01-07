import React, {FC} from 'react';

type TProps = {
  label: string;
  onClick: () => void;
};

export const FormSubmitBtn: FC<TProps> = ({label, onClick}) => (
  <div className="form-control form-control__button" onClick={onClick}>{label}</div>
);
