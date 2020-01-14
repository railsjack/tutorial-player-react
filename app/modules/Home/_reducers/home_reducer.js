import { SET_DEFAULT_PATH, REMOVE_DEFAULT_PATH } from './home_actions';
const initialState = {
  defaultPath: '',
  listPaths: [],
  videoInfo: {},
  status: ''
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DEFAULT_PATH.DOING:
      return {
        ...state,
        status: SET_DEFAULT_PATH.DOING,
        videoInfo: {},
        defaultPath: ''
      };
      break;

    case SET_DEFAULT_PATH.INITIAL:
      return {
        ...state,
        status: SET_DEFAULT_PATH.INITIAL
      };
      break;
    case SET_DEFAULT_PATH.SUCCESS:
      let newListPaths = state.listPaths;
      const alreadyExists =
        state.listPaths && state.listPaths.indexOf(action.defaultPath) > -1;
      !alreadyExists && newListPaths.push(action.defaultPath);
      return {
        ...state,
        status: SET_DEFAULT_PATH.SUCCESS,
        defaultPath: action.defaultPath,
        listPaths: newListPaths,
        videoInfo: {}
      };
      break;

    case SET_DEFAULT_PATH.FAILED:
      return { ...state, status: SET_DEFAULT_PATH.FAILED, defaultPath: '' };
      break;

    case REMOVE_DEFAULT_PATH.SUCCESS:
      let newListPaths2 = state.listPaths;
      console.log('action.defaultPath', action.defaultPath)
      const position = state.listPaths.indexOf(action.defaultPath);
      if (position > -1) newListPaths2.splice(position, 1);
      return {
        ...state,
        status: REMOVE_DEFAULT_PATH.SUCCESS,
        defaultPath: '',
        listPaths: newListPaths2,
        videoInfo: {}
      };
      break;
    default:
      return state;
      break;
  }
};
