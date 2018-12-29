import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { createStackNavigator, createAppContainer } from 'react-navigation'

import HomeScreen from './screens/HomeScreen'
import SignUpScreen from './screens/SignUpScreen'
import LoginScreen from './screens/LoginScreen'
import MainScreen from './screens/MainScreen'

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    SignUp: SignUpScreen,
    Login: LoginScreen,
    Main: MainScreen
  },
  { 
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
