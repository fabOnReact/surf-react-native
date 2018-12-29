import React, { Component } from 'react'
import { StyleSheet, Text, ActivityIndicator, View } from 'react-native'

export default class HomeScreen extends Component {
  state = { signedIn: false }

  componentDidMount() {
    this.props.navigation.navigate(this.state.signedIn ? 'Main' : 'SignUp')
  }

  render() {
    return(
      <React.Fragment>
        <View style={styles.container}>
          <Text>Loading</Text>
          <ActivityIndicator size="large" />
        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
