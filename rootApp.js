// @flow

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { ApolloProvider } from 'react-apollo';

import { GithubClient } from './routes';
import { configureStore } from './rootStore';
import { graphqlClient } from './rootGraphql';

class App extends Component {
  render() {
    return (
      <ApolloProvider client={graphqlClient} store={configureStore}>
        <GithubClient onNavigationStateChange={null} />
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('GithubClient', () => App);
