import React, {FC, useCallback} from 'react';
import {routes} from 'utils/routes';
import {CatalogPageItem} from "components/CatalogPageItem/CatalogPageItem";
import {History} from "history";
import {compose} from "react-apollo";
import {furnitureById, nextFurnitureById, prevFurnitureById} from "queries/furniture";
import {TFurniture} from "types/common";

type TProps = {
    history: History;
    current: TFurniture;
    prev: TFurniture;
    next: TFurniture;
}

const FurniturePageItem: FC<TProps> = (props) => {
    const {history, current, prev, next} = props;

    const handlePrevItem = useCallback(() => {
        if (prev) {
            history.push(routes.furniture({id: prev._id}));
        }
    }, [history, prev]);

    const handleNextItem = useCallback(() => {
        if (next) {
            history.push(routes.furniture({id: next._id}));
        }
    }, [history, next]);

    return (
        <CatalogPageItem currentItem={current} prevItem={prev} nextItem={next} handlePrevItem={handlePrevItem} handleNextItem={handleNextItem}/>
    );
}

export default compose(furnitureById, prevFurnitureById, nextFurnitureById)(FurniturePageItem);