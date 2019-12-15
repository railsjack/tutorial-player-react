// @flow
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import Routes from '../Routes';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor, history } from '../redux/store';

const Root: FC<Props> = props => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
      {/* <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </PersistGate> */}
    </Provider>
  );
};

export default Root;
