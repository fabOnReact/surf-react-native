import React, {Component} from 'react'
import { AppRegistry } from 'react-native'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

// Import the reducer and create a store
import { reducer } from './authenticationRedux'
const store = createStore(reducer)

// Import the App container component
import App from './App';

// Pass the store into the provider
import {name as appName} from './app.json';
const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => AppWithStore);
