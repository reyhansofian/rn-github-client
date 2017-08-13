import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';

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
  options: props => ({
    variables: {
      firstCount: props.count
    }
  })
});

const mapStateToProps = state => ({
  count: state.auth.pageCount
});

export const Profile = compose(connect(mapStateToProps), withGraphql)(_Profile);
