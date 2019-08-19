import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Input, Button } from 'react-native-elements';
import { styles } from './styles';
import ErrorMessage from '../components/ErrorMessage'
import Message from '../lib/message'
import { createResource } from '../lib/api'
import { sessionSettings } from '../lib/support'
import GoogleButton from '../components/GoogleButton'
import { WEB_CLIENT_ID, IOS_CLIENT_ID } from 'react-native-dotenv';

export default class SignInScreen extends Component {
  static navigationOptions = { title: 'Sign In', }
  state = { email: '', password: '', errors: '' };

  constructor(props) {
    super(props)
    this.setErrors = this.setErrors.bind(this)
  }

  saveCredentials = async (json) => {
    const { navigation } = this.props;
    console.warn(json.authentication_token)
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
    return (
      <React.Fragment>
        { errors ? <ErrorMessage message={errors} /> : null }
        <View style={styles.container}>
          <Input
            style={styles.textInput}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={text => this.setState({ email: text })}
            value={email}
          />
          <Input
            secureTextEntry
            style={styles.textInput}
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
            title="Don't have an account? Sign Up"
            onPress={() => navigation.navigate('SignUp')}
            buttonStyle={styles.button}
          />
          <GoogleButton saveCredentials={this.saveCredentials} setErrors={this.setErrors} />
        </View>
      </React.Fragment>
    );
  }
}
