/* eslint-disable react/prop-types */
import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Login from './src/Login/Login';
import Welcome from './src/Welcome/Welcome';

export const GithubClient = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Welcome: {
      screen: Welcome,
      navigationOptions: {
        header: null,
      },
      path: 'welcome',
    },
  },
  {
    headerMode: 'screen',
    URIPrefix: 'rnghclient://',
  }
);
