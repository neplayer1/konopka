import React, {FC, useMemo} from 'react';
import {routes} from 'utils/routes';
import {CatalogPage} from "components/CatalogPage/CatalogPage";
import {GET_ALL_INTERIORS, T_GET_ALL_INTERIORS} from "queries/interiors";
import {useQuery} from "@apollo/react-hooks";

export const InteriorsPage: FC = () => {
  const {loading, error, data} = useQuery<T_GET_ALL_INTERIORS>(GET_ALL_INTERIORS);
  const interiors = null || (data && data.interiors);

  return useMemo(() => (
    <>
      {!interiors && <div>{error && error.message}</div>}
      {
        !loading && interiors &&
        <div className="interiors-page">
          <CatalogPage data={interiors} baseUrl={routes.interiors}/>
        </div>
      }
    </>
  ), [error, interiors, loading])
};
