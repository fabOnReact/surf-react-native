import React, { Component } from 'react';
import { View, Text, StatusBar, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Spinner from 'react-native-loading-spinner-overlay';
import Swiper from 'react-native-swiper';
import Posts from '../components/Posts';

export default class MainScreen extends Component {
  state = { spinner: true };

  pageIsLoaded = () => { 
    this.setState({ spinner: false }) 
  }

  _iosPosts() {
    return ( 
      <SafeAreaView style={{flex:1}}>
        <Posts navigation={this.props.navigation} loaded={this.pageIsLoaded} />
      </SafeAreaView>
    )
  }

  render() {
    const ios10 = Platform.OS === 'ios'
    return (
      <React.Fragment>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        { ios10 ? this._iosPosts() : <Posts navigation={this.props.navigation} loaded={this.pageIsLoaded} /> } 
      </React.Fragment>
    )
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
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
