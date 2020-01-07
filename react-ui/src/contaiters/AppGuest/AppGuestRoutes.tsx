import React, {FC} from 'react';
import {Route, Switch} from "react-router";
import {IndexPage} from "contaiters/IndexPage/IndexPage";
import {routes} from "utils/routes";
import {InteriorsPage} from "contaiters/InteriorsPage/InteriorsPage";
import {InteriorsPageItem} from "contaiters/InteriorsPageItem/InteriorsPageItem";
import {FurniturePage} from "contaiters/FurniturePage/FurniturePage";
import {FurniturePageItem} from "contaiters/FurniturePageItem/FurniturePageItem";
import {AboutPage} from "contaiters/AboutPage/AboutPage";
import {AdminLoginPage} from "contaiters/AdminPage/AdminLoginPage";
import {Location} from "history";
import {App404} from "contaiters/App404/App404";

type TProps = {
  location: Location;
}

export const AppGuestRoutes: FC<TProps> = ({location}) => (
  <Switch location={location}>
    <Route path="/" exact component={IndexPage}/>
    <Route path={routes.interiors({})} exact component={InteriorsPage}/>
    <Route path={routes.interiorsPattern()} exact component={InteriorsPageItem}/>
    <Route path={routes.furniture({})} exact component={FurniturePage}/>
    <Route path={routes.furniturePattern()} exact component={FurniturePageItem}/>
    <Route path={routes.about()} exact component={AboutPage}/>
    <Route path={routes.admin()} exact component={AdminLoginPage}/>
    <Route component={App404}/>
  </Switch>
);
