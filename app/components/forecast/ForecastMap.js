import React, { Component } from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { H3, Card, CardItem, Text, Left, Body } from 'native-base';
import { Header } from 'react-navigation';
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
import Chart from './Chart';
// import { styles } from '../styles/ForecastMapStyles';

export default class ForecastMap extends Component {
  constructor(props) {
    super(props)
    this.state = { height: this.height / 2 }
  }

  render() {
    const { location } = this.props
    const height = Dimensions.get('window').height / 2
    var new_width = width - 20
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
            <Image 
              resizeMode="cover"
              // style={[{width: width - 20}, styles.map]}
              style={[{height: height}, styles.map]}
              source={{uri: uri}} 
            />
            <Image 
              style={[ 
                styles.arrow, 
                this.dimensions,
                { transform: [{ rotateZ: `${windDirection}deg`}] }
              ]}
              source={require('../../images/down-arrow.png')} 
            />
            <Image 
              style={[
                styles.arrow,
                this.dimensions,
                { transform: [{ rotateZ: `${waveDirection}deg`}] } 
              ]}
              source={require('../../images/down-cursor.png')} 
            />
        {/*
          <H3 style={{ textAlign: 'center', marginTop: 30 }}>Next 24h Tide mt.</H3>
        */}
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
    // height: 500,
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
