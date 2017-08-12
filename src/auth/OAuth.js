import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class _OAuth extends Component {
  props: {
    isLoggingIn: boolean,
  };

  render() {
    const { isLoggingIn } = this.props;

    return (
      <ViewContainer>
        <View style={styles.container}>
          <Text style={styles.welcomeMessage}>
            {isLoggingIn ? 'Logging you in...' : 'Restarting application...'}
          </Text>
          <ActivityIndicator animating={isLoggingIn} style={styles.loadingIcon} />
        </View>
      </ViewContainer>
    );
  }
}

const mapStateToProps = state => ({
  isLoggingIn: state.auth.isLoggingIn,
});

export const OAuth = connect(mapStateToProps)(_OAuth);
