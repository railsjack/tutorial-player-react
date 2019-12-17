import {
  SET_DEFAULT_PATH,
  SET_VIDEO_INFO
} from './home_actions';
const initialState = {
  defaultPath: '',
  videoInfo: {},
  status: '',
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

    case SET_DEFAULT_PATH.SUCCESS:
      return {
        ...state,
        status: SET_DEFAULT_PATH.SUCCESS,
        defaultPath: action.defaultPath,
        videoInfo: {}
      };
      break;

    case SET_DEFAULT_PATH.FAILED:
      return { ...state, status: SET_DEFAULT_PATH.FAILED, defaultPath: '' };
      break;

    case SET_VIDEO_INFO.DOING:
      return { ...state, status: SET_VIDEO_INFO.DOING, videoInfo: {} };
      break;

    case SET_VIDEO_INFO.SUCCESS:
      return {
        ...state,
        status: SET_VIDEO_INFO.SUCCESS,
        videoInfo: action.videoInfo
      };
      break;

    case SET_VIDEO_INFO.FAILED:
      return { ...state, status: SET_VIDEO_INFO.FAILED, videoInfo: {} };
      break;

    default:
      return state;
      break;
  }
};
