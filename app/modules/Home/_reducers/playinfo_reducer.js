import { SET_PLAY_INFO, GO_NEXT_PLAY } from './playinfo_actions';
import Helper from '../../../utils/helper';
import VideoManager from '../Model/VideoListManager';

const initialState = {
  src: '',
  subtitle: '',
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
      const videoList = VideoManager.getList();
      let playIndex = state.playIndex;
      console.log('playInfo reducer', playIndex, videoList.length)
      if (playIndex < videoList.length - 1) {
        const src = state.srcBase + '/' + videoList[playIndex+1].mp4;
        const playInfo = {
          ...state.playInfo,
          autoPlay: true,
          playIndex: playIndex+1,
          src,
          title: Helper.getHumanTitle(videoList[playIndex+1].subtitle)
        };
        Helper.setConf(src, 0);
        console.log('playInfo reducer', playInfo)
        return {
          ...state,
          status: GO_NEXT_PLAY.SUCCESS,
          ...playInfo
        };
      } else return state;
      break;
    default:
      return state;
      break;
  }
};
