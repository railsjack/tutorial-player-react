import {configureStore} from '../config/store/configureStore';

const store = configureStore();
export const getReduxValue = (stateKey: string = '') => {
  const state: any = store.getState();
  return state[stateKey];
};

export const setReduxValue = async (action: any, value: any = {}) => {
  // @ts-ignore
  await store.dispatch(action(value));
};

export const setReduxValueWithKey = async (action: any, key: string, value: any = {}) => {
  // @ts-ignore
  await store.dispatch(action(key, value));
};

export const getReduxValueWithKey = (key: string) => {
  return getReduxValue(key);
};

export const getAuthDataFromRedux = () => {
  return getReduxValue('auth');
};

export const getUserDataFromRedux = () => {
  return getAuthDataFromRedux()['User'];
};

export const getAuthErrorFromRedux = () => {
  return getAuthDataFromRedux()['error'];
};

export const getFirebase_IDToken = () => {
  return getUserDataFromRedux()['Firebase_IDToken'];
};
