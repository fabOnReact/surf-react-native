import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';

export default class Current extends Component {
  render() {
    const { hourly } = this.props
    const { 
      waveHeight, swellHeight, swellPeriod, 
      optimal_swell, swellDirection, swellDirectionInWord, 
      windSpeed, windDirection, optimal_wind, windDirectionInWord,
    } = hourly
    var windColor = swellColor = "white"
    if (optimal_wind != null) { windColor = optimal_wind ? "#27ae60" : "#e67e22" }
    if (optimal_swell != null) { swellColor = optimal_swell ? "#27ae60" : "#e67e22" }

    return (
      <View>
        <View style={styles.flexbox}>
          <Text style={[
              { left: 0, position: "absolute", top: '81%', }, 
              styles.shadowHeader, styles.header
          ]}>
              { waveHeight } mt. waves
          </Text>
          <Text style={[
            { right: 0, position: "absolute", top: '81%', }, 
            styles.shadowHeader, 
            styles.header
          ]}>
            { windSpeed } m/s wind
          </Text>
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
    )
  }
}

const height = Dimensions.get("window").height
const width = Dimensions.get("window").width
export const styles = StyleSheet.create({
  flexbox: {
    display: 'flex',
    flex: 1,
    height: height,
    width: width,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  overlayText: {
    fontSize: 30,
  },
  header: {
    marginLeft: 30,
    marginRight: 30,
  },
  icon : { 
    position: "absolute",
    top: "86%",
    height: 30, 
    width: 30, 
  }
})
