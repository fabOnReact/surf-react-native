import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { sessionSettings, userSettings } from '../lib/support'

export default class SignInButton extends Component {
  state = { signUpScreen: false };

  changeForm = () => {
    const { signUpScreen } = this.state
    this.setState({ signUpScreen: !signUpScreen })
  }

  renderSubmit = () => {
    const { submitForm } = this.props
    const { signUpScreen } = this.state
    const title = signUpScreen ? "Sign Up" : "Sign In"
    const settings = signUpScreen ? userSettings : sessionSettings
    return (
      <Button
        title={title}
        onPress={() => submitForm(settings) }
        buttonStyle={styles.button}
      />
    )
  }

  renderLink = () => {
    const { signUpScreen } = this.state
    const title = signUpScreen ? "Already a User? Sign In!" : "Not a User? Sign Up!"
    return (
      <Button
        title={title}
        onPress={this.changeForm}
        buttonStyle={styles.button}
      />
    )
  }


  render() {
    return (
      <React.Fragment>
        { this.renderSubmit() }
        { this.renderLink() }
      </React.Fragment>
    );
  }
}

export const styles = StyleSheet.create({
  button: {
    width: 220,
    height: 50,
  },
});
