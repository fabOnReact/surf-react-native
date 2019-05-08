import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { GoogleSigninButton, statusCodes } from 'react-native-google-signin';
// import type { User } from 'react-native-google-signin';
import { configureGoogleSignIn, getGoogleUser, createUser } from '../lib/api';
import { errorMessage } from '../lib/support';

export default class GoogleButton extends Component {
  async componentDidMount() {
    configureGoogleSignIn();
  }

  success = (userInfo) => {
    const { saveCredentials } = this.props
    const { email } = userInfo.user
    const { accessToken } = userInfo
    let body = JSON.stringify({ user: { email, accessToken } })
    createUser(saveCredentials, this.failure, body)
  }

  failure = (error) => {
    const { setErrors } = this.props
    switch(error.code) {
      case statusCodes.SIGN_IN_CANCELLED: {
        setErrors({ error: 'Google Oauth Sign Up/In cancelled' })
        break
      }
      case statusCodes.IN_PROGRESS: {
        setErrors({ error: 'Google Oauth Sign In in progress' })
        break
      }
      case statusCodes.PLAY_SERVICES_NOT_AVAILABLE: {
        setErrors({ error: 'please install/update google play' })
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
