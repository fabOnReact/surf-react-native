import React, {Component} from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { authentication } from './redux/actions'

// Import the App container component
import App from './App';

// create redux store
const store = createStore(
  authentication,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

// Pass the store into the provider
import {name as appName} from './app.json';
const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent(appName, () => AppWithStore);
