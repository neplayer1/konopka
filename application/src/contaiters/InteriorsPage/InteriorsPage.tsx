import React, {FC} from 'react';
import {routes} from 'utils/routes';
import {CatalogPage} from "components/CatalogPage/CatalogPage";
import {compose} from "react-apollo";
import {allInteriors, TInterior} from "queries/interiors";

type TProps = {
    allInteriors: TInterior[];
}

const InteriorsPage: FC<TProps> = (props) => {
    const {allInteriors = []} = props;

    let chunkCount = -1;
    let n = 0;
    const chunkImages = allInteriors.reduce((result: Array<any>, item: TInterior, i: number) => {
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

    const chunkChunkImages = chunkImages.reduce((result: Array<any>, chunk: TInterior[], i: number) => {
        result[i] = [];
        if (chunk.length === 3) {
            if (i === 3 * k + 1) {
                k++;
                result[i].push(chunk.reduce((result2: Array<any>, item: TInterior, j: number) => {
                    if (j !== 2) {
                        result2.push(item);
                    }
                    return result2;
                }, []));
                result[i].push(chunk[2]);
            } else {
                result[i].push(chunk[0]);
                result[i].push(chunk.reduce((result2: Array<any>, item: TInterior, j: number) => {
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
        <div className="interiors-page">
            <CatalogPage chunkChunkImages={chunkChunkImages} baseUrl={routes.interiors}/>
        </div>
    )
};

export default compose(allInteriors)(InteriorsPage)