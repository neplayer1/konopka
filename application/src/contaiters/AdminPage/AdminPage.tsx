import React, {FC, useMemo} from 'react';
import {GET_ALL_INTERIORS, T_GET_ALL_INTERIORS} from "queries/interiors";
import {Link} from 'react-router-dom';
import {routes} from "utils/routes";
import {useQuery} from "@apollo/react-hooks";
import {GET_ALL_FURNITURE, T_GET_ALL_FURNITURE} from "queries/furniture";

export const AdminPage: FC = () => {
  const {loading: loadingInteriors, error: errorInteriors, data: dataInteriors} = useQuery<T_GET_ALL_INTERIORS>(GET_ALL_INTERIORS);
  const {loading: loadingFurniture, error: errorFurniture, data: dataFurniture} = useQuery<T_GET_ALL_FURNITURE>(GET_ALL_FURNITURE);

  const {interiors = []} = dataInteriors!;
  const {furniture = []} = dataFurniture!;

  const listInteriors = useMemo(() => {
    return interiors.map((interior) => {
      return (
        <div key={interior._id} className="articles_list__item">
          <div className="articles_list_item__name">{interior.nameRu}</div>
          <Link className="articles_list_item__btn articles_list_item__btn--edit" to={routes.adminEditInterior({id: interior._id})}>Редактрировать</Link>
          <div className="articles_list_item__btn articles_list_item__btn--delete">Удалить</div>
        </div>
      )
    });
  }, [interiors]);

  const listFurniture = useMemo(() => {
    return furniture.map((furnitur) => {
      return (
        <div key={furnitur._id} className="articles_list__item">
          <div className="articles_list_item__name">{furnitur.nameRu}</div>
          <div className="articles_list_item__btn articles_list_item__btn--edit">Редактрировать</div>
          <div className="articles_list_item__btn articles_list_item__btn--delete">Удалить</div>
        </div>
      )
    });
  }, [furniture]);

  return (
    <div className="admin-page">
      <div className="articles">
        <div className="articles__list">
          <div className="articles_list__title">Интерьеры</div>
          {!loadingInteriors && listInteriors}
          <div className="form-control__button">Добавить</div>
        </div>
        <div className="articles__list">
          <div className="articles_list__title">Мебель</div>
          {!loadingFurniture && listFurniture}
          <div className="form-control__button">Добавить</div>
        </div>
      </div>
    </div>
  );
}