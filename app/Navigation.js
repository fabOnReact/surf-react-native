import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import MainScreen from './screens/MainScreen';
import CameraScreen from './screens/CameraScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import ProfileScreen from './screens/ProfileScreen';
import MapScreen from './screens/MapScreen';
import WebViewScreen from './screens/WebViewScreen';

const AppStack = createStackNavigator({ 
  Main: {
    screen: MainScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  }, Camera: CameraScreen, Profile: ProfileScreen, Map: MapScreen, WebView: WebViewScreen
});

const AuthStack = createStackNavigator({ SignIn: SignInScreen, SignUp: SignUpScreen });

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
