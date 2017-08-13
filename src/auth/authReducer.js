import { evolve, pick, pipe, path, omit, map } from 'ramda';

const initialState = {
  isLoggingIn: false,
  isSigningOut: false,
  isAuthenticated: false,
  accessToken: null,
  user: {},
  hasInitialUser: false,
  orgs: [],
  events: [],
  repos: [],
  starred: [],
  isLoading: false,
  isPendingUser: false,
  isPendingOrgs: false,
  isPendingEvents: false,
  error: '',
  pageCount: 10
};

const omitTypename = map(omit(['__typename']));
const getUser = pick([
  'avatarUrl',
  'company',
  'bio',
  'email',
  'location',
  'login',
  'name'
]);
const getOrgs = pipe(path(['orgs', 'nodes']), omitTypename);
const getRepos = pipe(path(['repos', 'nodes']), omitTypename);
const getStarred = pipe(path(['stars', 'nodes']), omitTypename);

export const authReducer = (state = initialState, action = {}) => {
  const { type, payload } = action;

  switch (type) {
    case 'GRAPHQL_GET_PROFILE_SUCCESS':
      return Object.assign({}, state, {
        user: getUser(payload.user),
        orgs: getOrgs(payload.user),
        repos: getRepos(payload.user),
        starred: getStarred(payload.user)
      });
    case 'GET_PROFILE_FAILED':
      return Object.assign({}, state, {
        error: payload.error
      });
    case 'LOGIN_START':
      return Object.assign({}, state, {
        isLoggingIn: true,
        isLoading: true
      });
    case 'LOGIN_SUCCESS':
      console.log('[DEBUG] payload', payload);
      return Object.assign({}, state, {
        isLoggingIn: false,
        isAuthenticated: true,
        isLoading: false,
        accessToken: payload.access_token
      });
    case 'LOGIN_FAILED':
      return Object.assign({}, state, {
        isLoggingIn: false,
        isLoading: false,
        isAuthenticated: false,
        error: payload.error
      });
    default:
      return state;
  }
};
