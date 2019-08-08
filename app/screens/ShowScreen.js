import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { H1, H2, H3, H4 } from 'native-base';
import Tide from '../components/Tide';
import Waves from '../components/Waves';
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
import { styles } from './styles/ShowStyles';

export default class ShowScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('post').location.name,
    };
  };

  render() {
    const { navigation } = this.props;
    const post = navigation.getParam('post')
    const { latitude, longitude, tide, daily, hourly } = post.location
    const { swellHeight, waveHeight, windSpeed, windDirection, waveDirection } = hourly
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
          style={[ 
            styles.arrow, 
            { transform: [{ rotateZ: `${windDirection}deg`}] }
          ]}
          source={require('../images/down-arrow.png')} 
        />
        <Image 
          style={[
            styles.arrow,
            { transform: [{ rotateZ: `${waveDirection}deg`}] } 
          ]}
          source={require('../images/down-cursor.png')} 
        />
        <View style={styles.container}> 
          <H3>{ waveHeight } mt. waves</H3>
          <Image 
            source={require('../images/down-cursor-black.png')}
            style={[
              styles.icon, 
              { transform: [{ rotateZ: `${waveDirection}deg`}] } 
            ]}
          />
          <H3>{ windSpeed } m/s wind</H3>
          <Image 
            source={require('../images/down-arrow-black.png')}
            style={[ 
                styles.icon,
                { transform: [{ rotateZ: `${windDirection}deg`}] }
            ]}
          />
        </View>
        <Tide />
      </React.Fragment>
    )
  }
}
