import * as api from '../api';

export default {
  LOGIN(action, state) {
    return api.getAccessToken(action, state);
  },
  GET_PROFILE(action, state) {
    return Promise.resolve();
  }
};
