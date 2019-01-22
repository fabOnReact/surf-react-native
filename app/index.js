//import React, {Component} from 'react'
import { AppRegistry } from 'react-native'

// Import the App container component
import App from './App';

// Pass the store into the provider
import {name as appName} from '../app.json';

AppRegistry.registerComponent(appName, () => App);

/*
// Redux
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { authentication } from './redux/actions'

// create redux store
const store = createStore(
  authentication,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const AppWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
)
*/