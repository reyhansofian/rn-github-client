import actionHandlers from './rootActionHandler';

const dataService = store => next => action => {
  const handler = actionHandlers[action.type];

  next({
    type: `${action.type}_START`,
    payload: action.payload,
  });

  handler(action, store.getState())
    .then(payloadSuccess => {
      next({
        type: `${action.type}_SUCCESS`,
        payload: payloadSuccess,
      });
    })
    .catch(payloadError => {
      console.log('[dataService] error', payloadError);

      next({
        type: `${action.type}_FAILED`,
        payload: {
          ...action.payload,
          error: payloadError,
        },
      });
    });
};

export default dataService;
