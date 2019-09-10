import React, { Component } from 'react';
import { Container, Header, Content, List } from 'native-base';
import ForecastMap from '../components/ForecastMap';
import Item from '../components/Item';
import { locations_fixtures } from '../../test/fixtures/locations.js';

export default class NearbyScreen extends Component { 
  static navigationOptions = {
    title: 'Around You',
  };
  render() {
    const { navigation } = this.props
    const post = navigation.getParam('post')
    const locations = navigation.getParam('locations')
    return (
      <React.Fragment>
        <Container>
          <Content>
            <List>
              { locations.map(location => <Item key={location.id} post={post} location={location} navigation={navigation} />) }
            </List>
          </Content>
        </Container>
      </React.Fragment>
    )
  }
}
