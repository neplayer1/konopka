import React, {FC} from 'react';
import {routes} from 'utils/routes';
import {CatalogPage} from "components/CatalogPage/CatalogPage";
import {compose} from "react-apollo";
import {allInteriors} from "queries/interiors";
import {TInterior} from "types/common";

type TProps = {
    allInteriors: TInterior[];
}

const InteriorsPage: FC<TProps> = (props) => {
    const {allInteriors = []} = props;

    return (
        <div className="interiors-page">
            <CatalogPage data={allInteriors} baseUrl={routes.interiors}/>
        </div>
    )
};

export default compose(allInteriors)(InteriorsPage)