import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type TProps = {
  url: string;
  label: string;
  onClick: () => void;
};

export const HeaderNavLink: FC<TProps> = ({url, label, onClick}) => (
  <Link onClick={onClick} to={url} className="header_nav__link">
    {label}
  </Link>
);
