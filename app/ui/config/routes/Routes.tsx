import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes_map.json';
import App from '../../containers/App';
import HomePage from '../../containers/HomePage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.COUNTER} component={HomePage} />
        <Route path={routes.HOME} component={HomePage} />
      </Switch>
    </App>
  );
}
