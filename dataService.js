import actionHandlers from './rootActionHandler';

const dataService = store => next => action => {
  // Handle redux-persist AsyncStorage rehydration
  // so it won't break the action queue
  if (action.type === 'persist/REHYDRATE') {
    next({
      type: action.type,
      payload: action.payload,
      error: action.error,
    });
  } else if (action.type.includes('GRAPHQL')) {
    next({
      type: `${action.type}_SUCCESS`,
      payload: action.payload,
    });
  } else {
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
  }
};

export default dataService;
