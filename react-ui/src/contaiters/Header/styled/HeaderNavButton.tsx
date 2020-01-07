import React, { FC } from 'react';

type TProps = {
  onClick: () => void;
  label: string;
};

export const HeaderNavButton: FC<TProps> = ({onClick, label}) => (
  <div onClick={onClick} className="header_nav__link header_nav__link--button">
    {label}
  </div>
);
