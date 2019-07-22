import React, {FC, useCallback} from 'react';
import {routes} from 'utils/routes';
import {CatalogPageItem} from "components/CatalogPageItem/CatalogPageItem";
import {compose} from "react-apollo";
import {interiorById, nextInteriorById, prevInteriorById, TInterior} from "queries/interiors";
import {History} from "history";

type TProps = {
    history: History;
    current: TInterior;
    prev: TInterior;
    next: TInterior;
}

const InteriorsPageItem: FC<TProps> = (props) => {
    console.log(props)
    const {history, current, prev, next} = props;

    const handlePrevItem = useCallback(() => {
        if (prev) {
            history.push(routes.interiors({id: prev._id}));
        }
    }, [history, prev]);

    const handleNextItem = useCallback(() => {
        if (next) {
            history.push(routes.interiors({id: next._id}));
        }
    }, [history, next]);

    return (
        <CatalogPageItem currentItem={current} prevItem={prev} nextItem={next} handlePrevItem={handlePrevItem} handleNextItem={handleNextItem}/>
    );
}


export default compose(interiorById, prevInteriorById, nextInteriorById)(InteriorsPageItem);