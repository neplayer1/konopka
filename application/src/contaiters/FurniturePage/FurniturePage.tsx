import React, {FC} from 'react';
import {routes} from 'utils/routes';
import {CatalogPage} from "../../components/CatalogPage/CatalogPage";
import {compose} from "react-apollo";
import {allFurniture} from "../../queries/furniture";
import {TInterior} from "../../queries/interiors";

type TProps = {
    allFurniture: TInterior[];
}

const FurniturePage: FC<TProps> = (props) => {
    console.log(props);
    const {allFurniture = []} = props;

    let chunkCount = -1;
    let n = 0;
    const chunkImages = allFurniture.reduce((result: Array<any>, item: any, i: any) => {
        let chunkIndex = Math.floor((i - n * 2) / 3) + n;
        if (chunkCount === 2 * n + 2 + n) {
            n++;
            chunkIndex = chunkCount;
        }

        if (!result[chunkIndex]) {
            chunkCount++;
            result[chunkIndex] = [];
        }

        result[chunkIndex].push(item);
        return result
    }, []);

    let k = 0;
    // @ts-ignore
    const chunkChunkImages = chunkImages.reduce((result: Array<any>, chunk: any, i: any) => {
        result[i] = [];
        if (chunk.length === 3) {
            if (i === 3 * k + 1) {
                k++;
                result[i].push(chunk.reduce((result2: Array<any>, item: any, j: any) => {
                    if (j !== 2) {
                        result2.push(item);
                    }
                    return result2;
                }, []));
                result[i].push(chunk[2])
            } else {
                result[i].push(chunk[0])
                result[i].push(chunk.reduce((result2: Array<any>, item: any, j: any) => {
                    if (j !== 0) {
                        result2.push(item);
                    }
                    return result2;
                }, []));
            }
        } else {
            result[i].push(...chunk)
        }
        return result;
    }, []);

    return (
        <div className="furniture-page">
            <CatalogPage chunkChunkImages={chunkChunkImages} baseUrl={routes.furniture}/>
        </div>
    )
}

export default compose(allFurniture)(FurniturePage)