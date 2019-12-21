import { SET_PLAY_INFO, GO_NEXT_PLAY } from './playinfo_actions';
import Helper from '../../../utils/helper';
import VideoManager from '../Model/VideoListManager';

const initialState = {
  src: '',
  title: '',
  insteadTitle: '',
  hasVideo: false,
  autoPlay: false
};
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAY_INFO.SUCCESS:
      return {
        ...state,
        status: SET_PLAY_INFO.SUCCESS,
        ...action.playInfo
      };
      break;

    case GO_NEXT_PLAY.SUCCESS:
      console.log('state', state);
      console.log('action', action);
      const videoList = VideoManager.getList();
      const playIndex = state.playIndex;
      const playInfo = {
        autoPlay: true,
        playIndex: playIndex + 1,
        src: state.srcBase + '/' + videoList[playIndex + 1].mp4,
        title: Helper.getHumanTitle(videoList[playIndex + 1].subtitle),
      }
      return {
        ...state,
        status: GO_NEXT_PLAY.SUCCESS,
        ...playInfo
      };
      break;
    default:
      return state;
      break;
  }
};
