import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { graphql, gql } from 'react-apollo';
import { connect } from 'react-redux';

import USER_QUERY from '../graphql/queries/user/User.graphql';
import { fetchProfile } from './authActions';

class _Profile extends Component {
  props: {
    loading: Boolean,
    user: Object
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.user)
      this.props.dispatch(fetchProfile(nextProps.data.user));
  }

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

export const Profile = withGraphql(connect()(_Profile));
