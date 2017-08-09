// @flow

import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, StyleSheet, Image } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { persistStore } from 'redux-persist';

import { GithubClient } from './routes';
import { configureStore } from './rootStore';
import { graphqlClient } from './rootGraphql';
import Styles from '@assets/styles';
import Images from '@assets/images';

const style = StyleSheet.create({
  logo: {
    width: 350,
    height: 130,
  },
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      isRehydrated: false,
    };
  }

  componentWillMount() {
    persistStore(configureStore, { storage: AsyncStorage }, () => {
      this.setState({ isRehydrated: true });
    });
  }

  render() {
    if (!this.state.isRehydrated) {
      return (
        <Styles.flexCenterView>
          <Image source={Images.githubLogo} style={style.logo} />
        </Styles.flexCenterView>
      );
    }

    return (
      <ApolloProvider client={graphqlClient} store={configureStore}>
        <GithubClient onNavigationStateChange={null} />
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('GithubClient', () => App);
