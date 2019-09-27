import React, {FC} from 'react';
import {Switch, withRouter} from 'react-router';
import SwitchTransition from "react-transition-group/SwitchTransition";
import CSSTransition from "react-transition-group/CSSTransition";
import {Location} from 'history';
import {PAGE_ANIMATION_DURATION} from "constants/common";
import ScrollToTop from 'hoc/hocScrollToTop';
import {AppGuestRoutes} from "contaiters/AppGuest/AppGuestRoutes";
import {AppAutorizedRoutes} from "contaiters/AppAutorized/AppAutorizedRoutes";
import {useAuth} from "hooks/useAuth";

type TProps = {
  location: Location;
}

const AppBody: FC<TProps> = ({location}) => {
  const {autorized} = useAuth();

  return (
    <div className="wrapper">
      <div className="main">
        <ScrollToTop>
          <SwitchTransition>
            <CSSTransition key={location.pathname} classNames="fade-out" timeout={PAGE_ANIMATION_DURATION}>
              <Switch location={location}>
                {
                  autorized ? <AppAutorizedRoutes location={location}/> : <AppGuestRoutes location={location}/>
                }
              </Switch>
            </CSSTransition>
          </SwitchTransition>
        </ScrollToTop>
      </div>
    </div>
  );
}

export default withRouter(AppBody);