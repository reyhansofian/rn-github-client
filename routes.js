/* eslint-disable react/prop-types */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { Login, OAuth } from './src/auth';

export const GithubClient = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    OAuth: {
      screen: OAuth,
      navigationOptions: {
        header: null,
      },
      path: 'oauth',
    },
  },
  {
    headerMode: 'screen',
    URIPrefix: 'rnghclient://',
  }
);
