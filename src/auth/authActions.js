export const login = (code, state, navigation) => ({
  type: 'LOGIN',
  payload: { code, state, navigation }
});

export const fetchProfile = user => ({
  type: 'GRAPHQL_GET_PROFILE',
  payload: { user }
});
