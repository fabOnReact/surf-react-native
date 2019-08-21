import React, { Component } from 'react';
import { Alert } from 'react-native';
import { AppContainer } from './Navigation';
import Permissions from 'react-native-permissions';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = { locationPermission: null };
  }

  componentDidMount = async () => {
    const { authorizationDeclined } = this.state
    Permissions.check('location', {type: 'whenInUse'}).then(response => {
      this.setState({locationPermission: response});
    }, () => {
      // console.warn(this.state.locationPermission)
    });
    this._requestPermission()
  }

  _requestPermission = () => {
    Permissions.request('location', {type: 'whenInUse'}).then(response => {
      this.setState({locationPermission: response})
    });
  }

  render() {
    return <AppContainer />;
  }
}

