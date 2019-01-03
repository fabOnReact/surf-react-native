/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import {
  Text, View, AsyncStorage
} from 'react-native';
import {
  Input,
  Button
} from 'react-native-elements';
import { styles } from './styles';
// import { login } from '../redux/actions';

function ErrorMessage(props) {
  const { message } = props;
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{ message }</Text>
    </View>
  );
}

export default class SignInScreen extends Component {
  static navigationOptions = { title: 'Sign In', }

  state = { email: '', password: '', errors: '' };

  // curl --data "user[email]=ezio@email.com&user[password]=fabrizio" 0.0.0.0:3000/users/sign_in.json
  signInAsync = async () => {
    const { navigation } = this.props;
    // perform AJAX request

    // AJAX request returns token
    const token = 'a_test_token';

    // AJAX request returns error
    const errorMessage = '';
    console.log(this.state.email);
    console.log(this.state.password);
    response = this.createUserSession();
    if (errorMessage) {
      this.setState({ errors: errorMessage });
    } else {
      await AsyncStorage.setItem('userToken', token);
      navigation.navigate('App');
    }
  };

  createUserSession = async () => {
    const { email, password } = this.state;
    try {
      let response = await fetch('http://192.168.1.24:3000/users/sign_in.json', {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
        body: JSON.stringify({user: { email: 'ezio@email.com', password: 'fabrizio', }}),
      });
      let responseJson = await response.json();
      console.log(responseJson);
      return responseJson
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const { email, password, errors } = this.state;
    const { navigation } = this.props;
    const message = '';
    return (
      <React.Fragment>
        { message ? <ErrorMessage message={message} /> : null }
        <View style={styles.container}>
          <Text>Login</Text>
          <Input
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
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
            onPress={this.signInAsync}
            buttonStyle={styles.button}
          />
          <Button
            title="Don't have an account? Sign Up"
            onPress={() => navigation.navigate('SignUp')}
            buttonStyle={styles.button}
          />
        </View>
      </React.Fragment>
    );
  }
}

// export default connect(null, { login }) (Login)
