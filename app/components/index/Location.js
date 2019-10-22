import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet }  from 'react-native';
import Cameras from './Cameras';
import Dimensions from 'Dimensions';
import CamButton from '../buttons/CamButton';
import { Header } from 'react-navigation';
// import ForecastInfo from './ForecastInfo';

export default class Location extends Component {
  forecastScreen = () => {
    const { navigation } = this.props
    const { location } = this.props
    const { data: { attributes: location_attributes }} = location
    // if (forecast_info) { 
    //   navigation.navigate('Forecast', { location: location_attributes }) 
    // }
  }

  get forecastInfo() {
    const { data: { forecast_info }} = this.props
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
    const { data: { name }} = this.props
    return name
  }
  
  get title() {
    if (!!this.swellHeight) { 
      return `${this.swellHeight} mt. at ${this.name}`
    }
  }

  render() {
    const { data, cameras, changeCamera } = this.props
    return (
      <React.Fragment>
        <View
          style={styles.button_container}>
          {
            cameras.map((camera, index) => 
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
      </React.Fragment>
    )
  }
}

export const styles = StyleSheet.create({
  button_container: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left:0,
    bottom:0,
    right:0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-evenly',
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
