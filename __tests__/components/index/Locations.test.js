import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import {shallow} from 'enzyme';
import Locations from '../../../app/components/index/Locations';
import GoogleSignin from 'react-native-google-signin';

jest.mock('@react-native-community/async-storage', () => ({
  getItem: jest.fn()
}))

jest.mock('react-native-device-info', () => ({
  hasNotch: jest.fn()
}))

jest.mock('react-navigation', () => ({
  Header: jest.fn()
}))

jest.mock('react-native-geolocation-service', () => ({}))
jest.mock('react-native-google-signin', () => ({
  SIGN_IN_CANCELLED: jest.fn(),
}))

jest.mock('react-native-orientation-locker', () => ({
  addOrientationListener: jest.fn(),
  removeOrientationListener: jest.fn(),
}))

jest.mock('../../../app/lib/api')

describe('Locations', () => {
    describe('Rendering', () => {
        it('renders the View component', () => {
          const component = shallow(<Locations />)
          expect(component.find(View).length).toBe(1)
        });
    });
});
