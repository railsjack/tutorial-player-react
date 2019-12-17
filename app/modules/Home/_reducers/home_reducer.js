import { SET_DEFAULT_PATH, SET_VIDEO_LIST } from './home_actions';

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


    case SET_VIDEO_LIST.DOING:
      return { ...state, status: SET_VIDEO_LIST.DOING, videoList: null };
      break;

    case SET_VIDEO_LIST.SUCCESS:
      return {
        ...state,
        status: SET_VIDEO_LIST.SUCCESS,
        videoList: action.videoList
      };
      break;

    case SET_VIDEO_LIST.FAILED:
      return { ...state, status: SET_VIDEO_LIST.FAILED, videoList: null };
      break;

    default:
      return state;
      break;
  }
};
