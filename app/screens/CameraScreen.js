import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Dimensions from 'Dimensions';
import ErrorMessage from '../components/ErrorMessage'
import Tutor from '../components/Tutor';
import Recorder from '../components/Recorder';
import ZoomView from '../components/ZoomView';

export default class CameraScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'rgba(0,0,0,0.0)',
    },
    headerTintColor: 'white',
    headerTransparent: true,
  };

  constructor(props) {
    super(props)
    this.state = { tutor: true, zoom: '' }
  }

  hideTutor = () => {
    AsyncStorage.setItem('tutor', "false")
    this.setState({ tutor: false })
  }

  render() {
    const { errors, tutor } = this.state
    return (
      <View style={styles.container}>
        { errors ? <ErrorMessage styles={{marginTop: 100}} message={errors} /> : null }
        {tutor ? <Tutor hide={this.hideTutor} /> : <Recorder />}
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});
