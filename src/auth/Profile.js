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
      viewer: Object,
      loading: Boolean
    }
  };

  static contextTypes = {
    actionDispatcher: React.PropTypes.func
  };

  constructor() {
    super();

    this.renderOrgs = this.renderOrgs.bind(this);
    this.renderStats = this.renderStats.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data.viewer)
      this.context.actionDispatcher(fetchProfile(nextProps.data.viewer));
  }

  renderOrgs() {
    return this.props.data.viewer.orgs.nodes.map(org =>
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

  renderStats() {
    const { followers, following, repos, stars } = this.props.data.viewer;

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#2e2f31',
          padding: 10
        }}
      >
        <View
          style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
            {repos.totalCount}
          </Text>
          <Text style={{ fontSize: 14, color: 'white' }}>Repos</Text>
        </View>
        <View
          style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
            {stars.totalCount}
          </Text>
          <Text style={{ fontSize: 14, color: 'white' }}>Stars</Text>
        </View>
        <View
          style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
            {following.totalCount}
          </Text>
          <Text style={{ fontSize: 14, color: 'white' }}>Following</Text>
        </View>
        <View
          style={{ padding: 5, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>
            {followers.totalCount}
          </Text>
          <Text style={{ fontSize: 14, color: 'white' }}>Followers</Text>
        </View>
      </View>
    );
  }

  render() {
    const { loading, viewer } = this.props.data;

    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    console.log('[DEBUG] viewer', viewer);
    return (
      <ParallaxScrollView
        windowHeight={SCREEN_HEIGHT * 0.4}
        userName={viewer.name}
        navBarTitle={viewer.name}
        userTitle={`@${viewer.login}`}
        userImage={viewer.avatarUrl}
      >
        <ScrollView
          style={{ flex: 1, backgroundColor: 'rgba(228, 117, 125, 1)' }}
        >
          {this.renderStats()}
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
            {this.renderOrgs()}
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
