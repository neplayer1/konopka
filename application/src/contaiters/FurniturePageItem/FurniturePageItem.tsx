import React, {FC, useCallback} from 'react';
import {routes, TFurnitureMatch} from 'utils/routes';
import {CatalogPageItem} from "components/CatalogPageItem/CatalogPageItem";
import {History} from "history";
import {useQuery} from "@apollo/react-hooks";
import {match} from "react-router";
import {GET_FURNITURE_BY_ID, GET_NEXT_FURNITURE_BY_ID, GET_PREV_FURNITURE_BY_ID, T_GET_FURNITURE_BY_ID, T_GET_NEXT_FURNITURE_BY_ID, T_GET_PREV_FURNITURE_BY_ID, T_VAR_GET_FURNITURE_BY_ID, T_VAR_NEXT_FURNITURE_BY_ID, T_VAR_PREV_FURNITURE_BY_ID} from "queries/furniture";

type TProps = {
  history: History;
  match: match<TFurnitureMatch>;
}

export const FurniturePageItem: FC<TProps> = (props) => {
  const {match, history} = props;
  const {loading, data} = useQuery<T_GET_FURNITURE_BY_ID, T_VAR_GET_FURNITURE_BY_ID>(GET_FURNITURE_BY_ID, {
    variables: {_id: match.params.id}
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {loading: loadingPrev, error: errorPrev, data: dataPrev} = useQuery<T_GET_PREV_FURNITURE_BY_ID, T_VAR_PREV_FURNITURE_BY_ID>(GET_PREV_FURNITURE_BY_ID, {
    variables: {_id: match.params.id}
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {loading: loadingNext, error: errorNext, data: dataNext} = useQuery<T_GET_NEXT_FURNITURE_BY_ID, T_VAR_NEXT_FURNITURE_BY_ID>(GET_NEXT_FURNITURE_BY_ID, {
    variables: {_id: match.params.id}
  });
  const {furnitureById} = data!;
  const {furniturePrevious} = dataPrev!;
  const {furnitureNext} = dataNext!;

  const loaded = !loading && !loadingPrev && !loadingNext;

  const handlePrevItem = useCallback(() => {
    if (furniturePrevious) {
      history.push(routes.furniture({id: furniturePrevious._id}));
    }
  }, [history, furniturePrevious]);

  const handleNextItem = useCallback(() => {
    if (furnitureNext) {
      history.push(routes.furniture({id: furnitureNext._id}));
    }
  }, [history, furnitureNext]);

  return (
    <>
      {loaded && <CatalogPageItem currentItem={furnitureById} prevItem={furniturePrevious} nextItem={furnitureNext} handlePrevItem={handlePrevItem} handleNextItem={handleNextItem}/>}
    </>
  );
}