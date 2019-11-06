import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, View, Button, TextInput, Text } from 'react-native';
import api from '../lib/api';
import Validator from '../lib/validator';


export default class FlagScreen extends Component {
  constructor(props) {
    super(props)
    this.state = { email: "", reason: "", errors: false, errorMessage: "" }
  }

  componentDidMount() {
    const { navigation } = this.props
    this.post = navigation.getParam("post")
    this.validator = new Validator(this.params)
  }

  componentDidUpdate = async (prevProp, prevState) => {
    const { email, reason } = this.state
    const email_changed = prevState.email != email
    const reason_changed = prevState.reason != reason
    const form_changed = email_changed || reason_changed
    if (form_changed) { 
      this.validator.params = this.params
    }
  }

  get params() {
    const { email, reason } = this.state
    return {
      post: {
        reported: true,
        email,
        reason,
      }
    }
  }

  onChangeEmail = (new_email) => {
    this.setState({ email: new_email })
  }

  onChangeReason = (new_reason) => {
    this.setState({ reason: new_reason })
  }

  updatePost = () => {
    const { id } = this.post
    const { email, reason } = this.state
    if (this.validator.valid) {
      this.setState({ errors: false, errorMessage: "" })
      api.updatePost(id, this.params)
    } else {
      const errorMessage = this.validator.errors
      this.setState({ errors: true, errorMessage })
    }
  }

  render() {
    const { email, reason, errors, errorMessage } = this.state
    const borderColor = errors ? styles.error : styles.normal
    return (
      <View style={styles.container}>
        { errors && 
          <Text
            style={[
              styles.errorMessage,
              styles.input,
              { borderColor: 'red' },
            ]}
            hidden >
            { errorMessage }
          </Text>
        }
        <TextInput
          style={[
            styles.input,
            styles.email,
            borderColor
          ]}
          placeholder="Your Email" 
          placeholderTextColor={"black"}
          autoCompleteType="email"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={text => this.onChangeEmail(text)}
          value={email}
        />
        <TextInput
          style={[
            styles.input,
            styles.text,
            borderColor
          ]}
          multiline
          placeholder="Please explain why you want the video removed" 
          placeholderTextColor={"black"}
          onChangeText={text => this.onChangeReason(text)}
          value={reason}
        />
        <Button
          title="submit"
          onPress={this.updatePost} />
      </View>
    )
  }
}

export const styles = StyleSheet.create({
  container: {
  }, 
  input: {
    borderWidth: .7,
    margin: 20,
    padding: 10,
  },
  email: {
    height: 50,
  },
  text: { 
    height: "30%",
    textAlignVertical: 'top',
  },
  error: {
    borderColor: 'red',
  },
  normal: {
    borderColor: '#999999',
  },
  errorMessage: {
    color: 'red',
    fontWeight: "600",
  }
})
