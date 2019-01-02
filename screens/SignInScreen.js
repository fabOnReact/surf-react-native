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

export default class SignInScreen extends Component {
  static navigationOptions = { title: 'Sign In', }

  state = { email: '', password: '' };

  /*
  login = () => {
    this.props.login(this.state.user)
    this.setState({ user: {email: '', password: ''}})
  }

  changeEmail(email){
    new_state = {email: email, password: this.state.user.password}
    this.setState({user: new_state})
  }

  changePassword(password){
    new_state = {email: this.state.user.email, password: password}
    this.setState({user: new_state})
  }
  */

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    const { navigation } = this.props;
    navigation.navigate('App');
  };

  render() {
    const { email, password } = this.state;
    const { navigation } = this.props;
    return (
      <React.Fragment>
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
            onPress={this._signInAsync}
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
