import React, { Component } from 'react';
import { Dimensions, StatusBar, StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import ErrorMessage from '../components/ErrorMessage'
import Tutor from '../components/camera/Tutor';
import Recorder from '../components/camera/Recorder';
import ZoomView from '../components/camera/ZoomView';

export default class CameraScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTintColor: 'white',
      headerTransparent: true,
      headerStyle: { 
        backgroundColor: 'rgba(0,0,0,0.0)',
        marginTop: StatusBar.currentHeight,
      },
    }
  }

  constructor(props) {
    super(props)
    const { navigation } = this.props
    this.credentials = navigation.getParam('credentials')
    this.state = { tutor: true, zoom: '' }
  }

  hideTutor = () => {
    AsyncStorage.setItem('tutor', "false")
    this.setState({ tutor: false })
  }

  render() {
    const { errors, tutor, location } = this.state
    return (
      <View style={styles.container}>
        { errors ? <ErrorMessage styles={{marginTop: 100}} message={errors} /> : null }
        { tutor ? <Tutor hide={this.hideTutor} /> : <Recorder location={location} credentials={this.credentials} /> }
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
