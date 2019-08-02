import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type TProps = {
  label: string;
  url: string;
  imageSrc?: string;
};

export const CatalogPageImage: FC<TProps> = ({label, url, imageSrc}) => {
    return (
      <div>
        <Link to={url} data-text={label}>
            <img src={`http://localhost:3005/api/${imageSrc}`} alt=""/>
        </Link>
      </div>
    );
}
