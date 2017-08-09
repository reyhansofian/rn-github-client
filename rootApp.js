// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AppRegistry } from 'react-native';

import { GithubClient } from './routes';
import { configureStore } from './rootStore';

class App extends Component {
  render() {
    return (
      <Provider store={configureStore}>
        <GithubClient onNavigationStateChange={null} />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('GithubClient', () => App);
