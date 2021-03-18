import React, { useEffect } from 'react';
import {
  Switch, Route, Redirect, useLocation,
} from 'react-router-dom';
import Landing from '../containers/Landing';
import CalculationResult from '../containers/CalculationResult';

const Routes = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Switch>
      <Route path="/" render={() => <Landing />} exact />
      <Route path="/result" render={() => <CalculationResult />} />
      <Route path="">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Routes;
