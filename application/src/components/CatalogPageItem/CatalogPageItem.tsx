import React, {FC, useMemo} from 'react';
import { routes } from 'utils/routes';
import { Link } from 'react-router-dom';
import {TInterior} from "../../queries/interiors";
import {TFurniture} from "../../queries/furniture";
import {isHidden} from "../../utils/common";

type TCatalogItem = {
  currentItem: TInterior | TFurniture;
  prevItem: TInterior | TFurniture;
  nextItem: TInterior | TFurniture;
  handlePrevItem: () => void;
  handleNextItem: () => void;
}

export const CatalogPageItem: FC<TCatalogItem> = ({currentItem, prevItem, nextItem, handlePrevItem, handleNextItem}) => {
  const {name, type, year, description, picturesUrl} = currentItem;

  const catalogImages = useMemo(() => {
    return picturesUrl.map((url) => (
      <img key={url} src={`http://localhost:3005/images/${url}`} alt=""/>
    ))
  }, [picturesUrl]);

  return (
    <div className="catalog-item">
      <div className="catalog-item__left">
        <div className="catalog-item_left__inner">
          <Link to={routes.interiors({})} className="catalog-item__back"/>
          <div className="catalog-item__title">{name}</div>
          <div className="catalog-item__type">Тип: {type}</div>
          <div className="catalog-item__year">Год: {year}</div>
          <div className="catalog-item__description">{description}</div>
        </div>
      </div>
      <div className="catalog-item__images">
        {catalogImages}
      </div>
      <div className="catalog-item__right">
        <div className="catalog-item_right__inner">
          <div className="catalog-item__navigation">
            <div className="catalog-item_navigation-item catalog-item_navigation-item--left" style={isHidden(!!prevItem)} onClick={handlePrevItem}><span/>{prevItem ? prevItem.name : name}</div>
            <div className="catalog-item_navigation-item catalog-item_navigation-item--right" style={isHidden(!!nextItem)} onClick={handleNextItem}>{nextItem ? nextItem.name : name}<span/></div>
          </div>
        </div>
      </div>
    </div>
  );
}