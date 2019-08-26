import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { H1, H2, H3, H4 } from 'native-base';
import { styles } from './styles/ForecastStyles';

export default class ForecastHourly extends Component { 
  render() {
    const { hourly } = this.props.forecast_info
    const { tide_data } = this.props.forecast_info
    const { waveHeight, windSpeed, windDirection, waveDirection } = hourly
    return (
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}
