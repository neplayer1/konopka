import React, {FC} from 'react';
import {useMemo} from "react";
import {TFurnitureParams, TInteriorsParams} from "utils/routes";
import {CatalogPageImage} from "./styled/CatalogPageImage";
import {useCurrentLang} from "hooks/useCurrentLang";
import {TInterior} from "types/common";

type TProps = {
  data: TInterior[];
  baseUrl: ({id}: TInteriorsParams | TFurnitureParams) => string;
}
export const CatalogPage: FC<TProps> = ({data, baseUrl}) => {
  const isRu = useCurrentLang();
  const catalog = useMemo(() => {
    return data.map((item: TInterior) => {
      return <CatalogPageImage key={item._id} label={isRu ? item.nameRu : item.nameEn} url={baseUrl({id: item._id})} imageSrc={item.previewUrl}/>
    });
  }, [baseUrl, data, isRu]);

  return (
    <div className="catalog">
      {catalog}
    </div>
  )
}