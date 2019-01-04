// import React from 'react';
// import { AppRegistry } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import AuthLoadingScreen from './screens/AuthLoadingScreen';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import MainScreen from './screens/MainScreen';

const AppStack = createStackNavigator({ Home: HomeScreen, Main: MainScreen });
const AuthStack = createStackNavigator({ SignIn: SignInScreen, SignUp: SignUpScreen });

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
