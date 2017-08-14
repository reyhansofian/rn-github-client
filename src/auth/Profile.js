import React, { Component } from 'react';
import { Image, Dimensions, ScrollView, View, Text } from 'react-native';
import { graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import ParallaxScrollView from 'react-native-parallax-scrollview';

import USER_QUERY from '../graphql/queries/user/User.graphql';
import { fetchProfile } from './authActions';

const SCREEN_HEIGHT = Dimensions.get('window').height;

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

  constructor() {
    super();

    this.renderOrgs = this.renderOrgs.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.user)
      this.context.actionDispatcher(fetchProfile(nextProps.data.user));
  }

  renderOrgs(orgs) {
    return orgs.nodes.map(org =>
      <View
        key={org.id}
        style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}
      >
        <Image
          source={{ uri: org.avatarUrl }}
          style={{ height: 60, width: 60, borderRadius: 30 }}
        />
        <Text
          style={{
            maxWidth: 100,
            color: 'white',
            paddingTop: 5,
            textAlign: 'center'
          }}
        >
          {org.name}
        </Text>
      </View>
    );
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
      <ParallaxScrollView
        windowHeight={SCREEN_HEIGHT * 0.4}
        userName={user.name}
        navBarTitle={user.name}
        userTitle={`@${user.login}`}
        userImage={user.avatarUrl}
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: 'rgba(228, 117, 125, 1)' }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'baseline',
              paddingTop: 10,
              paddingBottom: 10,
              paddingLeft: 5,
              paddingRight: 5,
              flexWrap: 'wrap'
            }}
          >
            {this.renderOrgs(user.orgs)}
          </View>
        </ScrollView>
      </ParallaxScrollView>
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
