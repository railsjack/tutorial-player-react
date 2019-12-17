import { createTypes, createAction } from '../../../utils/actions';

const SET_DEFAULT_PATH = createTypes('PLAYER_SET_DEFAULT_PATH');
const SET_VIDEO_LIST = createTypes('PLAYER_SET_VIDEO_LIST');

const setListPath = listPath => {
  return dispatch => {
    const setDefaultPathAction = {
      do: () => createAction(SET_DEFAULT_PATH.DOING, {}),
      success: (listPath: string) =>
        createAction(SET_DEFAULT_PATH.SUCCESS, { listPath }),
      failed: (error: any) => createAction(SET_DEFAULT_PATH.FAILED, { error })
    };

    try {
      dispatch(setDefaultPathAction.success(listPath));
    } catch (error) {
      dispatch(setDefaultPathAction.failed(error));
    }
  };
};


const setVideoList = videoList => {
  return dispatch => {
    const setDefaultPathAction = {
      do: () => createAction(SET_VIDEO_LIST.DOING, {}),
      success: (videoList: any) =>
        createAction(SET_VIDEO_LIST.SUCCESS, { videoList }),
      failed: (error: any) => createAction(SET_VIDEO_LIST.FAILED, { error })
    };

    try {
      dispatch(setDefaultPathAction.success(videoList));
    } catch (error) {
      dispatch(setDefaultPathAction.failed(error));
    }
  };
};

export { SET_DEFAULT_PATH, setListPath, SET_VIDEO_LIST, setVideoList };
