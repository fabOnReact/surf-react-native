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
    // position: 'absolute',
    marginTop: has_notch ? 0 : 30,
    width: "100%",
  }, 
  forecast: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    backgroundColor: 'green',
    borderWidth: 2,
    borderColor: 'white', 
  }
})

      {/*
      <View style={{position: "absolute", top: 0}}>
        <View style={styles.flexbox}>
          <Image 
            source={require('../../images/down-cursor-black.png')}
            style={[
              { left: "15%", tintColor: swellColor },
              styles.icon, 
              { transform: [{ rotateZ: `${swellDirection}deg`}] } 
            ]}
          />
          <Image 
            source={require('../../images/down-arrow-black.png')}
            style={[ 
                { right: "15%", tintColor: windColor },
                styles.icon,
                { transform: [{ rotateZ: `${windDirection}deg`}] }
            ]}
          />
        </View>
        <Text style={[styles.shadowHeader, { position: "absolute", top: "87%", left: "25%" }]}>
          { swellDirectionInWord }
        </Text>
        <Text style={[styles.shadowHeader, { position: "absolute", top: "87%", right: "25%" }]}>
          { windDirectionInWord }
        </Text>
        <Text style={[styles.shadowHeader, { position: "absolute", top: "93%", left: "5%" }]}>
          @ { swellPeriod } seconds
        </Text>
        <Text style={[styles.shadowHeader, { position: "absolute", top: "93%", right: "5%" }]}>
          { optimal_wind != null && optimal_wind ? "offshore wind" : "onshore wind"  }
        </Text>
      </View>
      */}
