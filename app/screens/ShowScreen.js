import React, { Component } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Cameras from '../components/index/Cameras';

export default class ShowScreen extends Component {
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
  state = { location: undefined };

  componentDidMount = () => {
    const { navigation } = this.props
    const location = navigation.getParam('location')
    this.setState({ location }) 
  }

  render() {
    const { navigation } = this.props
    const { location } = this.state
    const location_present = location != undefined
    return (
      <React.Fragment>
        <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        { 
            location_present && <Cameras 
              locations={[]}
              location={location} 
              navigation={navigation}
            />
        }
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});
