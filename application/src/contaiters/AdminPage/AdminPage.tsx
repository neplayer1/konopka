import React, {FC, useMemo} from 'react';
import {compose} from "react-apollo";
import {withAllInteriors} from "queries/interiors";
import {TFurniture, TInterior} from "types/common";
import {withAllFurniture} from "queries/furniture";
import {Link} from 'react-router-dom';
import {routes} from "utils/routes";

type TProps = {
  allInteriors: TInterior[];
  allFurniture: TFurniture[];
}

const AdminPage: FC<TProps> = (props) => {
  console.log(props)
  const {allInteriors = [], allFurniture = []} = props;

  const listInteriors = useMemo(() => {
    return allInteriors.map((interior) => {
      return (
        <div key={interior._id} className="articles_list__item">
          <div className="articles_list_item__name">{interior.nameRu}</div>
          <Link className="articles_list_item__btn articles_list_item__btn--edit" to={routes.adminEditInterior({id: interior._id})}>Редактрировать</Link>
          <div className="articles_list_item__btn articles_list_item__btn--delete">Удалить</div>
        </div>
      )
    });
  }, [allInteriors]);

  const listFurniture = useMemo(() => {
    return allFurniture.map((furnitur) => {
      return (
        <div key={furnitur._id} className="articles_list__item">
          <div className="articles_list_item__name">{furnitur.nameRu}</div>
          <div className="articles_list_item__btn articles_list_item__btn--edit">Редактрировать</div>
          <div className="articles_list_item__btn articles_list_item__btn--delete">Удалить</div>
        </div>
      )
    });
  }, [allFurniture]);

  return (
    <div className="admin-page">
      <div className="articles">
        <div className="articles__list">
          <div className="articles_list__title">Интерьеры</div>
          {listInteriors}
          <div className="form-control__button">Добавить</div>
        </div>
        <div className="articles__list">
          <div className="articles_list__title">Мебель</div>
          {listFurniture}
          <div className="form-control__button">Добавить</div>
        </div>
      </div>
    </div>
  );
}

export default compose(withAllInteriors, withAllFurniture)(AdminPage);
