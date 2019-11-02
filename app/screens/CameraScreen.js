import React, { Component } from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Dimensions from 'Dimensions';
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
    this.state = { tutor: true, zoom: '' }
  }

  componentDidMount = async () => {
    const { navigation } = this.props
    const location = await navigation.getParam('locations')[0]
    this.setState({ location })
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
        { tutor ? <Tutor hide={this.hideTutor} /> : <Recorder location={location}/> }
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
