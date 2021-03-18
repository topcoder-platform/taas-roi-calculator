import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Landing from '../containers/Landing';
import CalculationResult from '../containers/CalculationResult';

const Routes = () => (
  <Switch>
    <Route path="/" render={() => <Landing />} exact />
    <Route path="/result" render={() => <CalculationResult />} />
    <Route path="">
      <Redirect to="/" />
    </Route>
  </Switch>
);

export default Routes;
