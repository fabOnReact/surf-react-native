import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet }  from 'react-native';
import Cameras from './Cameras';
import Dimensions from 'Dimensions';
import CamButton from '../buttons/CamButton';
import { Header } from 'react-navigation';

export default class Location extends Component {
  get attributes() {
    const { location: { data: { attributes }}} = this.props
    return attributes
  }

  get forecastInfo() {
    const { forecast_info } = this.attributes
    return forecast_info
  }

  get hourly() {
    const { hourly } = this.forecastInfo
    return hourly
  }

  get swellHeight() {
    const { swellHeight } = this.hourly
    return swellHeight
  }

  get name() {
    const { name } = this.attributes
    return name
  }
  
  get title() {
    if (!!this.swellHeight) { 
      return `${this.swellHeight} mt. at ${this.name}`
    }
  }

  navigateToForecast = () => {
    const { navigation, location } = this.props
    if(!!this.swellHeight) {
      navigation.navigate('Forecast', { location: location })
    }
  }

  render() {
    const { cameras, changeCamera } = this.props
    const { location: { data: { attributes }}} = this.props
    const previews = cameras
    previews.length = 5
    return (
      <React.Fragment>
        <TouchableOpacity
          onPress={this.navigateToForecast}
          style={[styles.full_screen]}>
          <View
            style={[
              styles.full_screen, 
              styles.flex_evenly,
            ]}>
            {
              previews.map((camera, index) => 
                <CamButton 
                  key={index}
                  index={index}
                  action={changeCamera} />
              )
            }
          </View>
          <Text 
            style={styles.header}>
              { this.title }
          </Text>
        </TouchableOpacity>
      </React.Fragment>
    )
  }
}

export const styles = StyleSheet.create({
  full_screen: {
    position: 'absolute',
    top:0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  flex_evenly: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
    zIndex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  header: {
    position: 'absolute',
    top: 0,
    width: Dimensions.get('window').width,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    textShadowColor: 'rgb(0, 0, 0)',
    textShadowOffset: {width: -2, height: 2},
    textShadowRadius: 1,
    textAlign: 'center',
    marginBottom: 5,
  }, 
})
