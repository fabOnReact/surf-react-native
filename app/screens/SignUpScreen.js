import React from 'react'
import { View, AsyncStorage } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { styles } from './styles';
import ErrorMessage from '../components/ErrorMessage';
import Message from  '../lib/message';
import { createResource } from '../lib/api' ;
import { userSettings } from '../lib/support';
import GoogleButton from '../components/GoogleButton';

export default class SignUpScreen extends React.Component {
  static navigationOptions = { title: 'Sign Up', };
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

  createUserRegistration = async () => {
    const { email, password } = this.state;
    const body = JSON.stringify({ user: { email, password } })
    let settings = { endpoint: "users", responseStatus: 201 }
    await createResource(this.saveCredentials, this.setErrors, body, userSettings)
  }

  render() {
    const { email, password, errors } = this.state;
    const { navigation } = this.props;
    return (
      <React.Fragment>
        { errors ? <ErrorMessage message={errors} /> : null }
        <View style={styles.container}>
          <Input
            placeholder="Email"
            autocapitalize="none"
            style={styles.textInput}
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
            title="Sign Up"
            onPress={this.createUserRegistration}
            buttonStyle={styles.button}
          />
          <Button
            title="Already have an account? Login"
            onPress={() => navigation.navigate('SignIn')}
            buttonStyle={styles.button}
          />
          <GoogleButton saveCredentials={this.saveCredentials} setErrors={this.setErrors} />
        </View>
      </React.Fragment>
    );
  }
}
