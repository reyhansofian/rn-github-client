import { Platform } from 'react-native';
import {
  IOS_CLIENT_SECRET,
  ANDROID_CLIENT_ID,
  ANDROID_CLIENT_SECRET,
  IOS_CLIENT_ID,
} from 'react-native-dotenv';

export const config = {
  clientId: Platform.OS === 'ios' ? IOS_CLIENT_ID : ANDROID_CLIENT_ID,
  clientSecret: Platform.OS === 'ios' ? IOS_CLIENT_SECRET : ANDROID_CLIENT_SECRET,
};

const rootURL = 'https://api.github.com';

export const getAccessToken = (action, state) => {
  const authParameters = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code: action.payload.code,
      state: action.payload.state,
    }),
  };

  return fetch('https://github.com/login/oauth/access_token', authParameters).then(response =>
    response.json()
  );
};
