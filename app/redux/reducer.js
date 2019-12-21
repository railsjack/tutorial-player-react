import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'

import App from '../modules/AppState';
import Main from '../modules/Home/_reducers/home_reducer';
import PlayInfo from '../modules/Home/_reducers/playinfo_reducer';

const createRootReducer = history => combineReducers({
  router: connectRouter(history),
  App,
  Main,
  PlayInfo
});

export default createRootReducer;
