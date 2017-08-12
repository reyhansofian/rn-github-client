import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { graphql, gql } from 'react-apollo';

import USER_QUERY from '../graphql/queries/user/User.graphql';

class _Profile extends Component {
  props: {
    loading: Boolean,
    user: Object
  };

  render() {
    const { loading, user } = this.props.data;

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
  options: props => ({
    variables: {
      user: 'reyhansofian',
      firstCount: 10
    },
    fetchPolicy: 'cache-and-network'
  })
});

export const Profile = withGraphql(_Profile);
