import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from './redux/actions'
import { View, TextInput } from 'react-native'
import { Input, Button } from 'react-native-elements'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {user: {email: '', password: ''}}
  }

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

  render() {
    return(
      <React.Fragment>
        <View>
          <Input
            onChangeText={(email) => this.changeEmail(email)}
            value={this.state.user.email} />
          <Input
            onChangeText={(password) => this.changePassword(password)}
            value={this.state.user.password} />
          <Button onPress={this.login} 
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              title="Login"/>
          </View>
      </React.Fragment>
    )
  }
}

export default connect(null, { login }) (Login)
