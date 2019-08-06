import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
import { styles } from './styles/ShowStyles';

export default class ShowScreen extends Component {
  render() {
    const { navigation } = this.props;
    const post = navigation.getParam('post')
    const { latitude, longitude, forecast } = post.location
    const { windDirection, waveDirection } = forecast
    const host = "https://maps.googleapis.com/maps/api/staticmap"
    const options = "zoom=11&&size=300x300&maptype=satellite"
    const uri = `${host}?center=${latitude},${longitude}&${options}&key=${GOOGLE_MAPS_API_KEY}`
    return (
      <React.Fragment>
        <Image 
          style={{width: 400, height: 400}}
          source={{uri: uri}} 
        />
        <Image 
          style={{
            position: "absolute", 
            top: 0, 
            left: 0,
            width: 200, 
            height: 200,
            marginTop: 100,
            marginBottom: 100,
            marginLeft: 100,
            marginRight: 100,
            transform: [{ rotateZ: `${windDirection}deg`}],
          }}
          source={require('../images/down-arrow.png')} 
        />
        <Image 
          style={{
            position: "absolute", 
            top: 0, 
            left: 0,
            width: 200, 
            height: 200,
            marginTop: 100,
            marginBottom: 100,
            marginLeft: 100,
            marginRight: 100,
            transform: [{ rotateZ: `${waveDirection}deg`}],
          }}
          source={require('../images/down-cursor.png')} 
        />
      </React.Fragment>
    )
  }
}
