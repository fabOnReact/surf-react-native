import React, {Component} from 'react'
import { AppRegistry } from 'react-native'
import { connect } from 'react-redux'

import { actionCreators } from './authenticationRedux' 
import { Text } from 'react-native'
import Input from './Input'

const mapStateToProps = (state) => ({
  credentials: state.credentials,
})

class App extends Component {
  loginUser = (text) => {
    const {dispatch} = this.props
    dispatch(actionCreators.login(text))
  }
  
  render() {
    return (
      <React.Fragment>
        <Text>Welcome to React Native!</Text>
        <Text>Welcome to React Native!</Text>
        <Input placeholder={"Just a test"} onSubmitEditing={this.loginUser} />
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps) (App)
