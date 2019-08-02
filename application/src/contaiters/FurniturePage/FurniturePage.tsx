import React, {FC} from 'react';
import {routes} from 'utils/routes';
import {CatalogPage} from "components/CatalogPage/CatalogPage";
import {compose} from "react-apollo";
import {withAllFurniture} from "queries/furniture";
import {TInterior} from "types/common";

type TProps = {
    allFurniture: TInterior[];
}

const FurniturePage: FC<TProps> = (props) => {
    const {allFurniture = []} = props;

    return (
        <div className="furniture-page">
            <CatalogPage data={allFurniture} baseUrl={routes.furniture}/>
        </div>
    )
}

export default compose(withAllFurniture)(FurniturePage)