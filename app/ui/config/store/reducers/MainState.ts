import { Action } from 'redux';
import { DECREMENT_COUNTER, INCREMENT_COUNTER } from '../actions/MainState';

export default function mainState(state = {}, action: Action<string>) {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { test: 2 };
    case DECREMENT_COUNTER:
      return { test: 2 };
    default:
      return state;
  }
}
