// @flow

import React, { Component } from 'react';
import { AppRegistry, AsyncStorage, StyleSheet, Image } from 'react-native';
import { ApolloProvider } from 'react-apollo';
import { persistStore, purgeStoredState } from 'redux-persist';
import { NavigationActions } from 'react-navigation';

import { GithubClient } from './routes';
import { configureStore } from './rootStore';
import { client } from './apolloClient';
import Styles from '@assets/styles';
import Images from '@assets/images';

const style = StyleSheet.create({
  logo: {
    width: 350,
    height: 130,
  },
});

class App extends Component {
  state = {
    isRehydrated: false,
  };

  static childContextTypes = {
    actionDispatcher: React.PropTypes.func,
  };

  getChildContext() {
    return { actionDispatcher: configureStore.dispatch };
  }

  componentWillMount() {
    persistStore(configureStore, { storage: AsyncStorage }, () => {
      this.setState({ isRehydrated: true });
    });
  }

  setGraphqlClient() {
    const { accessToken } = configureStore.getState().auth;

    if (!accessToken) this.nav && this.nav.dispatch(NavigationActions.navigate('Login'));

    client.networkInterface.use([
      {
        applyMiddleware(req, next) {
          if (!req.options.headers) {
            req.options.headers = {}; // Create the header object if needed.
          }
          // get the authentication token from local storage if it exists
          req.options.headers.authorization = accessToken ? `Bearer ${accessToken}` : null;
          next();
        },
      },
    ]);

    return client;
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
      <ApolloProvider client={this.setGraphqlClient()} store={configureStore}>
        <GithubClient
          ref={nav => {
            this.nav = nav;
          }}
        />
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('GithubClient', () => App);
