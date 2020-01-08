import React, {FC, useCallback} from 'react';
import {routes, TInteriorMatch} from 'utils/routes';
import {CatalogPageItem} from "components/CatalogPageItem/CatalogPageItem";
import {GET_INTERIOR_BY_ID, GET_NEXT_INTERIOR_BY_ID, GET_PREV_INTERIOR_BY_ID, T_GET_INTERIOR_BY_ID, T_GET_NEXT_INTERIOR_BY_ID, T_GET_PREV_INTERIOR_BY_ID, T_VAR_GET_INTERIOR_BY_ID, T_VAR_NEXT_INTERIOR_BY_ID, T_VAR_PREV_INTERIOR_BY_ID} from "queries/interiors";
import {History} from "history";
import {useQuery} from "@apollo/react-hooks";
import {match} from "react-router";

type TProps = {
  history: History;
  match: match<TInteriorMatch>;
}

export const InteriorsPageItem: FC<TProps> = (props) => {
  const {match, history} = props;
  const {loading, data} = useQuery<T_GET_INTERIOR_BY_ID, T_VAR_GET_INTERIOR_BY_ID>(GET_INTERIOR_BY_ID, {
    variables: {_id: match.params.id}
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {loading: loadingPrev, error: errorPrev, data: dataPrev} = useQuery<T_GET_PREV_INTERIOR_BY_ID, T_VAR_PREV_INTERIOR_BY_ID>(GET_PREV_INTERIOR_BY_ID, {
    variables: {_id: match.params.id}
  });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {loading: loadingNext, error: errorNext, data: dataNext} = useQuery<T_GET_NEXT_INTERIOR_BY_ID, T_VAR_NEXT_INTERIOR_BY_ID>(GET_NEXT_INTERIOR_BY_ID, {
    variables: {_id: match.params.id}
  });
  const interiorById = null || (data && data.interiorById);
  // const {interiorById} = data!;
  const interiorPrevious = null || (dataPrev && dataPrev.interiorPrevious);
  // const {interiorPrevious} = dataPrev!;
  const interiorNext = null || (dataNext && dataNext.interiorNext);
  // const {interiorNext} = dataNext!;

  const loaded = !loading && !loadingPrev && !loadingNext;

  const handlePrevItem = useCallback(() => {
    history.push(routes.interiors({id: interiorPrevious!._id}));
  }, [history, interiorPrevious]);

  const handleNextItem = useCallback(() => {
    history.push(routes.interiors({id: interiorNext!._id}));
  }, [history, interiorNext]);

  return <>
    {loaded && <CatalogPageItem currentItem={interiorById!} prevItem={interiorPrevious!} nextItem={interiorNext!} handlePrevItem={handlePrevItem} handleNextItem={handleNextItem}/>}
  </>
}