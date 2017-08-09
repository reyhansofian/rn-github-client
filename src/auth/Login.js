// @flow

import React, { Component } from 'react';
import { Platform, View, Image, StyleSheet, Linking } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import {
  IOS_CLIENT_SECRET,
  ANDROID_CLIENT_ID,
  ANDROID_CLIENT_SECRET,
  IOS_CLIENT_ID,
} from 'react-native-dotenv';
import queryString from 'query-string';
import SafariView from 'react-native-safari-view';

import { openURLInView } from '../utils/helpers';
import Images from '@assets/images';
import Styles from '@assets/styles';

const style = StyleSheet.create({
  logo: {
    width: 350,
    height: 130,
  },
  formLabel: { flexDirection: 'row', justifyContent: 'flex-start' },
  container: { flex: 1, marginTop: '50%' },
  loginButton: { marginTop: 20 },
});

const stateRandom = Math.random().toString();
const config = {
  clientId: Platform.OS === 'ios' ? IOS_CLIENT_ID : ANDROID_CLIENT_ID,
  clientSecret: Platform.os === 'ios' ? IOS_CLIENT_SECRET : ANDROID_CLIENT_SECRET,
};

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      code: '',
    };
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then(url => {
      if (url) {
        this.handleOpenURL({ url });
      }
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  signIn = () =>
    openURLInView(
      [
        'https://github.com/login/oauth/authorize?response_type=token&',
        `client_id=${config.clientId}&`,
        `redirect_uri=rnghclient://oauth&scope=user%20repo&state=${stateRandom}`,
      ].join('')
    );

  handleOpenURL = ({ url }) => {
    const [, queryStringFromUrl] = url.match(/\?(.*)/);
    const { state, code } = queryString.parse(queryStringFromUrl);

    if (stateRandom === state) {
      this.setState({ code });
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
        <Button title={'Login'} buttonStyle={style.loginButton} onPress={() => this.signIn()} />
      </View>
    );
  }
}
