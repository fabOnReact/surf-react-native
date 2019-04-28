import React, { Component } from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { navbar } from './styles/NavbarStyles';
import { navstyles } from './styles/NavbarStyles';

export default class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <Icon
          containerStyle={navstyles.buttonAbsolute}
          name='ios-radio-button-off'
          type='ionicon'
          size={70}
          color='#ffffff'
          underlayColor='transparent'
          onPress={() => this.props.action() }
        />
      </React.Fragment>
    );
  }
}
