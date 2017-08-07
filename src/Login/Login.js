// @flow

import React, { Component } from 'react';
import { Platform, View, Image, StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import {
  IOS_CLIENT_ID,
  IOS_CLIENT_SECRET,
  ANDROID_CLIENT_ID,
  ANDROID_CLIENT_SECRET,
} from 'react-native-dotenv';

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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      token: '',
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsername(value) {
    this.setState({
      username: value,
    });
  }

  handlePassword(value) {
    this.setState({
      password: value,
    });
  }

  // eslint-disable-next-line
  handleLogin() {
    const config = {
      github: {
        client_id: Platform.os === 'ios' ? IOS_CLIENT_ID : ANDROID_CLIENT_ID,
        client_secret: Platform.os === 'ios' ? IOS_CLIENT_SECRET : ANDROID_CLIENT_SECRET,
      },
    };
  }

  render() {
    return (
      <View style={style.container}>
        <Styles.flexCenterView>
          <Image source={Images.githubLogo} style={style.logo} />
        </Styles.flexCenterView>
        <FormLabel style={style.formLabel}>Username / Email</FormLabel>
        <FormInput onChangeText={this.handleUsername} autoCapitalize={'none'} />
        <FormLabel style={style.formLabel}>Password</FormLabel>
        <FormInput onChangeText={this.handlePassword} secureTextEntry />
        <Button title={'Login'} buttonStyle={style.loginButton} onPress={this.handleLogin} />
      </View>
    );
  }
}

export default Login;
