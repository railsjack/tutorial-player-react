import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes_map.json';
import Home from '../../pages/Home';

export default function Routes() {
  return (
    <Switch>
      <Route path={routes.COUNTER} component={Home} />
      <Route path={routes.HOME} component={Home} />
    </Switch>
  );
}
