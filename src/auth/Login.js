/* eslint import/no-extraneous-dependencies: 0 */

// @flow

import React, { Component } from 'react';
import {
  AsyncStorage,
  Platform,
  View,
  Image,
  StyleSheet,
  Linking
} from 'react-native';
import { Button } from 'react-native-elements';
import { connect } from 'react-redux';
import queryString from 'query-string';
import SafariView from 'react-native-safari-view';
import RNRestart from 'react-native-restart';
import { createPersistor } from 'redux-persist';

import Images from '@assets/images';
import Styles from '@assets/styles';
import { openURLInView } from '../utils/helpers';
import { config } from '../api';
import { login } from './authActions';

const style = StyleSheet.create({
  logo: {
    width: 350,
    height: 130
  },
  formLabel: { flexDirection: 'row', justifyContent: 'flex-start' },
  container: { flex: 1, marginTop: '50%' },
  loginButton: { marginTop: 20 }
});

const stateRandom = Math.random().toString();

class _Login extends Component {
  props: {
    navigation: Object,
    dispatch: Function,
    isAuthenticated: Boolean,
    accessToken: string
  };

  static contextTypes = {
    store: React.PropTypes.object
  };

  state = {
    code: ''
  };

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then(url => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });

    if (this.props.accessToken && this.props.isAuthenticated) {
      this.props.navigation.navigate('Main');
    }
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  componentWillReceiveProps(props) {
    // Persist the new props into storage
    if (props.accessToken && props.isAuthenticated) {
      const persistor = createPersistor(this.context.store, {
        storage: AsyncStorage
      });

      Promise.resolve(persistor.rehydrate(props)).then(() => {
        // This restart is a hack for Apollo client setup
        setTimeout(() => {
          RNRestart.Restart();
        }, 2000);
      });
    }
  }

  signIn = () =>
    openURLInView(
      [
        'https://github.com/login/oauth/authorize?response_type=token&',
        `client_id=${config.clientId}&`,
        `redirect_uri=rnghclient://oauth&scope=user%20repo%20read:org&state=${stateRandom}`
      ].join('')
    );

  handleOpenURL = ({ url }) => {
    const [, queryStringFromUrl] = url.match(/\?(.*)/);
    const { state, code } = queryString.parse(queryStringFromUrl);
    const { dispatch } = this.props;

    if (stateRandom === state) {
      this.setState({ code });

      dispatch(login(code, state));
    }

    if (Platform.OS === 'ios') {
      SafariView.dismiss();
    }
  };

  render() {
    return (
      <View style={style.container}>
        <Styles.flexCenterView>
          <Image source={Images.githubLogo} style={style.logo} />
        </Styles.flexCenterView>
        <Button
          title={'Login'}
          buttonStyle={style.loginButton}
          onPress={() => this.signIn()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  accessToken: state.auth.accessToken
});

export const Login = connect(mapStateToProps)(_Login);
