import React, { Component } from 'react'
import { AppRegistry } from 'react-native'

import { actionCreators } from './authenticationRedux' 
import Input from './Input'
import LoginComponent from './LoginComponent';

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <LoginComponent />
      </React.Fragment>
    )
  }
}

