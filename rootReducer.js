import { combineReducers } from 'redux';
import { authReducer } from './src/reducers/auth/authReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
});
