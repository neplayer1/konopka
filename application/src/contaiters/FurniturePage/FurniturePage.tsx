import React, {FC} from 'react';
import {routes} from 'utils/routes';
import {CatalogPage} from "components/CatalogPage/CatalogPage";
import {useQuery} from "@apollo/react-hooks";
import {GET_ALL_FURNITURE, T_GET_ALL_FURNITURE} from "queries/furniture";

export const FurniturePage: FC = () => {
  const {loading, error, data} = useQuery<T_GET_ALL_FURNITURE>(GET_ALL_FURNITURE);
  const {furniture} = data!;

  return (
    <>
      {
        !loading &&
        <div className="furniture-page">
          <CatalogPage data={furniture} baseUrl={routes.furniture}/>
        </div>
      }
    </>
  )
}