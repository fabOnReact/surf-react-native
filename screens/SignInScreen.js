/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Text, View, AsyncStorage } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from './styles';
import { host, headers } from '../redux/constants'
import { ErrorMessage } from './StatelessComponents'
// import { login } from '../redux/actions';

export default class SignInScreen extends Component {
  static navigationOptions = { title: 'Sign In', }

  state = { email: '', password: '', errors: '' };

  createUserSession = async () => {
    const { navigation } = this.props;
    const { email, password } = this.state;
    try {
      // const headers = { 'Accept': 'application/json', 'Content-Type': 'application/json', }
      const body = JSON.stringify({ user: { email: email, password: password, }})
      const options = { method: 'POST', headers: headers, body: body,}
      let response = await fetch(host + '/users/sign_in.json', options );
      
      // ({user: { email: 'ezio@email.com', password: 'fabrizio', }}),});
      const responseJson = await response.json();
      if (response.status == "200") { 
        await AsyncStorage.setItem('userToken', responseJson.authentication_token); 
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
        </View>
      </React.Fragment>
    );
  }
}

// export default connect(null, { login }) (Login)
