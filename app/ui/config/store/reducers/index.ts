import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import mainState from './MainState';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    mainState
  });
}
