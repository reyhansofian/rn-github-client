const initialState = {
  isLoggingIn: false,
  isSigningOut: false,
  isAuthenticated: false,
  accessToken: null,
  user: {},
  hasInitialUser: false,
  orgs: [],
  events: [],
  isPendingUser: false,
  isPendingOrgs: false,
  isPendingEvents: false,
  error: '',
};

export const authReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case 'LOGIN_START':
      return Object.assign({}, state, {
        isLoggingIn: true,
      });
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        isLoggingIn: false,
        accessToken: payload.access_token,
      });
    case 'LOGIN_FAILED':
      return Object.assign({}, state, {
        error: payload.error,
      });
    default:
      return state;
  }
};
