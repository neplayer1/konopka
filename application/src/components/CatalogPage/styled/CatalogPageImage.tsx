import React, { FC } from 'react';
import sample from 'images/sample.jpg';
import { Link } from 'react-router-dom';

type TProps = {
  label: string;
  url: string;
  imageSrc?: string;
};

export const CatalogPageImage: FC<TProps> = ({label, url, imageSrc}) => (
  <Link to={url} data-text={label}>
    <img src={sample} alt=""/>
  </Link>
);
