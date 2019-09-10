import React, { Component } from 'react';
import { Image, View, Text } from 'react-native';
import { styles } from './styles/TableViewStyles';

export default class TableView extends Component {

  renderHeader(i) {
    const text = ["SURF", "SWELL", "WIND"][i]
    const classes = [styles.surf, styles.swell, styles.wind]
    return (
      <View style={[classes[i]]} key={i}>
        <Text style={styles.headerText}>
          { text }
        </Text>
      </View>
    )
  }

  renderForecast(i) {
    const { days, waveHeight, 
      waveDirection, swellHeight, 
      swellPeriod, swellDirection, 
      optimal_swell, windSpeed, 
      windDirection, optimal_wind
    } = this.props.daily
    var windColor = optimal_wind[i] ? "#27ae60" : "#e67e22"
    var swellColor = optimal_swell[i] ? "#27ae60" : "#e67e22"
    var windIconColor = swellIconColor = "white"
    if (optimal_wind[i] == null) { 
      windColor = "#ffffff" 
      windIconColor = "black"
    }
    if (optimal_swell[i] == null) { 
      swellColor = "#ffffff" 
      swellIconColor = "black"
    }

    return (
      <React.Fragment key={i}>
        <View style={[styles.subHeader]}>
          <Text style={styles.subHeaderText}>
            { days[i].toUpperCase() }
          </Text>
        </View>
        <View style={[styles.row]}>
            <View style={[styles.surf]}>
              <Text style={{ width: "100%", textAlign: "center"}}>
                  { waveHeight[i] }mt.
              </Text>
            </View>
            <View style={styles.swell}>
              <View style={[styles.forecastContainer]}>
                <Text>
                    { swellHeight[i] } mt.@
                    { swellPeriod[i] }s   
                </Text>
                <View 
                  style={[
                    { backgroundColor: swellColor }, 
                    styles.arrowContainer
                  ]}>
                  <Image 
                    source={require('../images/down-cursor-black.png')}
                    style={[
                      { tintColor: swellIconColor },
                      styles.icon, 
                      { transform: [{ rotateZ: `${swellDirection[i]}deg`}] } 
                    ]}
                  />
                </View>
              </View>
            </View>
            <View style={[styles.wind]}>
              <View style={styles.forecastContainer}>
                <Text>
                    { windSpeed[i] } mt/s.   
                </Text>
                <View style={[
                  { backgroundColor: windColor },
                  styles.arrowContainer
                ]}>
                  <Image 
                    source={require('../images/down-cursor-black.png')}
                    style={[
                      { tintColor: windIconColor }, 
                      styles.icon, 
                      { transform: [{ rotateZ: `${windDirection[i]}deg`}] } 
                    ]}
                  />
                </View>
              </View>
            </View>
        </View>
      </React.Fragment>
    )
  }

  render() {
    const { daily } = this.props
    const { days } = daily
    this.columns = ["20%", "40%", "40%"]
    return (
      <View styles={styles.container}>
        <View style={[styles.row, styles.headerRow]}>
          { [...Array(3)].map((_, i) => this.renderHeader(i) ) }
        </View>
          { [...Array(days.length)].map((_, i) => this.renderForecast(i) ) }
      </View>
    )
  }
}
