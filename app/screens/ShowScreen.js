import React, { Component } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { H1, H2, H3, H4 } from 'native-base';
import Chart from '../components/Chart';
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
import { styles } from './styles/ShowStyles';
import { posts_fixtures } from '../../test/fixtures/posts.js';

export default class ShowScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('post').location.name,
    };
  };

  render() {
    const { navigation } = this.props;
    const post = navigation.getParam('post')
    const { latitude, longitude, forecast } = post.location
    const { tideChart, daily, hourly } = forecast
    const { swellHeight, waveHeight, windSpeed, windDirection, waveDirection } = hourly
    var { hours, seaLevels } = tideChart
    hours  = hours.map(date => new Date(date).getHours()).filter(hour => hour % 3 == 0) 
    const host = "https://maps.googleapis.com/maps/api/staticmap"
    const options = "zoom=11&&size=400x300&maptype=satellite"
    const uri = `${host}?center=${latitude},${longitude}&${options}&key=${GOOGLE_MAPS_API_KEY}`
    return (
      <React.Fragment>
        <ScrollView>
          <Image 
            style={{width: 400, height: 300}}
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
          <H3 style={{ textAlign: 'center', marginTop: 30 }}>Next 24h Tide mt.</H3>
          <Chart values={seaLevels} labels={hours} bezier={false} margin={50} />
          <H3 style={{ textAlign: 'center', marginTop: 30 }}>Next 7 days forecast in mt.</H3>
          <Chart values={daily.waveHeight} labels={daily.days} bezier={true} margin={0} />
        </ScrollView>
      </React.Fragment>
    )
  }
}
