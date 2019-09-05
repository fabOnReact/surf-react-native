import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import Video from 'react-native-video';
import AsyncStorage from '@react-native-community/async-storage';
import { Input, Button } from 'react-native-elements';
import { styles } from './styles';
import ErrorMessage from '../components/ErrorMessage'
import Message from '../lib/message'
import { createResource } from '../lib/api'
import { sessionSettings } from '../lib/support'
import GoogleButton from '../components/GoogleButton'
import { getAsset } from '../lib/support'
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from 'react-native-dotenv';

export default class SignInScreen extends Component {
  static navigationOptions = ({ navigation }) => {
      return {
        title: 'Sign In',
        headerTintColor: 'white',
        headerTransparent: true,
        headerStyle: { borderBottomWidth: 0, }
      };
  };
  state = { email: '', password: '', errors: '' };

  constructor(props) {
    super(props)
    this.setErrors = this.setErrors.bind(this)
  }

  saveCredentials = async (json) => {
    const { navigation } = this.props;
    await AsyncStorage.setItem('userToken', json.authentication_token);
    await AsyncStorage.setItem('userEmail', json.email);
    navigation.navigate('App');
  }

  setErrors = (obj) => {
    this.setState({ errors: new Message(obj).errors });
  }

  createUserSession = async () => {
    const { email, password } = this.state;
    const body = JSON.stringify({ user: { email, password } })
    createResource(this.saveCredentials, this.setErrors, body, sessionSettings)
  }

  render() {
    const { email, password, errors } = this.state;
    const { navigation } = this.props;
    const height = Dimensions.get("window").height;
    return (
      <React.Fragment>
        { errors ? <ErrorMessage message={errors} /> : null }
          <Video 
            source={getAsset("costline-max.mp4")}
            poster={getAsset("costline-poster-max.png")}
            posterResizeMode={"cover"}
            resizeMode={"cover"}
            style={{height: height}}
            repeat 
            muted />
          <View style={styles.container}>
            <Input
              inputContainerStyle={{borderBottomColor: "white"}}
              inputStyle={{color: 'white'}}
              placeholderTextColor="white"
              placeholder="Email"
              autoCapitalize="none"
              onChangeText={text => this.setState({ email: text })}
              value={email}
            />
            <Input
              secureTextEntry
              inputContainerStyle={{borderBottomColor: "white"}}
              inputStyle={{color: 'white'}}
              placeholderTextColor="white"
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={text => this.setState({ password: text })}
              value={password}
            />
            <Button
              title="Login"
              onPress={this.createUserSession}
              buttonStyle={styles.button}
            />
            <Button
              title="Sign Up"
              onPress={() => navigation.navigate('SignUp')}
              buttonStyle={styles.button}
            />
            <GoogleButton saveCredentials={this.saveCredentials} setErrors={this.setErrors} />
          </View>
      </React.Fragment>
    );
  }
}
