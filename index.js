import { YellowBox, AppRegistry } from 'react-native'
import App from './app/App';
import {name as appName} from './app.json';

import { Client, Configuration } from 'bugsnag-react-native';
import { BUGSNAG_ID } from 'react-native-dotenv';
import 'react-native-gesture-handler';

YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested',
  'RCTRootView cancelTouches',
]);

const config = new Configuration(BUGSNAG_ID);
config.appVersion = require('./package.json').version;
const bugsnag = new Client(config);

AppRegistry.registerComponent(appName, () => App);

