import { createTypes, createAction } from '../../../utils/actions';
import TutorialAPI, { showError } from '../../../api/tutorial/web';

const SET_DEFAULT_PATH = createTypes('PLAYER_SET_DEFAULT_PATH');
const REMOVE_DEFAULT_PATH = createTypes('PLAYER_REMOVE_DEFAULT_PATH');

const setDefaultPath = (path, reCreate = false) => {
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

const removeDefaultPath = path => {
  return dispatch =>
    new Promise((resolve, eject) => {
      const removeDefaultPathAction = {
        success: (path: string) =>
          createAction(REMOVE_DEFAULT_PATH.SUCCESS, { defaultPath: path }),
        failed: (error: any) => createAction(REMOVE_DEFAULT_PATH.FAILED, { error })
      };
      try {
        dispatch(removeDefaultPathAction.success(path));
      } catch (error) {
        dispatch(removeDefaultPathAction.failed(error));
        eject({ ...error, success: false });
      }
    });
};

const initLoadingStatus = () => {
  return dispatch => {
    const setDefaultPathAction = {
      init: () => createAction(SET_DEFAULT_PATH.INITIAL, {})
    };

    dispatch(setDefaultPathAction.init());
  };
};

export { initLoadingStatus, SET_DEFAULT_PATH, setDefaultPath, REMOVE_DEFAULT_PATH, removeDefaultPath };
