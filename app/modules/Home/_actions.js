import { createTypes, createAction } from '../../utils/actions';

const SET_DEFAULT_PATH = createTypes('PLAYER_SET_DEFAULT_PATH');

const setDefaultPath = defaultPath => {
  return dispatch => {
    const setDefaultPathAction = {
      do: () => createAction(SET_DEFAULT_PATH.DOING, {}),
      success: (defaultPath: string) =>
        createAction(SET_DEFAULT_PATH.SUCCESS, { defaultPath }),
      failed: (error: any) => createAction(SET_DEFAULT_PATH.FAILED, { error })
    };

    try {
      dispatch(setDefaultPathAction.do());
      dispatch(setDefaultPathAction.success(defaultPath));
    } catch (error) {
      dispatch(setDefaultPathAction.failed(error));
    }
  };
};

export { SET_DEFAULT_PATH, setDefaultPath };
