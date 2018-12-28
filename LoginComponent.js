import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'

const mapStateToProps = (state) => ({
  user: state.user,
})

class LoginComponent extends Component {
  constructor(props){
    super(props)
    this.state = { user: '' }
  }

  loginUser = (text) => {
    const {dispatch} = this.props
    dispatch(actionAuthentication.login(text))
  }

  handleSubmit() {
    const { user } = this.state
    loginUser({ user })
  }

  render() {
    return (
      <React.Fragment>
        <View style={{flexDirection: 'column', height: 500, padding:20,}}>
          <Text h4>Login</Text>
          <Input placeholder="your email" 
            onChangeText={ (text) => this.setState({user: text}) }
            value={this.state.user}/>
          <Button onPress={this.handleSubmit} 
            buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
            title="Login"/>
        </View>
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({})

export default connect(mapStateToProps) (LoginComponent)
