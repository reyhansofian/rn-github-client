import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { graphql } from 'react-apollo';

import USER_QUERY from '../graphql/queries/user/User.graphql';
import { fetchProfile } from './authActions';

class _Profile extends Component {
  props: {
    data: {
      user: Object,
      loading: Boolean
    }
  };

  static contextTypes = {
    actionDispatcher: React.PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.user)
      this.context.actionDispatcher(fetchProfile(nextProps.data.user));
  }

  render() {
    const { loading } = this.props.data;

    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View>
        <Text>Profile</Text>
      </View>
    );
  }
}

const withGraphql = graphql(USER_QUERY, {
  options: () => ({
    variables: {
      user: 'reyhansofian',
      firstCount: 10
    },
    update: (prev, action, variables) => {
      console.log('[DEBUG] action', action);

      return prev;
    }
  })
});

export const Profile = withGraphql(_Profile);
