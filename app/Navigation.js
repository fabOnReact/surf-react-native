import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import MainScreen from './screens/MainScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import ProfileScreen from './screens/ProfileScreen';

const AppStack = createStackNavigator({ 
  // Index: { 
  //   screen: PostsScreen,
  //   navigationOptions: ({navigation}) => ({
  //     header: null,
  //   }),
  // },
  Main: {
    screen: MainScreen,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  }, Profile: ProfileScreen
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
