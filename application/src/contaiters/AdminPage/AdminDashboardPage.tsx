import React, {FC, useCallback, useMemo} from 'react';
import {GET_ALL_INTERIORS, T_GET_ALL_INTERIORS} from "queries/interiors";
import {Link} from 'react-router-dom';
import {routes} from "utils/routes";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {GET_ALL_FURNITURE, T_GET_ALL_FURNITURE} from "queries/furniture";
import {DELETE_INTERIOR} from "queries/mutations";
import {useModal} from "hooks/useModal";

export const AdminDashboardPage: FC = () => {
  const {loading: loadingInteriors, error: errorInteriors, data: dataInteriors} = useQuery<T_GET_ALL_INTERIORS>(GET_ALL_INTERIORS);
  const {loading: loadingFurniture, error: errorFurniture, data: dataFurniture} = useQuery<T_GET_ALL_FURNITURE>(GET_ALL_FURNITURE);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [deleteInterior, { loading: deleteLoading, error: deleteError, called: deleteCalled }] = useMutation(DELETE_INTERIOR, {onCompleted: () => openModal(false)});
  const {initModal, openModal} = useModal();
  const interiors = null || (dataInteriors && dataInteriors.interiors);
  const furniture = null || (dataFurniture && dataFurniture.furniture);

  const handleOpenModal = useCallback(({_id, previewUrl, picturesUrl}) => {
    const actionParams  = {
      variables: {
        _id,
        previewUrl,
        picturesUrl,
      },
      refetchQueries: [ { query: GET_ALL_INTERIORS }],
    };

    initModal('Вы действительно хотите удалить?', () => deleteInterior(actionParams));
    openModal(true);
  }, [deleteInterior, initModal, openModal]);

  const listInteriors = useMemo(() => {
    if (errorInteriors) {
      return errorInteriors.message
    }
    return interiors && interiors.map((interior) => {
      return (
        <div key={interior._id} className="articles_list__item">
          <div className="articles_list_item__name">{interior.nameRu}</div>
          <Link className="articles_list_item__btn articles_list_item__btn--edit" to={routes.adminEditInterior({id: interior._id})}>Редактрировать</Link>
          <div className="articles_list_item__btn articles_list_item__btn--delete" onClick={() => handleOpenModal(interior)}>Удалить</div>
        </div>
      )
    });
  }, [errorInteriors, handleOpenModal, interiors]);

  const listFurniture = useMemo(() => {
    if (errorFurniture) {
      return errorFurniture.message
    }
    return furniture && furniture.map((furnitur) => {
      return (
        <div key={furnitur._id} className="articles_list__item">
          <div className="articles_list_item__name">{furnitur.nameRu}</div>
          <div className="articles_list_item__btn articles_list_item__btn--edit">Редактрировать</div>
          <div className="articles_list_item__btn articles_list_item__btn--delete">Удалить</div>
        </div>
      )
    });
  }, [errorFurniture, furniture]);

  return (
    <div className="admin-page">
      <div className="articles">
        <div className="articles__list">
          <div className="articles_list__title">Интерьеры</div>
          {!loadingInteriors && listInteriors}
          {!errorInteriors && <Link className="form-control__button" to={routes.adminAddInterior()}>Добавить</Link>}
        </div>
        <div className="articles__list">
          <div className="articles_list__title">Мебель</div>
          {!loadingFurniture && listFurniture}
          {!errorFurniture && <div className="form-control__button">Добавить</div>}
        </div>
      </div>
    </div>
  );
}