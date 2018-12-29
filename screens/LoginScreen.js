import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../redux/actions'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
//import { Input, Button } from 'react-native-elements'

export default class Login extends Component {
  state = {email: '', password: '', errorMessage: null }

  //login = () => {
  //  this.props.login(this.state.user)
  //  this.setState({ user: {email: '', password: ''}})
  //}

  //changeEmail(email){
  //  new_state = {email: email, password: this.state.user.password}
  //  this.setState({user: new_state}) 
  //}

  //changePassword(password){
  //  new_state = {email: this.state.user.email, password: password}
  //  this.setState({user: new_state})
  //}

  render() {
    return(
      <React.Fragment>
        <View style={styles.container}>
          <Text>Login</Text>
          {this.state.errorMessage && 
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
            <TextInput
              style={style.textInput}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email} />
            <TextInput 
              secureTextEntry
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Password"
              onChangeText={password => this.setState({ password })}
              value={this.state.password} />
            <Button title="Login" onPress={this.handleLogin} />
            <Button title="Don't have an account? Sign Up"
              onPress={() => this.props.navigation.navigate('SignUp')} />
          </View>
          {/*
          <Input
            onChangeText={(email) => this.changeEmail(email)}
            value={this.state.user.email} />
          <Input
            onChangeText={(password) => this.changePassword(password)}
            value={this.state.user.password} />
          <Button onPress={this.login} 
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              title="Login"/>
              */}
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})

//export default connect(null, { login }) (Login)
