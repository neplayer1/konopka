import React, {FC, useCallback} from 'react';
import {routes} from 'utils/routes';
import {CatalogPage} from "components/CatalogPage/CatalogPage";
import {compose, graphql} from "react-apollo";
import {addInteriorMutation} from "queries/mutations";
import {allInteriors, TInterior} from "queries/interiors";

type TProps = {
    allInteriors: TInterior[];
}

const InteriorsPage: FC<TProps> = (props) => {
    console.log(props)
    const {allInteriors = []} = props;

    const add = useCallback(() => {
        // const name = 'имя';
        // const type = 'тип';
        // const year = 2020;
        // const description = 'описание';
        // props.mutate({
        //     variables: {name, type, year, description},
        //     refetchQueries: [ { query: interiorsQuery }]
        // });
    }, [])

    let chunkCount = -1;
    let n = 0;
    const chunkImages = allInteriors.reduce((result: Array<any>, item: any, i: any) => {
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
        <div className="interiors-page">
            <CatalogPage chunkChunkImages={chunkChunkImages} baseUrl={routes.interiors}/>
            <button onClick={add}>add interior</button>
        </div>
    )
}

export default compose(allInteriors, graphql(addInteriorMutation))(InteriorsPage)