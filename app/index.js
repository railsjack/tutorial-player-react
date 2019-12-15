import React from 'react';
import ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
import { hot } from 'react-hot-loader';
import Root from './containers/RootRedux';
// import { configureStore, history } from './store/configureStore';
import './app.global.css';

// const store = configureStore();
window.__DEV__ = process.env.NODE_ENV !== 'production';
ReactDOM.render(
  <Root/>,
  document.getElementById('root')
);

const App = () => {
  // eslint-disable-next-line global-require
  const NextRoot = require('./containers/Root').default;
  ReactDOM.render(
    <NextRoot />,
    document.getElementById('root')
  );
};

export default hot(module)(App);