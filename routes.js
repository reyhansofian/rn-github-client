/* eslint-disable react/prop-types */
import React from 'react';
import { StackNavigator, TabNavigator, TabBarBottom, NavigationActions } from 'react-navigation';
import { Icon } from 'react-native-elements';

import { Login, OAuth, Event } from './src/auth';
import Styles from '@assets/styles';

const HomeStackNavigator = StackNavigator(
  {
    Events: {
      screen: Event,
      navigationOptions: {
        headerTitle: 'GithubClient',
      },
    },
  },
  {
    headerMode: 'screen',
  }
);

const MainTabNavigator = TabNavigator(
  {
    Home: {
      screen: HomeStackNavigator,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) =>
          <Icon
            containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
            color={tintColor}
            name="home"
            size={33}
          />,
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      showLabel: false,
      activeTintColor: Styles.colors.primaryDark,
      inactiveTintColor: Styles.colors.grey,
    },
    tabBarComponent: ({ jumpToIndex, ...props }) =>
      <TabBarBottom
        {...props}
        jumpToIndex={index => {
          const { dispatch, state } = props.navigation;

          if (state.index === index && state.routes[index].routes.length > 1) {
            const stackRouteName = ['Events'][index];

            dispatch(
              NavigationActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: stackRouteName })],
              })
            );
          } else {
            jumpToIndex(index);
          }
        }}
      />,
  }
);

export const GithubClient = StackNavigator(
  {
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    OAuth: {
      screen: OAuth,
      navigationOptions: {
        header: null,
      },
      path: 'oauth',
    },
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    headerMode: 'screen',
    URIPrefix: 'rnghclient://',
  }
);
