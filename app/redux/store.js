import { applyMiddleware, createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import createRootReducer from './reducer';
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

const enhancers = [
  applyMiddleware(
    thunkMiddleware,
    promiseMiddleware,
    routerMiddleware(history),
    createLogger({
      collapsed: true,
      // eslint-disable-next-line no-undef
      predicate: () => window.__DEV__,
    }),
  ),
];

/* eslint-disable no-undef */
const composeEnhancers =
  (window.__DEV__ &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
/* eslint-enable no-undef */

const enhancer = composeEnhancers(...enhancers);

const persistConfig = {
  key: 'router',
  storage,
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));
export const store = createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
