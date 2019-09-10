import React from 'react';
import { View, Image } from 'react-native';
import { H3 } from 'native-base';
import { styles } from './styles/ForecastStyles';

export default function ForecastHourly(props) {
  const { forecast_info } = props
  const { hourly } = forecast_info
  const { tide_data } = forecast_info
  const { waveHeight, windSpeed, windDirection, waveDirection } = hourly
  return (
    <View style={styles.container}> 
      <H3 style={[styles.shadowHeader, styles.header]}>
        { waveHeight } mt. waves
      </H3>
      <Image 
        source={require('../images/down-cursor-black.png')}
        style={[
          styles.icon, 
          { transform: [{ rotateZ: `${waveDirection}deg`}] } 
        ]}
      />
      <H3 style={[styles.shadowHeader, styles.header]}>
        { windSpeed } m/s wind
      </H3>
      <Image 
        source={require('../images/down-arrow-black.png')}
        style={[ 
            styles.icon,
            { transform: [{ rotateZ: `${windDirection}deg`}] }
        ]}
      />
    </View>
  )
}
