export const createTypes = typePrefix => ({
  INITIAL: `${typePrefix}_INITIAL`,
  DOING: `${typePrefix}_DO`,
  SUCCESS: `${typePrefix}_SUCCESS`,
  FAILED: `${typePrefix}_FAILED`
});

export const createAction = (type, args) => ({
  ...args,
  type
});
