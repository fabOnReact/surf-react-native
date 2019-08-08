import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import IndexScreen from './screens/IndexScreen';
import CameraScreen from './screens/CameraScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import ProfileScreen from './screens/ProfileScreen';
import MapScreen from './screens/MapScreen';
import WebViewScreen from './screens/WebViewScreen';
import ShowScreen from './screens/ShowScreen';

const AppStack = createStackNavigator({ 
  Show: ShowScreen,
  Index: {
    screen: IndexScreen,
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
