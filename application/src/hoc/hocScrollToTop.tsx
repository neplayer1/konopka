import React, { useEffect, FC } from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import {PAGE_ANIMATION_DURATION} from "constants/common";

const ScrollToTop: FC<RouteComponentProps> = ({ location: { pathname }, children }) => {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, PAGE_ANIMATION_DURATION)
  }, [pathname]);

  return <>{children}</>;
};

export default withRouter(ScrollToTop);
