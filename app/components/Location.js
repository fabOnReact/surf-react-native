import React, { Component } from 'react';
import { TouchableOpacity }  from 'react-native';
import Cam from './Cam';

export default class Location extends Component {
  forecastScreen = () => {
    const { navigation } = this.props
    const { location } = this.props
    const { data: { attributes: location_attributes }} = location
    // if (forecast_info) { 
    //   navigation.navigate('Forecast', { location: location_attributes }) 
    // }
  }

  render() {
    const { data } = this.props
    const { included: cameras } = data
    const { attributes } = data
    return (
      <TouchableOpacity 
        onPress={this.foreastScreen}>
        { 
          cameras.map(camera => 
            <Cam 
              key={camera.id}
              data={camera} />
          )
        }
        {/*
          <ForecastInfo location={location} style={absolute} />
        */}
      </TouchableOpacity>
    )
  }
}
