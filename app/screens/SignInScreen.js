import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from './styles';
import { ErrorMessage, getErrors } from '../components/ErrorMessage'
import { createSession } from '../lib/api'
import GoogleButton from '../components/GoogleButton'

export default class SignInScreen extends Component {
  static navigationOptions = { title: 'Sign In', }
  state = { email: '', password: '', errors: '' };

  saveCredentials = async (json) => {
    const { navigation } = this.props;
    const { email } = this.state;
    await AsyncStorage.setItem('userToken', json.authentication_token); 
    await AsyncStorage.setItem('userEmail', email); 
    navigation.navigate('App');
  }

  triggerErrors = (json) => {
    this.setState({ errors: getErrors(json) });
  }

  createUserSession = async () => {
    const { email, password } = this.state;
    const body = JSON.stringify({ user: { email: email, password: password, }})
    createSession(this.saveCredentials, this.triggerErrors, body)
  }

  render() {
    const { email, password, errors } = this.state;
    const { navigation } = this.props;
    return (
      <React.Fragment>
        { errors ? <ErrorMessage message={errors} /> : null }
        <View style={styles.container}>
          <Text>Login</Text>
          <Input
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            autoCapitalize = "none"
            onChangeText={text => this.setState({ email: text })}
            value={email}
          />
          <Input
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            autoCapitalize = "none"
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
          <GoogleButton />
        </View>
      </React.Fragment>
    );
  }
}
