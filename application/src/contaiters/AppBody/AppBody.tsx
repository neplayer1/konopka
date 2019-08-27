import React, {FC} from 'react';
import {Route, Switch, withRouter} from 'react-router';
import {routes} from 'utils/routes';
import {InteriorsPage} from 'contaiters/InteriorsPage/InteriorsPage';
import SwitchTransition from "react-transition-group/SwitchTransition";
import CSSTransition from "react-transition-group/CSSTransition";
import {Location} from 'history';
import {PAGE_ANIMATION_DURATION} from "constants/common";
import ScrollToTop from 'hoc/hocScrollToTop';
import {InteriorsPageItem} from "contaiters/InteriorsPageItem/InteriorsPageItem";
import {AdminPage} from "contaiters/AdminPage/AdminPage";
import {IndexPage} from "contaiters/IndexPage/IndexPage";
import {FurniturePage} from "contaiters/FurniturePage/FurniturePage";
import {FurniturePageItem} from "contaiters/FurniturePageItem/FurniturePageItem";
import {AboutPage} from "contaiters/AboutPage/AboutPage";
import {AdminAddInteriorPage} from "contaiters/AdminPage/AdminAddInteriorPage";
import {AdminEditInteriorPage} from "contaiters/AdminPage/AdminEditInteriorPage";

type TProps = {
  location: Location;
}

const AppBody: FC<TProps> = ({location}) => {
  return (
    <div className="wrapper">
      <div className="main">
        <ScrollToTop>
          <SwitchTransition>
            <CSSTransition key={location.pathname} classNames="fade-out" timeout={PAGE_ANIMATION_DURATION}>
              <Switch location={location}>
                <Route path="/" exact component={IndexPage}/>
                <Route path={routes.interiors({})} exact component={InteriorsPage}/>
                <Route path={routes.interiorsPattern()} exact component={InteriorsPageItem}/>
                <Route path={routes.furniture({})} exact component={FurniturePage}/>
                <Route path={routes.furniturePattern()} exact component={FurniturePageItem}/>
                <Route path={routes.about()} exact component={AboutPage}/>
                <Route path={routes.admin()} exact component={AdminPage}/>
                <Route path={routes.adminAddInterior()} exact component={AdminAddInteriorPage}/>
                <Route path={routes.adminEditInteriorPattern()} exact component={AdminEditInteriorPage}/>
              </Switch>
            </CSSTransition>
          </SwitchTransition>
        </ScrollToTop>
      </div>
    </div>
  );
}

export default withRouter(AppBody);