import React, { Component } from 'react';
import { AsyncStorage } from 'react-native'
import { AppContainer } from './Navigation';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return <AppContainer />; 
  }
}
