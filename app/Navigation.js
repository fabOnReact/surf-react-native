import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import IndexScreen from './screens/IndexScreen';
import NewScreen from './screens/NewScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';

const AppStack = createStackNavigator({ Index: IndexScreen, New: NewScreen });
const AuthStack = createStackNavigator({ SignUp: SignUpScreen, SignIn: SignInScreen });

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