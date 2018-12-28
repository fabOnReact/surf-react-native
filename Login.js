import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from './redux/actions'
import { View } from 'react-native'
import { Input, Button } from 'react-native-elements'

class Login extends Component {
  constructor(props){
    super(props)
    this.state = {input: ''}
  }

  login = () => {
    this.props.login(this.state.input)
    this.setState({ input: '' })
  }

  render() {
    return(
      <React.Fragment>
        <View>
          <Input onChangeText={(text) => this.setState({input: text})} value={this.state.input} />
          <Button onPress={this.login} 
              buttonStyle={[{ marginBottom: 5, marginTop: 5 }]}
              title="Login"/>
          </View>
      </React.Fragment>
    )
  }
}

export default connect(null, { login }) (Login)
