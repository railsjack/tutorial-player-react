import { SET_DEFAULT_PATH } from './_actions';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_DEFAULT_PATH.DOING:
      return { ...state, status: SET_DEFAULT_PATH.DOING, listPath: null };
      break;

    case SET_DEFAULT_PATH.SUCCESS:
      return {
        ...state,
        status: SET_DEFAULT_PATH.SUCCESS,
        listPath: action.listPath
      };
      break;

    case SET_DEFAULT_PATH.FAILED:
      return { ...state, status: SET_DEFAULT_PATH.FAILED, listPath: null };
      break;

    default:
      return state;
      break;
  }
};
