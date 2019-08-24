import React, { Component } from 'react';
import { Image } from 'react-native';
import { styles } from './styles/ForecastMapStyles';
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';

export default class ForecastMap extends Component {
  render() {
    const { latitude, longitude, forecast_info } = this.props.location
    const { windDirection, waveDirection } = forecast_info.hourly
    const host = "https://maps.googleapis.com/maps/api/staticmap"
    const options = "zoom=11&&size=400x300&maptype=satellite"
    const uri = `${host}?center=${latitude},${longitude}&${options}&markers=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
    return (
      <React.Fragment>
        <Image 
          style={{width: 400, height: 300}}
          source={{uri: uri}} 
        />
        <Image 
          style={[ 
            styles.arrow, 
            { transform: [{ rotateZ: `${windDirection}deg`}] }
          ]}
          source={require('../images/down-arrow.png')} 
        />
        <Image 
          style={[
            styles.arrow,
            { transform: [{ rotateZ: `${waveDirection}deg`}] } 
          ]}
          source={require('../images/down-cursor.png')} 
        />
      </React.Fragment>
    )
  }
}
