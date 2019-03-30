import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import type { User } from 'react-native-google-signin';
import { configureGoogleSignIn, getGoogleUser, createUser, errorMessage } from '../lib/api';

export default class GoogleButton extends Component<{}, State> {
  async componentDidMount() {
    configureGoogleSignIn();
  }

  success = (userInfo) => {
    const { email } = userInfo.user
    const { accessToken } = userInfo
    let body = JSON.stringify({ user: { email, accessToken } })
    createUser(this.props.saveCredentials, this.failure, body)
  }

  failure = (error) => {
    switch(error.code) {
      case statusCodes.SIGN_IN_CANCELLED: {
        this.props.setErrors({ error: 'Google Oauth Sign Up/In cancelled' })
        break
      }
      case statusCodes.IN_PROGRESS: {
        this.props.setErrors({ error: 'Google Oauth Sign In in progress' })
        break
      }
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE: {
        this.props.setErrors({ error: 'please install/update google play' })
        break
      }
      default: {
        errorMessage(error) 
      }
    }
  }

  signIn = () => {
    getGoogleUser(this.success, this.failure)
  }

  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          <GoogleSigninButton
            style={{ width: 212, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Auto}
            onPress={this.signIn}
          />
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
