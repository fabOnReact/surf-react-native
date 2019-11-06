import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import IndexScreen from './screens/IndexScreen';
import CameraScreen from './screens/CameraScreen';
import ProfileScreen from './screens/ProfileScreen';
import MapScreen from './screens/MapScreen';
import WebViewScreen from './screens/WebViewScreen';
import ForecastScreen from './screens/ForecastScreen';
import NearbyScreen from './screens/NearbyScreen';
import AuthenticationScreen from './screens/AuthenticationScreen';
import FlagScreen from './screens/FlagScreen';

const AppStack = createStackNavigator({ 
  Index: {
    screen: IndexScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  }, 
  WebView: WebViewScreen,
  Camera: CameraScreen,
  Profile: ProfileScreen, 
  Map: MapScreen, 
  Nearby: NearbyScreen,
  Forecast: ForecastScreen,
  Flag: FlagScreen,
});

const AuthStack = createStackNavigator({ Authentication: AuthenticationScreen });
const AppNavigator = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export const AppContainer = createAppContainer(AppNavigator);
