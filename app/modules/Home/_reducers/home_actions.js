import { createTypes, createAction } from '../../../utils/actions';
import TutorialAPI, { showError } from '../../../api/tutorial/web';

const SET_DEFAULT_PATH = createTypes('PLAYER_SET_DEFAULT_PATH');
const SET_VIDEO_INFO = createTypes('PLAYER_SET_VIDEO_INFO');

const setDefaultPath = path => {
  return dispatch =>
    new Promise((resolve, eject) => {
      const setDefaultPathAction = {
        do: () => createAction(SET_DEFAULT_PATH.DOING, {}),
        success: (path: string) =>
          createAction(SET_DEFAULT_PATH.SUCCESS, { defaultPath: path }),
        failed: (error: any) => createAction(SET_DEFAULT_PATH.FAILED, { error })
      };
      try {
        dispatch(setDefaultPathAction.do());
        TutorialAPI.createListJSON(path)
          .then(result => {
            if (result.success) {
              setTimeout(() => {
                // alert(result.message);
                dispatch(setDefaultPathAction.success(path));
                resolve(result);
              }, 1000);
            } else {
              eject(result);
            }
          })
          .catch(error => {
            showError(error);
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

export { SET_DEFAULT_PATH, setDefaultPath, SET_VIDEO_INFO, setVideoInfo };
