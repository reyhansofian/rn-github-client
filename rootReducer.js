import { combineReducers } from 'redux';
import { authReducer } from './src/auth';

import { client } from './apolloClient';

export const rootReducer = combineReducers({
  auth: authReducer,
  apollo: client.reducer(),
});
