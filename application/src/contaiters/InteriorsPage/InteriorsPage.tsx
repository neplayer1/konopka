import React, {FC, useMemo} from 'react';
import {routes} from 'utils/routes';
import {CatalogPage} from "components/CatalogPage/CatalogPage";
import {compose} from "react-apollo";
import {withAllInteriors} from "queries/interiors";
import {TInterior} from "types/common";

type TProps = {
    allInteriors: TInterior[];
}

const InteriorsPage: FC<TProps> = (props) => {
    const {allInteriors = []} = props;

    return useMemo(() => (
        <div className="interiors-page">
            <CatalogPage data={allInteriors} baseUrl={routes.interiors}/>
        </div>
    ),[allInteriors])
};

export default compose(withAllInteriors)(InteriorsPage)