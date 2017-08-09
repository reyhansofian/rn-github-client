export const login = (code, state, navigation) => ({
  type: 'LOGIN',
  payload: { code, state, navigation },
});
