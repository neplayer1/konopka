import React, {FC} from 'react';
import {useMemo} from "react";
import {TFurnitureParams, TInteriorsParams} from "../../utils/routes";
import {CatalogPageImage} from "./styled/CatalogPageImage";
import {TInterior} from "../../queries/interiors";
import {TFurniture} from "../../queries/furniture";

type TProps = {
    chunkChunkImages: any;
    baseUrl: ({id}: TInteriorsParams | TFurnitureParams) => string;
}
export const CatalogPage: FC<TProps> = ({chunkChunkImages, baseUrl}) => {
    const catalog = useMemo(() => {
        return chunkChunkImages.map((chunk: any, i: number) => {
            return (
                <div key={i}>
                    {
                        chunk.map((chunkInterior: TInterior | TFurniture, j: number) => {
                            if (Array.isArray(chunkInterior)) {
                                return (
                                    <div key={chunkInterior[j]._id}>
                                        {
                                            chunkInterior.map((interior: TInterior | TFurniture) => {
                                                return (
                                                    <CatalogPageImage key={interior._id} label={interior.name} url={baseUrl({id: interior._id})}/>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            } else {
                                return (
                                    <CatalogPageImage key={chunkInterior._id} label={chunkInterior.name} url={baseUrl({id: chunkInterior._id})}/>
                                )
                            }
                        })
                    }
                </div>
            );
        });
    }, [baseUrl, chunkChunkImages]);

    return (
        <div className="catalog">
            {catalog}
        </div>
    )
}