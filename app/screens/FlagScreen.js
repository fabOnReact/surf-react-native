import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, View, Button, TextInput, Text } from 'react-native';
import Api from '../lib/api';
import Validator from '../lib/validator';


export default class FlagScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Flag Post',
    };
  };

  constructor(props) {
    super(props)
    this.state = { email: "", flag_reason: "", password: "", errors: false, errorMessage: "" }
    this.api = new Api()
  }

  componentDidMount() {
    const { navigation } = this.props
    this.post = navigation.getParam("post")
    this.validator = new Validator(this.params)
  }

  componentDidUpdate = async (prevProp, prevState) => {
    const { email, flag_reason } = this.state
    const email_changed = prevState.email != email
    const reason_changed = prevState.flag_reason != flag_reason
    const form_changed = email_changed || reason_changed
    if (form_changed) { 
      this.validator.params = this.params
    }
  }

  get params() {
    const { email, flag_reason, password } = this.state
    return {
      post: {
        email,
        flag_reason,
        reported: 'true',
      },
      password
    }
  }

  onChangeEmail = (new_email) => this.setState({ email: new_email })
  onChangeReason = (new_reason) => this.setState({ flag_reason: new_reason })
  onChangePassword = (new_password) => this.setState({ password: new_password })

  updatePost = async () => {
    const { id } = this.post
    if (this.validator.valid) {
      const response = await this.api.updatePost(id, this.params)
    } else {
      const errorMessage = this.validator.errors
      this.setState({ errors: true, errorMessage })
    }
  }

  render() {
    const { email, flag_reason, errors, errorMessage, password } = this.state
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
          placeholderTextColor={"#a6a6a6"}
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
          // multiline
          placeholder="EXPLANATION - Please explain" 
          placeholderTextColor={"#a6a6a6"}
          onChangeText={text => this.onChangeReason(text)}
          value={flag_reason}
        />
        <TextInput
          style={[
            styles.input,
            styles.email,
            borderColor
          ]}
          placeholder="OPTIONAL - FOR ADMINISTRATORS ONLY" 
          placeholderTextColor={"#a6a6a6"}
          keyboardType="number-pad"
          autoCapitalize="none"
          onChangeText={password=> this.onChangePassword(password)}
          value={password}
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
    height: "15%",
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
