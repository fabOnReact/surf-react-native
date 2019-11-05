import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Swell from '../forecast/Swell';
import Wind from '../forecast/Wind';
import Arrow from '../icons/Arrow';
import DeviceInfo from 'react-native-device-info';
import { header } from '../forecast/styles';

export default class Hourly extends Component {
  renderHourly(hourly) {
    const { 
      waveHeight, swellHeight, swellPeriod, 
      optimal_swell, swellDirection, swellDirectionInWord, 
      windSpeed, windDirection, optimal_wind, windDirectionInWord,
    } = hourly
    return (
      <React.Fragment>
        <Swell
          period={swellPeriod} 
          swellHeight={swellHeight} 
          styles={[
            header.text,
            header.shadowHeader,
          ]}
        />
        <Wind 
          windSpeed={windSpeed}
          styles={[
            header.text,
            header.shadowHeader, 
          ]}
        />
      </React.Fragment>
    )
  }

  render() {
    const { location} = this.props
    const { name, forecast_info: { hourly, tide_data }} = location
    const { swellHeight } = hourly
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Text style={[
            header.shadowHeader,
            header.text,
          ]}>
            { name }
          </Text>
          { !!swellHeight && this.renderHourly(hourly) }
        </View>
      </React.Fragment>
    )
  }
}

const has_notch = DeviceInfo.hasNotch()
export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: has_notch ? 0 : 30,
    width: "100%",
    zIndex: 4,
    height: 100,
  }, 
})
