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
    const swellIcon = require('../../images/down-cursor-black.png')
    const windIcon = require('../../images/down-arrow-black.png')
    return (
      <React.Fragment>
        <View style={styles.container}>
          <Arrow
            offshore={optimal_swell}
            direction={swellDirection}
            icon={swellIcon} />
          <Swell
            period={swellPeriod} 
            swellHeight={swellHeight} 
            styles={[
              { marginLeft: 10 },
              header.shadowHeader,
            ]}
          />
          <Wind 
            windSpeed={windSpeed}
            styles={[
              { marginLeft: 10 },
              header.shadowHeader,
            ]}
          />
          <Arrow
            offshore={optimal_wind}
            direction={windDirection}
            icon={windIcon}
          />
        </View>
      </React.Fragment>
    )
  }

  render() {
    const {hourly } = this.props
    const { swellHeight } = hourly
    return (
      <React.Fragment>
        { !!swellHeight && this.renderHourly(hourly) }
      </React.Fragment>
    )
  }
}

const has_notch = DeviceInfo.hasNotch()
export const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: 'absolute',
    top: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 15,
  }, 
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
