import React, { FC } from 'react';
import sample from 'images/sample.jpg';
import { routes } from 'utils/routes';
import { Link } from 'react-router-dom';
import {TInterior} from "../../queries/interiors";
import {TFurniture} from "../../queries/furniture";

type TCatalogItem = {
  currentItem: TInterior | TFurniture;
  prevItem: TInterior | TFurniture;
  nextItem: TInterior | TFurniture;
  handlePrevItem: () => void;
  handleNextItem: () => void;
}

export const CatalogPageItem: FC<TCatalogItem> = ({currentItem, prevItem, nextItem, handlePrevItem, handleNextItem}) => {
  return (
    <div className="catalog-item">
      <div className="catalog-item__left">
        <div className="catalog-item_left__inner">
          <Link to={routes.interiors({})} className="catalog-item__back"/>
          <div className="catalog-item__title">{currentItem && currentItem.name}</div>
          <div className="catalog-item__type">Тип: {currentItem && currentItem.type}</div>
          <div className="catalog-item__year">Год: {currentItem && currentItem.year}</div>
          <div className="catalog-item__description">{currentItem && currentItem.description}</div>
        </div>
      </div>
      <div className="catalog-item__images">
        <img src={sample} alt=""/>
        <img src={sample} alt=""/>
        <img src={sample} alt=""/>
        <img src={sample} alt=""/>
        <img src={sample} alt=""/>
        <img src={sample} alt=""/>
        <img src={sample} alt=""/>
        <img src={sample} alt=""/>
        <img src={sample} alt=""/>
        <img src={sample} alt=""/>
        <img src={sample} alt=""/>
      </div>
      <div className="catalog-item__right">
        <div className="catalog-item_right__inner">
          <div className="catalog-item__navigation">
            {prevItem && <div className="catalog-item_navigation-item catalog-item_navigation-item--left" onClick={handlePrevItem}><span/>{prevItem.name}</div>}
            {nextItem && <div className="catalog-item_navigation-item catalog-item_navigation-item--right" onClick={handleNextItem}>{nextItem.name}<span/></div>}
          </div>
        </div>
      </div>
    </div>
  );
}