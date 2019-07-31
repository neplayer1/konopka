import React, {FC} from 'react';
import {Switch, Route} from 'react-router';
import {routes} from 'utils/routes';
import {IndexPage} from 'contaiters/IndexPage/IndexPage';
import InteriorsPage from 'contaiters/InteriorsPage/InteriorsPage';
import FurniturePage from 'contaiters/FurniturePage/FurniturePage';
import {AboutPage} from 'contaiters/AboutPage/AboutPage';
import InteriorsPageItem from "../InteriorsPageItem/InteriorsPageItem";
import FurniturePageItem from "../FurniturePageItem/FurniturePageItem";
import AdminPage from "../AdminPage/AdminPage";

export const AppBody: FC = () => (
    <div className="main">
        <Switch>
            <Route path="/" exact component={IndexPage}/>
            <Route path={routes.interiors({})} exact component={InteriorsPage}/>
            <Route path={routes.interiorsPattern()} exact component={InteriorsPageItem}/>
            <Route path={routes.furniture({})} exact component={FurniturePage}/>
            <Route path={routes.furniturePattern()} exact component={FurniturePageItem}/>
            <Route path={routes.about()} exact component={AboutPage}/>
            <Route path={routes.admin()} exact component={AdminPage}/>
        </Switch>
    </div>
);