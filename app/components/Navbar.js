import React, { Component } from 'react';
import { Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { navbar } from './styles/NavbarStyles';

export default Navbar = ({props}) => (
  <React.Fragment>
    <Icon
      containerStyle={navbar.buttonLeft}
      name='location-pin' 
      type='entypo'
      size={40}
      color='#ffffff'
      // onPress={() => navigation.navigate('New')}
    />
    <Text style={navbar.textLeft}>Map</Text>
    <Icon
      containerStyle={navbar.buttonAbsolute}
      name='ios-radio-button-off'
      type='ionicon'
      size={70}
      color='#ffffff'
      // onPress={() => navigation.navigate('New')}
    />
    <Icon
      containerStyle={navbar.buttonRight}
      name='grain' 
      size={40}
      color='#ffffff'
      // onPress={() => navigation.navigate('New')}
    />
    <Text style={navbar.textRight}>Discover</Text>
  </React.Fragment>
);

