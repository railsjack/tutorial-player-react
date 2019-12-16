import { createTypes, createAction } from '../../utils/actions';

const SET_DEFAULT_PATH = createTypes('PLAYER_SET_DEFAULT_PATH');

const setListPath = listPath => {
  return dispatch => {
    const setDefaultPathAction = {
      do: () => createAction(SET_DEFAULT_PATH.DOING, {}),
      success: (listPath: string) =>
        createAction(SET_DEFAULT_PATH.SUCCESS, { listPath }),
      failed: (error: any) => createAction(SET_DEFAULT_PATH.FAILED, { error })
    };

    try {
      dispatch(setDefaultPathAction.do());
      dispatch(setDefaultPathAction.success(listPath));
    } catch (error) {
      dispatch(setDefaultPathAction.failed(error));
    }
  };
};

export { SET_DEFAULT_PATH, setListPath };
