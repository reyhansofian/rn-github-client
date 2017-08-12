import { combineReducers } from 'redux';
import { authReducer } from './src/auth';

export const rootReducer = combineReducers({
  auth: authReducer,
});
