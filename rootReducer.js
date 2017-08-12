import { combineReducers } from 'redux';
import { ApolloClient } from 'react-apollo';
import { authReducer } from './src/auth';

const client = new ApolloClient({
  reduxRootSelector: state => state.graphql,
});

export const rootReducer = combineReducers({
  auth: authReducer,
  graphql: client.reducer(),
});
