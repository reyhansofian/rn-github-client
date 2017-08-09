import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';

import { ViewContainer } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeMessage: {
    color: 'black',
  },
  loadingIcon: {
    marginTop: 30,
  },
});

export class OAuth extends Component {
  props: {
    language: string,
    isLoggingIn: boolean,
  };

  render() {
    return (
      <ViewContainer>
        <View style={styles.container}>
          <Text style={styles.welcomeMessage}>Welcome</Text>
        </View>
      </ViewContainer>
    );
  }
}
