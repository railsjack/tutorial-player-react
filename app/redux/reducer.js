import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'

import App from '../modules/AppState';
import Main from '../modules/Home/_reducers/home_reducer';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  App,
  Main,
});

export default createRootReducer;
