import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { H3, Card, CardItem, Text, Left, Body } from 'native-base';
import { Header } from 'react-navigation';
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
import Chart from './Chart';
import RoundDisplayButton from '../buttons/RoundDisplayButton';

export default class ForecastMap extends Component {
  navigateToMap = () => {
    const { navigation, location } = this.props
    const { latitude, longitude } = location
    navigation.navigate("Map", { lat: latitude, lon: longitude })
  }

  render() {
    const { location } = this.props
    const { latitude, longitude, forecast_info } = location
    const { windDirection, waveDirection } = forecast_info.hourly
    const host = "https://maps.googleapis.com/maps/api/staticmap"
    const options = "zoom=11&&size=1200x900&maptype=satellite"
    const uri = `${host}?center=${latitude},${longitude}&${options}&markers=${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`
    const { tide } = forecast_info
    var { hours, seaLevels } = tide
    hours  = hours.map(date => new Date(date).getHours()).filter(hour => hour % 3 == 0) 
    return (
      <React.Fragment>
        <TouchableOpacity
          onPress={this.navigateToMap}>
          <Image 
            resizeMode="cover"
            style={[styles.map]}
            source={{uri: uri}} 
          />
          <Image 
            style={[ 
              styles.arrow, 
              { transform: [{ rotateZ: `${windDirection}deg`}] }
            ]}
            source={require('../../images/down-arrow.png')} 
          />
          <Image 
            style={[
              styles.arrow,
              { transform: [{ rotateZ: `${waveDirection}deg`}] } 
            ]}
            source={require('../../images/down-cursor.png')} 
          />
        </TouchableOpacity>
        <RoundDisplayButton 
          action={this.navigateToMap} />
        <H3 style={{ textAlign: 'center', marginTop: 30 }}>Next 24h Tide mt.</H3>
        <Chart values={seaLevels} labels={hours} bezier={false} margin={50} />
      </React.Fragment>
    )
  }
}

const width = Dimensions.get('window').width - 20
const length = 200
const horizontalMargin = (width - length)/2
const verticalMargin = (500 - length)/2
const styles = StyleSheet.create({
  map: {
    height: 500,
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    borderColor: '#e6e6e6',
    borderWidth: .5,
  },
  arrow: {
    position: "absolute", 
    top: 0,
    left: 0,
    width: length, 
    height: length, 
    marginLeft: horizontalMargin,
    marginRight: horizontalMargin,
    marginTop: verticalMargin,
    marginBottom: verticalMargin,
  },
})
