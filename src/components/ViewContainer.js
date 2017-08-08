import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';

type Props = {
  barColor: string,
  children?: React.Element<*>,
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: 'white',
  },
});

export const ViewContainer = ({ barColor, children }: Props) =>
  <View style={styles.viewContainer}>
    <StatusBar barStyle={barColor === 'light' ? 'light-content' : 'dark-content'} />
    {children}
  </View>;

ViewContainer.defaultProps = {
  children: null,
};
