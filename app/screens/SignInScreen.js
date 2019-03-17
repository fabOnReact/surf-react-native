/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import React, { Component } from 'react';
import { Text, View, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from './styles';
import { host, headers } from '../config/constants'
import { ErrorMessage } from '../components/ErrorMessage'
import GoogleButton from '../components/GoogleButton'

export default class SignInScreen extends Component {
  static navigationOptions = { title: 'Sign In', }

  state = { email: '', password: '', errors: '' };

  createUserSession = async () => {
    const { navigation } = this.props;
    const { email, password } = this.state;
    // to be refactored 
    try {
      const body = JSON.stringify({ user: { email: email, password: password, }})
      const options = { method: 'POST', headers: headers, body: body,}
      let response = await fetch(host + '/users/sign_in.json', options );
      
      const responseJson = await response.json();
      if (response.status == "200") { 
        await AsyncStorage.setItem('userToken', responseJson.authentication_token); 
        await AsyncStorage.setItem('userEmail', email); 
        navigation.navigate('App');
      }
      if (response.status == "401") {
        this.setState({ errors: responseJson.error });
      }
    } catch (error) {
      console.log(error);
    }
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
