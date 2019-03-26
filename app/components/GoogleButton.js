import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import type { User } from 'react-native-google-signin';
// import { WEB_CLIENT_ID, IOS_CLIENT_ID } from 'react-native-dotenv'
import { configureGoogleSignIn, getGoogleUser } from '../lib/api';

// type ErrorWithCode = Error & { code?: string };

type State = { 
  // error: ?ErrorWithCode,
  userInfo: ?User,
};

export default class GoogleButton extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: null,
      // error: null,
    };
  }

  async componentDidMount() {
    configureGoogleSignIn();
    // await this._getCurrentUser();
  }

  success = (userInfo) => {
    // this.setState({ userInfo, error: null })
    // refactor method saveCredentials in SignUp/InScreen
    createUser(saveCredentials, failure, body)
  }

  failure = (error) => {
    console.warn(error)
    // this.props.errors = error
  }

  signIn = () => {
    getGoogleUser(this.success, this.failure)
  }

  //  _signIn = async () => {
  //    try {
  //      await GoogleSignin.hasPlayServices();
  //      const userInfo = await GoogleSignin.signIn();
  //      this.setState({ userInfo, error: null });
  //    } catch (error) {
  //      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //        Alert.alert('cancelled');
  //      } else if (error.code === statusCodes.IN_PROGRESS) {
  //        Alert.alert('in progress');
  //      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //        Alert.alert('play services not available or outdated');
  //      } else {
  //        Alert.alert('Something went wrong', error.toString());
  //        this.setState({
  //          error,
  //        });
  //      }
  //    }
  //  };

  _signOut = async () => {
    try { 
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      this.setState({ userInfo: null });
    } catch (error) {
      //      this.setState({
      //        error,
      //      });
    }
  };

  //  _configureGoogleSignIn() {
  //    GoogleSignin.configure({
  //      scopes: ['email', 'profile'],
  //      webClientId: WEB_CLIENT_ID,
  //      offlineAccess: true,
  //      iosClientId: IOS_CLIENT_ID
  //    });
  // }

  //  async _getCurrentUser() {
  //    try {
  //      const userInfo = await GoogleSignin.signInSilently();
  //      this.setState({ userInfo, error: null });
  //    } catch (error) {
  //      const errorMessage =
  //        error.code === statusCodes.SIGN_IN_REQUIRED ? 'Please sign in :)' : error.message;
  //      this.setState({
  //        error: new Error(errorMessage),
  //      });
  //    }
  //  }

  //  renderUserInfo(userInfo) {
  //    console.warn(JSON.stringify(userInfo))
  //    return (
  //      <View style={styles.container}>
  //        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
  //          Welcome {userInfo.user.name}
  //        </Text>
  //        <Text>Your server auth code: {JSON.stringify(userInfo.serverAuthCode)}</Text>
  //
  //        <Button onPress={this._signOut} title="Log out" />
  //      </View>
  //    );
  //  }

  renderIsSignedIn() {
    return (
      <Button
        onPress={async () => {
          const isSignedIn = await GoogleSignin.isSignedIn();
          Alert.alert(String(isSignedIn));
        }}
        title="is user signed in?"
      />
    );
  }

  //  renderSignInButton() {
  //    return (
  //      <View style={styles.container}>
  //        <GoogleSigninButton
  //          style={{ width: 212, height: 48 }}
  //          size={GoogleSigninButton.Size.Wide}
  //          color={GoogleSigninButton.Color.Auto}
  //          onPress={this._signIn}
  //        />
  //        {this.renderError()}
  //      </View>
  //    );
  //  }

  renderError() { 
    const { error } = this.state;
    if (!error) {
      return null;
    }
    const text = `${error.toString()} ${error.code ? error.code : ''}`;
    return <Text>{text}</Text>;
  }

  render() {
    // const { userInfo } = this.state;

    return (
      <React.Fragment>
        <View style={styles.container}>
          <GoogleSigninButton
            style={{ width: 212, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Auto}
            onPress={this.signIn}
          />
          {this.renderError()}
          <Button onPress={this._signOut} title="Log out" />
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
