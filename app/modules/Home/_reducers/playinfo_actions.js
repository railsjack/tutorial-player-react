import { createTypes, createAction } from '../../../utils/actions';

const SET_PLAY_INFO = createTypes('PLAYER_SET_PLAY_INFO');
const GO_NEXT_PLAY = createTypes('PLAYER_GO_NEXT_PLAY');

const setPlayInfo = playInfo => {
  return dispatch => {
    const setPlayInfoAction = {
      success: (playInfo: any) => createAction(SET_PLAY_INFO.SUCCESS, { playInfo }),
    };
    try {
      dispatch(setPlayInfoAction.success(playInfo));
    } catch (error) {
      dispatch(setPlayInfoAction.failed(error));
    }
  };
};

const goNextPlay = () => {
  return dispatch => {
    const goNextPlayAction = {
      success: () => createAction(GO_NEXT_PLAY.SUCCESS),
    };
    dispatch(goNextPlayAction.success());
  };
};

export {
  SET_PLAY_INFO,
  setPlayInfo,
  GO_NEXT_PLAY,
  goNextPlay
};
