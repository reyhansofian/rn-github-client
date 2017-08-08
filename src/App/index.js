// @flow

import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { GithubClient } from '../../routes';
import { configureStore } from '../../rootStore';

export default class App extends Component {
  render() {
    return (
      <Provider store={configureStore}>
        <GithubClient onNavigationStateChange={null} />
      </Provider>
    );
  }
}
