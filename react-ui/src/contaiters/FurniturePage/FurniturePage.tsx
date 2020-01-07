import React, {FC, useMemo} from 'react';
import {routes} from 'utils/routes';
import {CatalogPage} from "components/CatalogPage/CatalogPage";
import {useQuery} from "@apollo/react-hooks";
import {GET_ALL_FURNITURE, T_GET_ALL_FURNITURE} from "queries/furniture";

export const FurniturePage: FC = () => {
  const {loading, error, data} = useQuery<T_GET_ALL_FURNITURE>(GET_ALL_FURNITURE);
  const furniture = null || (data && data.furniture);

  return useMemo(() => (
    <>
      {!furniture && <div>{error && error.message}</div> }
      {
        !loading && furniture &&
        <div className="furniture-page">
          <CatalogPage data={furniture} baseUrl={routes.furniture}/>
        </div>
      }
    </>
  ), [error, furniture, loading])
}