import React from 'react';
import {
  Text, View
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { styles } from './AuthLoadingScreen';

export default class SignUpScreen extends React.Component {
  state = {
    email: '', password: ''
  }

  handleSignUp = () => {
    console.log('handleSignUp');
  }

  render() {
    const { email, password } = this.state;
    const { navigation } = this.props;
    return (
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
          style={styles.textInput}
          onChangeText={text => this.setState({ password: text })}
          value={password}
        />
        <Button
          title="Sign Up"
          onPress={this.handleSignUp}
          buttonStyle={styles.button}
        />
        <Button
          title="Already have an account? Login"
          onPress={() => navigation.navigate('Login')}
          buttonStyle={styles.button}
        />
      </View>
    );
  }
}
