import React, {FC, useCallback} from 'react';
import {routes} from 'utils/routes';
import {CatalogPageItem} from "components/CatalogPageItem/CatalogPageItem";
import {compose} from "react-apollo";
import {interiorById, nextInteriorById, prevInteriorById} from "queries/interiors";
import {History} from "history";
import {TInterior} from "types/common";

type TProps = {
  history: History;
  current: TInterior;
  prev: TInterior;
  next: TInterior;
}

const InteriorsPageItem: FC<TProps> = (props) => {
  console.log('InteriorsPageItem render', props);
  const {history, current, prev, next} = props;

  const loaded = !!current && prev !== undefined && next !== undefined;

  const handlePrevItem = useCallback(() => {
    history.push(routes.interiors({id: prev._id}));
  }, [history, prev]);

  const handleNextItem = useCallback(() => {
    history.push(routes.interiors({id: next._id}));
  }, [history, next]);

  return <>
    {loaded && <CatalogPageItem currentItem={current} prevItem={prev} nextItem={next} handlePrevItem={handlePrevItem} handleNextItem={handleNextItem}/>}
  </>
}

export default compose(interiorById, prevInteriorById, nextInteriorById)(InteriorsPageItem);