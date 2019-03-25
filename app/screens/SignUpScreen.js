import React from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { styles } from './styles';
import { ErrorMessage, getErrors } from '../components/ErrorMessage';
import { createUser } from '../lib/api'
import GoogleButton from '../components/GoogleButton'

export default class SignUpScreen extends React.Component {
  static navigationOptions = { title: 'Sign Up', };
  state = { email: '', password: '', errors: '' };

  saveCredentials = async (json) => {
    const { navigation } = this.props;
    await AsyncStorage.setItem('userToken', json.authentication_token);
    await AsyncStorage.setItem('userEmail', json.email);
    navigation.navigate('App');
  }

  triggerErrors = (json) => {
    this.setState({ errors: getErrors(json) });
  }

  createUserRegistration = async () => {
    const { email, password } = this.state;
    const body = JSON.stringify({ user: { email, password } })
    await createUser(this.saveCredentials, this.triggerErrors, body)
  }

  render() {
    const { email, password, errors } = this.state;
    const { navigation } = this.props;
    return (
      <React.Fragment>
        { errors ? <ErrorMessage message={errors} /> : null }
        <View style={styles.container}>
          <Text>Sign Up</Text>
          <Input
            placeholder="Email"
            autocapitalize="none"
            style={styles.textInput}
            onChangeText={text => this.setState({ email: text })}
            value={email}
          />
          <Input
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.textInput}
            onChangeText={text => this.setState({ password: text })}
            value={password}
          />
          <Button
            title="Sign Up"
            onPress={this.createUserRegistration}
            buttonStyle={styles.button}
          />
          <Button
            title="Already have an account? Login"
            onPress={() => navigation.navigate('SignIn')}
            buttonStyle={styles.button}
          />
          <GoogleButton />
        </View>
      </React.Fragment>
    );
  }
}
