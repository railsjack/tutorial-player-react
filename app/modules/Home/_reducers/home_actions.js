import { createTypes, createAction } from '../../../utils/actions';
import TutorialAPI, { showError } from '../../../api/tutorial/web';

const SET_DEFAULT_PATH = createTypes('PLAYER_SET_DEFAULT_PATH');
const SET_VIDEO_INFO = createTypes('PLAYER_SET_VIDEO_INFO');

const setDefaultPath = (path, reCreate = true) => {
  return dispatch =>
    new Promise((resolve, eject) => {
      const setDefaultPathAction = {
        init: () => createAction(SET_DEFAULT_PATH.INITIAL, {}),
        do: () => createAction(SET_DEFAULT_PATH.DOING, {}),
        success: (path: string) =>
          createAction(SET_DEFAULT_PATH.SUCCESS, { defaultPath: path }),
        failed: (error: any) => createAction(SET_DEFAULT_PATH.FAILED, { error })
      };
      try {
        dispatch(setDefaultPathAction.do());
        if (!reCreate) {
          setTimeout(() => {
            dispatch(setDefaultPathAction.success(path));
            resolve(path);
          }, 1000);
        } else
          TutorialAPI.createListJSON(path)
            .then(result => {
              if (result.success) {
                setTimeout(() => {
                  dispatch(setDefaultPathAction.success(path));
                  resolve(result);
                }, 1000);
              } else {
                dispatch(setDefaultPathAction.failed());
                eject(result);
              }
            })
            .catch(error => {
              showError(error);
              dispatch(setDefaultPathAction.failed());
              eject(error);
            });
      } catch (error) {
        dispatch(setDefaultPathAction.failed(error));
        eject({ ...error, success: false });
      }
    });
};

const setVideoInfo = videoInfo => {
  return dispatch => {
    const setDefaultPathAction = {
      do: () => createAction(SET_VIDEO_INFO.DOING, {}),
      success: (videoInfo: any) =>
        createAction(SET_VIDEO_INFO.SUCCESS, { videoInfo }),
      failed: (error: any) => createAction(SET_VIDEO_INFO.FAILED, { error })
    };

    try {
      dispatch(setDefaultPathAction.success(videoInfo));
    } catch (error) {
      dispatch(setDefaultPathAction.failed(error));
    }
  };
};

const initLoadingStatus = () => {
  return dispatch => {
    const setDefaultPathAction = {
      init: () => createAction(SET_DEFAULT_PATH.INITIAL, {})
    };

    dispatch(setDefaultPathAction.init());
  };
};

export {
  initLoadingStatus,
  SET_DEFAULT_PATH,
  setDefaultPath,
  SET_VIDEO_INFO,
  setVideoInfo
};
