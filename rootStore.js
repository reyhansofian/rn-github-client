import { compose, createStore, applyMiddleware } from 'redux';
import { autoRehydrate } from 'redux-persist';
import reduxThunk from 'redux-thunk';

import { rootReducer } from './rootReducer';
import dataService from './dataService';

const getMiddleware = () => {
  const middlewares = [reduxThunk, dataService];

  return applyMiddleware(...middlewares);
};

const getEnhancers = () => {
  const enhancers = [];

  enhancers.push(autoRehydrate());

  return enhancers;
};

let composeEnhancers;

if (__DEV__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Prevents Redux DevTools from re-dispatching all previous actions.
        shouldHotReload: false,
      })
    : compose;
} else {
  composeEnhancers = compose;
}

export const configureStore = createStore(
  rootReducer,
  composeEnhancers(getMiddleware(), ...getEnhancers())
);
